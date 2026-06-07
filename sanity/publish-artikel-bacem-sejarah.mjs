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
if (!token) { console.error('No token'); process.exit(1) }

const client = createClient({
  projectId: '0b8sjspb', dataset: 'production',
  apiVersion: '2026-01-01', useCdn: false, token,
})

function block(key, style, text) {
  return {
    _type: 'block', _key: key, style,
    markDefs: [],
    children: [{ _type: 'span', _key: key + 's', text, marks: [] }]
  }
}

const article = {
  _id: 'post-asal-usul-ayam-bacem',
  _type: 'post',
  title: 'Asal Usul Ayam Bacem: Warisan Kuliner Jawa yang Tak Lekang oleh Waktu',
  slug: { _type: 'slug', current: 'asal-usul-ayam-bacem-warisan-jawa' },
  author: 'Tim Ayam Kedaton',
  publishedAt: '2026-06-07T08:00:00.000Z',
  tags: ['Sejarah', 'Budaya', 'Ayam Bacem', 'Kuliner Jawa'],
  excerpt: 'Dari dapur keraton Yogyakarta hingga warung pinggir jalan — ayam bacem adalah cerita panjang tentang bumbu, kesabaran, dan kecintaan masyarakat Jawa pada masakan manis-gurih yang autentik.',
  metaTitle: 'Asal Usul Ayam Bacem: Warisan Kuliner Jawa | Ayam Kedaton',
  metaDescription: 'Pelajari sejarah dan asal usul ayam bacem, hidangan warisan Jawa yang lahir dari tradisi keraton Yogyakarta. Temukan mengapa masakan ini begitu digemari hingga kini.',

  body: [
    block('b01', 'normal', 'Jika kamu pernah berkunjung ke Yogyakarta, hampir pasti kamu akan menemukan ayam bacem di setiap sudut kota — dari warung tenda pinggir jalan Malioboro, depot sederhana di Kotagede, hingga meja makan keluarga Jawa di hari-hari biasa. Hidangan berwarna cokelat keemasan dengan aroma rempah yang menguar ini bukan sekadar lauk. Ia adalah bagian dari identitas kuliner Jawa yang sudah berusia ratusan tahun.'),

    block('b02', 'h2', 'Apa Itu "Bacem" dan Dari Mana Asalnya?'),
    block('b03', 'normal', 'Kata "bacem" berasal dari bahasa Jawa yang merujuk pada teknik memasak: merebus bahan makanan dalam campuran bumbu, gula jawa, dan rempah-rempah hingga cairan menyusut dan bumbu meresap sempurna ke dalam bahan. Hasilnya adalah makanan dengan lapisan bumbu yang tebal, berwarna cokelat gelap, serta rasa manis-gurih yang kompleks dan berlapis.'),
    block('b04', 'normal', 'Teknik ini dipercaya telah dikenal sejak era Kerajaan Mataram Islam (abad ke-16 hingga ke-17), yang berpusat di wilayah yang kini menjadi Yogyakarta dan Jawa Tengah. Pada masa itu, teknik bacem berfungsi ganda: selain menghasilkan rasa yang luar biasa, proses pemasakan dengan gula jawa dan rempah juga berfungsi sebagai cara mengawetkan protein hewani — tempe, tahu, dan ayam — sebelum era lemari es.'),

    block('b05', 'h2', 'Hubungan Bacem dengan Keraton Yogyakarta'),
    block('b06', 'normal', 'Yogyakarta sebagai pusat kebudayaan Jawa memegang peran besar dalam pelestarian dan penyebaran kuliner bacem. Keraton Yogyakarta dikenal memiliki tradisi kuliner yang sangat kaya, dan bacem adalah salah satu hidangan yang secara turun-temurun dipertahankan dalam tradisi dapur Jawa.'),
    block('b07', 'normal', 'Masyarakat Jawa memiliki filosofi tentang rasa yang dikenal dengan istilah "rasa harmoni" — keseimbangan antara manis, gurih, dan aroma rempah yang tidak ada yang mendominasi secara berlebihan. Bacem adalah perwujudan sempurna dari filosofi ini. Gula jawa memberikan manisnya, garam dan kemiri memberikan gurihnya, sementara ketumbar, lengkuas, dan daun salam memberikan kedalaman aroma yang khas.'),

    block('b08', 'h2', 'Mengapa Ayam Bacem Begitu Digemari di Jawa?'),
    block('b09', 'normal', 'Ada beberapa alasan kuat mengapa ayam bacem bertahan dan bahkan semakin populer di tengah gempuran tren kuliner modern:'),
    block('b10', 'h3', '1. Profil Rasa yang Universal'),
    block('b11', 'normal', 'Rasa manis-gurih adalah kombinasi yang sangat disukai oleh lidah Indonesia, khususnya Jawa. Berbeda dengan masakan pedas yang membatasi penikmatnya, bacem bisa dinikmati semua usia — dari anak-anak hingga lansia. Ini menjadikannya pilihan utama untuk lauk keluarga.'),
    block('b12', 'h3', '2. Proses Memasak yang Menjamin Kelezatan'),
    block('b13', 'normal', 'Tidak ada cara singkat untuk membuat bacem yang benar-benar enak. Proses merebus perlahan berjam-jam dan marinasi semalaman membuat setiap gigitan terasa penuh rasa hingga ke dalam. Inilah "rahasia" yang tidak bisa dipercepat — dan justru itulah yang membuatnya istimewa.'),
    block('b14', 'h3', '3. Warisan yang Diwariskan Lisan'),
    block('b15', 'normal', 'Di Jawa, resep bacem tidak ditulis — ia diwariskan secara lisan dari nenek ke cucu, dari ibu ke anak perempuannya. Setiap keluarga merasa memiliki versi "terbaik", dan ini menciptakan kebanggaan budaya yang memperkuat keterikatannya dalam kehidupan sehari-hari.'),
    block('b16', 'h3', '4. Serbaguna dan Mudah Disiapkan'),
    block('b17', 'normal', 'Bacem bisa dibuat dalam jumlah besar dan disimpan beberapa hari. Di era modern, ini menjadikannya pilihan praktis untuk bekal kantor, lauk makan siang, atau hidangan acara keluarga. Tidak heran jika bacem selalu hadir di meja makan hajatan, selamatan, dan berbagai perayaan tradisional Jawa.'),

    block('b18', 'h2', 'Dari Jogja ke Seluruh Indonesia'),
    block('b19', 'normal', 'Popularitas bacem tidak berhenti di Yogyakarta. Seiring migrasi masyarakat Jawa ke berbagai penjuru Indonesia, bacem ikut melakukan perjalanan. Jakarta, Surabaya, Bandung, bahkan kota-kota di luar Jawa kini memiliki warung dan restoran yang menyajikan ayam bacem sebagai menu andalannya.'),
    block('b20', 'normal', 'Di Jakarta, banyak pendatang asal Jawa yang membuka usaha kuliner dengan bacem sebagai flagship mereka. Nostalgia akan cita rasa kampung halaman menjadi kekuatan utama yang menopang bisnis ini — dan kini, bahkan generasi yang belum pernah ke Jawa pun jatuh cinta pada rasa manis-gurihnya.'),

    block('b21', 'h2', 'Ayam Bacem di Ayam Kedaton'),
    block('b22', 'normal', 'Di Ayam Kedaton, kami membawa warisan ini ke Jakarta Selatan dengan penuh rasa hormat terhadap tradisinya. Setiap ekor ayam bacem kami direndam semalaman dalam bumbu yang menggunakan gula jawa pilihan, kecap manis, dan rempah-rempah segar — sebelum dimasak perlahan hingga bumbu meresap sempurna.'),
    block('b23', 'normal', 'Kami percaya bahwa kelezatan yang autentik membutuhkan waktu dan kesabaran. Tidak ada shortcut. Itulah komitmen kami setiap hari untuk setiap porsi yang kami sajikan.'),
  ],

  faq: [
    {
      _key: 'faq-sejarah-1',
      question: 'Dari mana asal usul ayam bacem?',
      answer: 'Ayam bacem berasal dari tradisi kuliner Kerajaan Mataram Islam di Jawa (abad ke-16 hingga ke-17), yang kini menjadi wilayah Yogyakarta dan Jawa Tengah. Teknik bacem awalnya digunakan untuk mengawetkan makanan sekaligus menghasilkan cita rasa manis-gurih yang khas.'
    },
    {
      _key: 'faq-sejarah-2',
      question: 'Apa arti kata "bacem" dalam bahasa Jawa?',
      answer: '"Bacem" dalam bahasa Jawa merujuk pada teknik memasak: merebus bahan makanan dalam campuran bumbu, gula jawa, dan rempah hingga cairan menyusut dan bumbu meresap sempurna. Teknik ini menghasilkan makanan berwarna cokelat keemasan dengan rasa manis-gurih yang berlapis.'
    },
    {
      _key: 'faq-sejarah-3',
      question: 'Mengapa ayam bacem identik dengan Yogyakarta?',
      answer: 'Yogyakarta adalah pusat kebudayaan Jawa yang secara turun-temurun mempertahankan tradisi kuliner bacem. Filosofi rasa harmoni masyarakat Jawa — keseimbangan antara manis, gurih, dan aroma rempah — sempurna terwujud dalam bacem. Warung-warung legendaris bacem di Jogja telah berdiri selama puluhan hingga ratusan tahun.'
    },
    {
      _key: 'faq-sejarah-4',
      question: 'Apa yang membuat rasa ayam bacem berbeda dari olahan ayam lainnya?',
      answer: 'Keunikan bacem terletak pada proses dua tahap: direbus perlahan berjam-jam dalam bumbu gula jawa, kecap, dan rempah, lalu digoreng sebentar. Hasilnya adalah lapisan bumbu yang tebal, warna cokelat keemasan yang cantik, serta rasa manis-gurih kompleks yang tidak bisa didapatkan dari teknik memasak lainnya.'
    },
    {
      _key: 'faq-sejarah-5',
      question: 'Di mana bisa menikmati ayam bacem autentik bergaya Jawa di Jakarta?',
      answer: 'Ayam Kedaton di PHX Kebayoran Lama, Jakarta Selatan menghadirkan ayam bacem bumbu warisan dengan resep autentik — direndam semalaman dan dimasak perlahan setiap harinya. Pesan via WhatsApp +62 852-1581-5860, GrabFood, GoFood, atau ShopeeFood.'
    },
  ]
}

await client.createOrReplace(article)
console.log('✅ Artikel berhasil dipublish:', article.title)
console.log('   Slug:', article.slug.current)
console.log('   FAQ:', article.faq.length, 'pertanyaan')
