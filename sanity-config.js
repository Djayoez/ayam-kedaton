// Sanity configuration for Ayam Kedaton
// Replace the values below with your actual Sanity project settings.
window.SANITY_CONFIG = {
  projectId: '0b8sjspb',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: true,
  query: {
    home: '*[_type == "siteSettings"][0]{eyebrow, headline, sub, "image": heroImage.asset->url}',
    menu: '*[_type == "menuItem"] | order(category->order asc, order asc) {name, description, price, "category": category->name, "image": image.asset->url}',
    testimonials: '*[_type == "testimonial"]{author, text}'
  }
};
