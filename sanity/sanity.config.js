import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/schema.js'

export default defineConfig({
  name: 'ayam-kedaton-studio',
  title: 'Ayam Kedaton Studio',
  projectId: '0b8sjspb',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
})
