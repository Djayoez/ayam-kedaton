import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Artikel / Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Artikel',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'URL artikel. Klik "Generate" untuk membuat otomatis dari judul.',
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'string',
      initialValue: 'Tim Ayam Kedaton',
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Deskripsikan isi gambar untuk aksesibilitas dan SEO.',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat ditampilkan di kartu artikel. Maks 200 karakter.',
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Isi Artikel',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Buka di tab baru',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({name: 'alt',     title: 'Alt Text',              type: 'string'}),
            defineField({name: 'caption', title: 'Keterangan Gambar',     type: 'string'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' },
    }),

    // ── SEO ──────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'Judul untuk Google. Kosongkan untuk pakai judul artikel. Maks 70 karakter.',
      validation: Rule => Rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      description: 'Deskripsi singkat muncul di hasil pencarian Google. Maks 160 karakter.',
      validation: Rule => Rule.max(160),
    }),
  ],

  orderings: [
    {
      title: 'Terbaru',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      title:  'title',
      author: 'author',
      media:  'mainImage',
      date:   'publishedAt',
    },
    prepare({title, author, media, date}) {
      const dateStr = date ? new Date(date).toLocaleDateString('id-ID') : 'Draft'
      return {title, subtitle: `${author ?? ''} · ${dateStr}`, media}
    },
  },
})
