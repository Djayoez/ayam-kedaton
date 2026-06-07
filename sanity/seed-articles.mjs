import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

// Load token from .env file
const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return
    const [key, ...rest] = trimmed.split('=')
    const value = rest.join('=').trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = value
  })
}

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN
if (!token) {
  console.error('ERROR: No token found. Create a sanity/.env file with:\nSANITY_API_TOKEN=your_token_here')
  process.exit(1)
}

const client = createClient({
  projectId: '0b8sjspb',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  token,
})

const uploadImage = async (filename) => {
  const filePath = path.join(projectRoot, 'assets', filename)
  if (!fs.existsSync(filePath)) { console.warn(`Image not found: ${filePath}`); return null }
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

const block = (key, text, style = 'normal') => ({
  _type: 'block', _key: key, style,
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }]
})

const h2 = (key, text) => block(key, text, 'h2')

// ─── ARTICLE 1 ───────────────────────────────────────────────────────────────
const article1 = {
  _id: 'post-ayam-bacem',
  _type: 'post',
  title: '5 Rahasia Bumbu Ayam Bacem yang Bikin Nagih',
  slug: { _type: 'slug', current: '5-rahasia-bumbu-ayam-bacem' },
  author: 'Tim Ayam Kedaton',
  publishedAt: '2026-05-15T08:00:00.000Z',
  tags: ['Resep', 'Tips'],
  excerpt: 'Temukan rahasia bumbu bacem autentik ala nenek moyang yang membuat Ayam Kedaton begitu khas — dari pemilihan gula jawa hingga teknik memasak perlahan.',
  metaTitle: '5 Rahasia Bumbu Ayam Bacem yang Bikin Nagih – Ayam Kedaton',
  metaDescription: 'Pelajari 5 rahasia bumbu ayam bacem autentik: gula jawa, marinasi semalaman, rempah pilihan, memasak perlahan, dan teknik finishing yang sempurna.',
  body: [
    block('a1p1', 'Ayam bacem adalah hidangan khas Jawa yang telah dikenal turun-temurun. Cita rasanya yang manis-gurih dengan aroma rempah yang kuat menjadikannya favorit banyak keluarga Indonesia. Berikut lima rahasia agar ayam bacem buatan Anda bisa seenak buatan warung legendaris.'),
    h2('a1h1', '1. Gunakan Gula Jawa, Bukan Gula Pasir'),
    block('a1p2', 'Gula jawa (gula merah kelapa) adalah kunci utama cita rasa bacem yang autentik. Gula jawa memberikan warna cokelat keemasan yang cantik sekaligus rasa manis yang lebih kompleks, berlapis, dan sedikit karamel dibanding gula pasir biasa. Gunakan sekitar 75–100 gram per ekor ayam.'),
    h2('a1h2', '2. Rendam Minimal 4 Jam, Terbaik Semalaman'),
    block('a1p3', 'Rahasia bumbu bacem yang meresap sempurna adalah proses marinasi yang cukup lama. Campurkan semua bumbu halus, gula jawa, kecap manis, air kelapa, dan rempah-rempah, lalu rendam ayam minimal 4–6 jam. Terbaik jika direndam semalaman di dalam kulkas agar bumbu benar-benar meresap ke dalam serat daging.'),
    h2('a1h3', '3. Jangan Lewatkan Lengkuas dan Daun Salam'),
    block('a1p4', 'Dua rempah ini adalah "jiwa" dari bumbu bacem Jawa. Lengkuas yang dimemarkan memberikan aroma hangat dan sedikit pedas yang khas, sementara beberapa lembar daun salam menambah kesegaran herbal yang tidak bisa digantikan bahan lain. Tambahkan pula sereh dan daun jeruk untuk aroma yang lebih harum.'),
    h2('a1h4', '4. Masak Perlahan dengan Api Kecil'),
    block('a1p5', 'Proses memasak bacem harus sabar — jangan terburu-buru. Gunakan api kecil selama 45–60 menit hingga cairan menyusut hampir habis dan bumbu mengkaramelisasi menempel di daging. Jika menggunakan panci presto, cukup 20 menit dengan hasil yang sama empuknya.'),
    h2('a1h5', '5. Goreng atau Panggang Sebelum Disajikan'),
    block('a1p6', 'Langkah terakhir yang sering dilupakan: goreng sebentar atau panggang bacem selama 3–5 menit sebelum disajikan. Ini menghasilkan tekstur luar yang sedikit kering dan kecokelatan, sementara bagian dalam tetap juicy dan penuh bumbu. Hasilnya: ayam bacem yang sempurna — gurih di luar, lembut dan berasa di dalam.'),
    block('a1p7', 'Di Ayam Kedaton, kami memasak ayam bacem dengan resep turun-temurun menggunakan gula jawa pilihan dan rempah segar setiap harinya. Coba langsung dan rasakan bedanya!'),
  ]
}

// ─── ARTICLE 2 ───────────────────────────────────────────────────────────────
const article2 = {
  _id: 'post-memilih-ayam-segar',
  _type: 'post',
  title: 'Tips Memilih Ayam Segar agar Masakan Makin Lezat',
  slug: { _type: 'slug', current: 'tips-memilih-ayam-segar' },
  author: 'Tim Ayam Kedaton',
  publishedAt: '2026-04-28T08:00:00.000Z',
  tags: ['Tips'],
  excerpt: 'Kualitas ayam yang segar adalah fondasi dari masakan yang lezat. Pelajari cara memilih ayam yang benar-benar segar dari warna, aroma, hingga tekstur dagingnya.',
  metaTitle: 'Tips Memilih Ayam Segar untuk Masakan Lezat – Ayam Kedaton',
  metaDescription: 'Panduan lengkap cara memilih ayam segar: cek warna daging, aroma, kekenyalan, dan kondisi kulit. Pastikan kualitas terbaik untuk masakan keluarga Anda.',
  body: [
    block('a2p1', 'Kualitas bahan baku adalah pondasi dari setiap masakan yang lezat. Memilih ayam yang segar bukan hanya soal rasa, tapi juga soal keamanan pangan untuk seluruh keluarga. Berikut panduan praktis yang bisa langsung Anda terapkan saat belanja.'),
    h2('a2h1', '1. Perhatikan Warna Daging'),
    block('a2p2', 'Ayam segar memiliki warna merah muda pucat hingga putih krem yang seragam. Hindari ayam dengan warna keabu-abuan, keunguan, atau terlalu pucat tidak merata — itu tanda ayam sudah tidak segar atau tidak ditangani dengan baik. Warna yang cerah dan natural adalah indikator utama kesegaran.'),
    h2('a2h2', '2. Cium Aromanya dengan Seksama'),
    block('a2p3', 'Ayam segar hampir tidak berbau — paling hanya aroma daging yang sangat ringan. Jika tercium aroma asam, amis berlebihan, atau bau tidak sedap lainnya, jangan dibeli. Penciuman adalah cara paling cepat dan akurat untuk mendeteksi kesegaran ayam tanpa alat apapun.'),
    h2('a2h3', '3. Tes Kekenyalan Daging'),
    block('a2p4', 'Tekan daging ayam dengan jari selama 2–3 detik lalu lepaskan. Daging ayam segar akan segera kembali ke bentuk semula (elastis seperti spons). Jika bekas tekanan masih terlihat atau daging terasa lembek dan tidak kembali, artinya ayam sudah mulai tidak segar dan kehilangan struktur proteinnya.'),
    h2('a2h4', '4. Perhatikan Kondisi Kulit'),
    block('a2p5', 'Kulit ayam segar terlihat mulus, sedikit lembab, dan tidak berlendir. Jika terasa licin berlebihan atau ada lapisan lendir saat dipegang, itu tanda ayam sudah mulai membusuk. Perhatikan juga tidak ada memar kehitaman, bulu yang tertinggal, atau kulit yang sobek tidak wajar.'),
    h2('a2h5', '5. Beli dari Sumber Terpercaya'),
    block('a2p6', 'Pilih ayam dari penjual atau toko yang memiliki sirkulasi stok cepat. Pasar tradisional yang ramai di pagi hari biasanya menjual ayam dengan tingkat kesegaran tertinggi karena stok habis setiap hari. Supermarket terpercaya dengan lemari pendingin yang terjaga suhunya juga pilihan yang aman.'),
    block('a2p7', 'Di Ayam Kedaton, kami hanya menggunakan ayam segar berkualitas yang dipilih setiap pagi. Tidak ada ayam beku, tidak ada sisa kemarin — karena kualitas adalah janji kami kepada setiap pelanggan.'),
  ]
}

// ─── ARTICLE 3 ───────────────────────────────────────────────────────────────
const article3 = {
  _id: 'post-ayam-panggang-empuk',
  _type: 'post',
  title: 'Panduan Membuat Ayam Panggang Empuk dengan Bumbu Meresap',
  slug: { _type: 'slug', current: 'panduan-ayam-panggang-empuk' },
  author: 'Tim Ayam Kedaton',
  publishedAt: '2026-04-10T08:00:00.000Z',
  tags: ['Resep'],
  excerpt: 'Ayam panggang yang sempurna: luar kecokelatan dan beraroma, dalam juicy dan penuh bumbu. Panduan lengkap dari pilihan potongan, marinasi, hingga teknik memanggang dua tahap.',
  metaTitle: 'Panduan Ayam Panggang Empuk dengan Bumbu Meresap – Ayam Kedaton',
  metaDescription: 'Cara membuat ayam panggang empuk dan berbumbu: pilih potongan paha, buat sayatan, marinasi 2 jam, dan panggang dua tahap untuk hasil sempurna.',
  body: [
    block('a3p1', 'Ayam panggang yang sempurna memiliki ciri khas yang mudah dikenali: bagian luar kecokelatan dengan aroma smoky yang menggoda, sementara bagian dalam tetap juicy dan penuh cita rasa bumbu. Hasil seperti ini bukan keahlian eksklusif restoran — dengan panduan yang tepat, Anda bisa membuatnya di rumah.'),
    h2('a3h1', '1. Pilih Potongan yang Tepat'),
    block('a3p2', 'Paha atas (thigh) dan paha bawah (drumstick) adalah pilihan terbaik untuk dipanggang. Kandungan lemak yang lebih tinggi pada bagian paha membuat daging tidak mudah kering meski dipanggang dalam waktu lama. Hindari dada ayam untuk panggang langsung — teksturnya cenderung kering jika tidak diperhatikan ekstra.'),
    h2('a3h2', '2. Buat Sayatan pada Daging'),
    block('a3p3', 'Sebelum dilumuri bumbu, buat 2–3 sayatan dangkal (sekitar 1 cm) di bagian paling tebal dari daging. Sayatan ini memiliki dua fungsi: membantu bumbu meresap jauh lebih dalam, dan mempercepat proses pemasakan agar bagian dalam matang merata tanpa membakar bagian luar.'),
    h2('a3h3', '3. Bumbu Dasar yang Tidak Boleh Absen'),
    block('a3p4', 'Untuk bumbu panggang ala Kedaton, haluskan: 6 siung bawang putih, 4 siung bawang merah, 1 sdt ketumbar sangrai, dan 1/2 sdt kunyit. Campurkan dengan 3 sdm kecap manis, 1 sdm minyak, garam secukupnya. Tambahkan air jeruk nipis untuk menetralisir bau amis dan membuat daging lebih empuk.'),
    h2('a3h4', '4. Marinasi Minimal 2 Jam'),
    block('a3p5', 'Setelah dilumuri bumbu hingga merata ke semua sisi dan masuk ke dalam sayatan, bungkus ayam dengan plastik wrap dan masukkan ke kulkas. Minimal 2 jam, namun sangat disarankan semalaman. Protein dalam daging ayam membutuhkan waktu untuk menyerap bumbu, dan dinginnya kulkas memperlambat pertumbuhan bakteri selama proses ini.'),
    h2('a3h5', '5. Teknik Panggang Dua Tahap untuk Hasil Sempurna'),
    block('a3p6', 'Ini rahasia utama ayam panggang yang sempurna: jangan langsung panggang di atas api besar. Tahap pertama, kukus atau rebus ayam berbumbu selama 15–20 menit hingga hampir matang. Tahap kedua, pindahkan ke panggangan atau oven dengan suhu tinggi (200°C) selama 15 menit sambil dioles sisa bumbu. Hasilnya: matang merata di dalam, kecokelatan sempurna di luar.'),
    block('a3p7', 'Ingin merasakan ayam panggang dengan bumbu yang benar-benar meresap tanpa repot memasaknya sendiri? Kunjungi Ayam Kedaton — setiap ayam dipersiapkan dengan teknik yang sama setiap harinya.'),
  ]
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const main = async () => {
  const articles = [article1, article2, article3]

  for (const article of articles) {
    console.log(`Creating: ${article.title}`)
    await client.createOrReplace(article)
    await sleep(400)
  }

  console.log('\n✅ Done! 3 articles created in Sanity.')
  console.log('You can add cover images later via the Sanity Studio.')
}

main().catch(err => { console.error(err); process.exit(1) })
