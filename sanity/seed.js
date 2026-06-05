import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import sanityClient from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const contentDir = path.join(projectRoot, 'content')

const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  const rawEnv = fs.readFileSync(envPath, 'utf8')
  rawEnv.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return
    const [key, ...rest] = trimmed.split('=')
    const value = rest.join('=').trim().replace(/^"(.*)"$/, '$1').replace(/^\'(.*)\'$/, '$1')
    if (!process.env[key]) {
      process.env[key] = value
    }
  })
}

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN
if (!token) {
  throw new Error('Please set SANITY_API_TOKEN or SANITY_TOKEN in your environment or .env file before running this script.')
}

const client = sanityClient({
  projectId: '0b8sjspb',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  token,
  ignoreBrowserTokenWarning: true
})

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')

const resolveAssetPath = (assetPath) => {
  if (!assetPath) return null
  const normalized = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
  return path.join(projectRoot, normalized)
}

const uploadImage = async (filePath) => {
  if (!filePath) return null
  const absolute = resolveAssetPath(filePath)
  if (!absolute || !fs.existsSync(absolute)) {
    console.warn(`Image file not found: ${filePath}`)
    return null
  }

  const asset = await client.assets.upload('image', fs.createReadStream(absolute), {
    filename: path.basename(absolute)
  })

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id
    }
  }
}

const main = async () => {
  const [homeJson, menuJson, testimonialsJson] = await Promise.all([
    fsPromises.readFile(path.join(contentDir, 'home.json'), 'utf8'),
    fsPromises.readFile(path.join(contentDir, 'menu.json'), 'utf8'),
    fsPromises.readFile(path.join(contentDir, 'testimonials.json'), 'utf8')
  ])

  const home = JSON.parse(homeJson)
  const menu = JSON.parse(menuJson)
  const testimonials = JSON.parse(testimonialsJson)

  console.log('Uploading hero image...')
  const heroImage = await uploadImage(home.image)

  console.log('Creating siteSettings document...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    eyebrow: home.eyebrow,
    headline: home.headline,
    sub: home.sub,
    heroImage
  })

  console.log('Creating menu items...')
  for (const item of menu.items) {
    const image = await uploadImage(item.image)
    await client.createOrReplace({
      _id: `menuItem-${slugify(item.name)}`,
      _type: 'menuItem',
      name: item.name,
      description: item.description,
      price: item.price,
      image
    })
  }

  console.log('Creating testimonials...')
  for (const item of testimonials.items) {
    await client.createOrReplace({
      _id: `testimonial-${slugify(item.author)}`,
      _type: 'testimonial',
      text: item.text,
      author: item.author
    })
  }

  console.log('Sanity seed complete!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
