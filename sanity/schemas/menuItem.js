export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama Menu',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Kategori',
      description: 'Contoh: Ayam Panggang, Ayam Goreng, Paket Hemat. Gunakan ejaan yang sama persis di semua menu dalam kategori yang sama.',
      type: 'string',
      validation: Rule => Rule.required().max(50)
    },
    {
      name: 'description',
      title: 'Deskripsi',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Harga (contoh: Rp 35.000)',
      type: 'string'
    },
    {
      name: 'order',
      title: 'Urutan dalam kategori (angka kecil tampil duluan)',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'image',
      title: 'Foto Menu',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' }
  }
};
