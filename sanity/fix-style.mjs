import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
    const t = line.trim()
    if (!t || t.startsWith('#') || !t.includes('=')) return
    const [k, ...v] = t.split('=')
    if (!process.env[k]) process.env[k] = v.join('=').trim().replace(/^["']|["']$/g, '')
  })
}
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN
const client = createClient({ projectId: '0b8sjspb', dataset: 'production', apiVersion: '2026-01-01', useCdn: false, token })

// Fix text: remove em dashes, formal words
function fixText(t) {
  return t
    .replace(/ — /g, ', ')
    .replace(/\bAnda\b/g, 'kamu')
    .replace(/\bsebagai flagship mereka\b/g, 'sebagai menu andalan')
    .replace(/\bperwujudan sempurna\b/g, 'contoh nyata')
    .replace(/\bpenuh rasa hormat terhadap tradisinya\b/g, 'seautentik mungkin')
}

// Walk Portable Text blocks and fix text spans
function fixBody(body) {
  return (body || []).map(block => {
    if (block._type !== 'block') return block
    return {
      ...block,
      children: (block.children || []).map(child => ({
        ...child,
        text: fixText(child.text || '')
      }))
    }
  })
}

// ── Specific block rewrites for the sejarah article (most AI-sounding) ──
const sejarahOverrides = {
  'b01': 'Kalau kamu pernah ke Yogyakarta, pasti sudah tidak asing sama ayam bacem. Ada di mana-mana: warung tenda di Malioboro, depot kecil di Kotagede, sampai meja makan keluarga di hari-hari biasa. Warnanya cokelat keemasan, aromanya rempah, rasanya susah dilupakan. Bukan sekadar lauk, tapi bagian dari kuliner Jawa yang sudah ada ratusan tahun.',
  'b03': 'Kata "bacem" dalam bahasa Jawa merujuk pada teknik memasak: merebus bahan dalam campuran bumbu, gula jawa, dan rempah-rempah sampai cairannya menyusut dan bumbu meresap sempurna. Hasilnya makanan berwarna cokelat gelap dengan rasa manis-gurih yang tebal dan berlapis.',
  'b04': 'Teknik ini dipercaya sudah ada sejak zaman Kerajaan Mataram Islam (abad ke-16 sampai ke-17), yang berpusat di wilayah Yogyakarta dan Jawa Tengah sekarang. Waktu itu, bacem bukan cuma soal rasa, tapi juga cara mengawetkan makanan seperti tempe, tahu, dan ayam sebelum ada kulkas.',
  'b06': 'Keraton Yogyakarta punya tradisi kuliner yang sangat kaya, dan bacem adalah salah satu hidangan yang masih dijaga sampai sekarang, diturunkan dari generasi ke generasi.',
  'b07': 'Orang Jawa dikenal suka rasa yang seimbang: tidak terlalu frontal, tapi kaya rempah. Bacem pas banget sama selera itu. Manisnya ada, gurihnya ada, aromanya nendang, tapi semuanya kerasa harmonis di lidah.',
  'b09': 'Kenapa bacem bisa bertahan ratusan tahun dan masih terus digemari? Ada beberapa alasannya:',
  'b11': 'Rasa manis-gurih adalah kombinasi yang disukai hampir semua orang Indonesia, terutama di Jawa. Berbeda dengan masakan pedas, bacem bisa dinikmati semua usia, dari anak kecil sampai lansia. Cocok buat lauk keluarga sehari-hari.',
  'b13': 'Tidak ada cara cepat untuk bikin bacem yang enak. Proses rebus pelan dan marinasi semalaman membuat setiap gigitan terasa penuh rasa sampai ke dalam. Justru karena tidak bisa dipercepat, rasanya selalu konsisten dan istimewa.',
  'b15': 'Di Jawa, resep bacem biasanya tidak ditulis. Diwariskan lisan: dari nenek ke cucu, dari ibu ke anaknya. Setiap keluarga merasa punya versi yang paling enak, dan kebanggaan itu yang bikin bacem terus hidup di setiap dapur.',
  'b17': 'Makanya bacem selalu ada di meja makan hajatan, selamatan, dan acara keluarga Jawa. Bisa dibuat banyak, tahan beberapa hari, dan hampir semua orang suka.',
  'b19': 'Seiring orang Jawa merantau ke berbagai kota, bacem ikut terbawa. Jakarta, Surabaya, Bandung, bahkan kota-kota di luar Jawa sekarang sudah banyak punya warung dan restoran yang jual bacem sebagai menu andalan.',
  'b20': 'Banyak perantau asal Jawa yang buka usaha kuliner di Jakarta dengan bacem sebagai andalannya. Kerinduan sama masakan kampung jadi kekuatan utama bisnis mereka. Dan sekarang, generasi yang belum pernah ke Jawa pun sudah ikut jatuh cinta sama rasanya.',
  'b21': 'Di Ayam Kedaton, kami coba bawa rasa ini ke Jakarta Selatan, seautentik mungkin.',
  'b22': 'Setiap ayam kami rendam semalaman pakai gula jawa pilihan, kecap manis, dan rempah segar, lalu dimasak pelan-pelan sampai bumbu benar-benar meresap.',
  'b23': 'Kami percaya enaknya makanan autentik itu butuh waktu dan kesabaran. Tidak ada jalan pintas, dan itu yang kami jaga setiap hari di setiap porsi.',
}

// ── Main ──────────────────────────────────────────────────────────────────
const posts = await client.fetch('*[_type == "post"]{_id, excerpt, body}')

for (const post of posts) {
  let body = fixBody(post.body)

  // Extra: apply block-level overrides for sejarah article
  if (post._id === 'post-asal-usul-ayam-bacem') {
    body = body.map(block => {
      const override = sejarahOverrides[block._key]
      if (!override) return block
      return {
        ...block,
        children: [{ _type: 'span', _key: block._key + 's', text: override, marks: [] }]
      }
    })
  }

  const excerpt = fixText(post.excerpt || '')

  await client.patch(post._id).set({ body, excerpt }).commit()
  console.log(`✅ Fixed: ${post._id}`)
}

console.log('\nDone! Em dashes removed, style updated.')
