export default {
  name: 'category',
  title: 'Kategori Menu',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama Kategori',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Urutan tampil (angka kecil tampil duluan)',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: { title: 'name' }
  }
}
