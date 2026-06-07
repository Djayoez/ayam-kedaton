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
if (!token) { console.error('No token found in sanity/.env'); process.exit(1) }

const client = createClient({
  projectId: '0b8sjspb',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  token,
})

const faqs = {
  'post-ayam-bacem': [
    {
      _key: 'faq-bacem-1',
      question: 'Apa beda gula jawa dan gula pasir untuk ayam bacem?',
      answer: 'Gula jawa memberikan warna cokelat keemasan dan rasa manis berlapis yang lebih kompleks dibanding gula pasir. Kandungan karamelnya membuat bumbu bacem terasa lebih autentik, kaya, dan khas — inilah yang membedakan bacem warung legendaris dari yang biasa.'
    },
    {
      _key: 'faq-bacem-2',
      question: 'Berapa lama waktu ideal merendam ayam bacem?',
      answer: 'Minimal 4 jam, namun terbaik adalah semalaman (8–12 jam). Semakin lama marinasi, bumbu akan meresap lebih sempurna ke dalam serat daging dan menghasilkan rasa yang lebih dalam.'
    },
    {
      _key: 'faq-bacem-3',
      question: 'Kenapa ayam bacem harus dimasak dengan api kecil?',
      answer: 'Memasak dengan api kecil dan perlahan (minimal 45–60 menit) memastikan bumbu meresap sempurna dan daging tidak alot. Api besar membuat bagian luar cepat matang tapi bumbu tidak sempat masuk ke dalam daging.'
    },
    {
      _key: 'faq-bacem-4',
      question: 'Apakah bisa membuat ayam bacem tanpa air kelapa?',
      answer: 'Bisa, tapi air kelapa memberikan rasa manis alami dan membantu melunakkan tekstur daging. Jika tidak tersedia, gunakan air biasa dan tambahkan sedikit santan encer sebagai penggantinya.'
    },
    {
      _key: 'faq-bacem-5',
      question: 'Di mana bisa pesan ayam bacem yang autentik di Jakarta?',
      answer: 'Ayam Kedaton di PHX Kebayoran Lama, Jakarta Selatan menyajikan ayam bacem bumbu warisan yang dimasak setiap hari. Bisa dipesan via WhatsApp +62 852-1581-5860, GrabFood, GoFood, atau ShopeeFood.'
    },
  ],

  'post-ayam-panggang-empuk': [
    {
      _key: 'faq-panggang-1',
      question: 'Potongan ayam apa yang paling cocok untuk dipanggang?',
      answer: 'Paha atas dan paha bawah adalah pilihan terbaik karena kandungan lemaknya lebih tinggi sehingga daging tidak mudah kering. Hindari dada ayam untuk panggang langsung karena cenderung keras jika tidak ditangani ekstra hati-hati.'
    },
    {
      _key: 'faq-panggang-2',
      question: 'Mengapa perlu membuat sayatan sebelum memanggang ayam?',
      answer: 'Sayatan pada daging membantu bumbu meresap lebih dalam ke serat daging dan mempersingkat waktu marinasi. Selain itu, sayatan juga membantu panas masuk lebih merata sehingga daging matang sempurna hingga ke bagian dalam.'
    },
    {
      _key: 'faq-panggang-3',
      question: 'Berapa suhu dan durasi ideal untuk memanggang ayam?',
      answer: 'Suhu ideal adalah 180–200°C. Teknik dua tahap direkomendasikan: panggang tertutup 30–40 menit agar daging matang dan juicy, lalu buka tutup 10–15 menit terakhir untuk mendapatkan kulit kecokelatan dan aroma smoky.'
    },
    {
      _key: 'faq-panggang-4',
      question: 'Bagaimana cara tahu ayam panggang sudah matang sempurna?',
      answer: 'Tusuk bagian paling tebal dengan garpu atau tusuk sate — jika cairan yang keluar bening (bukan merah muda atau berdarah), ayam sudah matang. Suhu internal idealnya mencapai 75°C di bagian terdalam.'
    },
    {
      _key: 'faq-panggang-5',
      question: 'Apakah Ayam Kedaton menerima pesanan ayam panggang untuk acara?',
      answer: 'Ya! Ayam Kedaton menerima pesanan partai besar untuk arisan, gathering, ulang tahun, dan berbagai event. Hubungi kami via WhatsApp +62 852-1581-5860 untuk konsultasi menu, harga, dan jadwal pengiriman.'
    },
  ],

  'post-memilih-ayam-segar': [
    {
      _key: 'faq-segar-1',
      question: 'Apa ciri-ciri utama ayam segar yang baik?',
      answer: 'Ayam segar memiliki warna merah muda pucat hingga putih krem yang seragam, hampir tidak berbau (paling hanya aroma daging sangat ringan), dan tekstur daging kenyal — jika ditekan, daging kembali ke bentuk semula dengan cepat.'
    },
    {
      _key: 'faq-segar-2',
      question: 'Mengapa warna ayam penting saat memilih di pasar?',
      answer: 'Warna adalah indikator visual paling cepat untuk menilai kesegaran. Ayam dengan warna keabu-abuan, keunguan, atau tidak merata menandakan ayam sudah tidak segar atau tidak disimpan dengan benar.'
    },
    {
      _key: 'faq-segar-3',
      question: 'Berapa lama ayam segar bisa disimpan di kulkas?',
      answer: 'Ayam segar bisa disimpan di kulkas (bukan freezer) maksimal 1–2 hari. Untuk penyimpanan lebih lama, bekukan di freezer dan bisa tahan hingga 3–4 bulan. Hindari membekukan ulang ayam yang sudah dicairkan.'
    },
    {
      _key: 'faq-segar-4',
      question: 'Apakah ayam beku sama kualitasnya dengan ayam segar?',
      answer: 'Ayam beku bisa sama baiknya jika dibekukan segera setelah dipotong dan dicairkan dengan benar di dalam kulkas (bukan di suhu ruangan atau air panas). Pencairan di suhu ruangan meningkatkan risiko pertumbuhan bakteri dan merusak tekstur daging.'
    },
    {
      _key: 'faq-segar-5',
      question: 'Apakah Ayam Kedaton menggunakan ayam segar setiap hari?',
      answer: 'Ya, Ayam Kedaton selalu menggunakan ayam segar pilihan yang diolah setiap harinya — tidak menggunakan ayam beku. Inilah salah satu kunci kelezatan dan konsistensi rasa yang selalu dijaga. Pesan sekarang via WhatsApp atau GrabFood, GoFood, ShopeeFood.'
    },
  ],
}

for (const [id, faqItems] of Object.entries(faqs)) {
  await client.patch(id).set({ faq: faqItems }).commit()
  console.log(`✅ FAQ added to: ${id}`)
}

console.log('\nDone! FAQ sudah masuk ke semua artikel.')
