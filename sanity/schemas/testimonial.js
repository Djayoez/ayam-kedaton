export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Isi Testimonial',
      type: 'text'
    },
    {
      name: 'author',
      title: 'Nama & Deskripsi (contoh: Budi, Karyawan Kantoran)',
      type: 'string'
    },
    {
      name: 'platform',
      title: 'Platform Pembelian',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'WhatsApp' },
          { title: 'GrabFood', value: 'GrabFood' },
          { title: 'GoFood', value: 'GoFood' },
          { title: 'ShopeeFood', value: 'ShopeeFood' },
          { title: 'Langsung / Di tempat', value: 'Langsung / Di tempat' },
        ],
        layout: 'radio'
      }
    }
  ],
  preview: {
    select: { title: 'author', subtitle: 'platform' }
  }
};
