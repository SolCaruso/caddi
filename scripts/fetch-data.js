require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function fetchData() {
  try {
    console.log('Fetching data from Supabase...')

    // Fetch products with categories
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)

    if (productsError) {
      console.error('Error fetching products:', productsError)
      console.log('This might be due to Row Level Security (RLS). Check your Supabase dashboard.')
      return
    }

    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError)
      return
    }

    // Fetch product variants with colors, sizes, and types
    const { data: productVariants, error: variantsError } = await supabase
      .from('product_variants')
      .select(`
        *,
        colors(name),
        sizes(name),
        types(name)
      `)

    if (variantsError) {
      console.error('Error fetching product variants:', variantsError)
      return
    }

    // Fetch images
    const { data: images, error: imagesError } = await supabase
      .from('images')
      .select('*')

    if (imagesError) {
      console.error('Error fetching images:', imagesError)
      return
    }

    // Fetch colors
    const { data: colors, error: colorsError } = await supabase
      .from('colors')
      .select('*')

    if (colorsError) {
      console.error('Error fetching colors:', colorsError)
      return
    }

    // Fetch sizes
    const { data: sizes, error: sizesError } = await supabase
      .from('sizes')
      .select('*')

    if (sizesError) {
      console.error('Error fetching sizes:', sizesError)
      return
    }

    // Fetch types (wood types)
    const { data: types, error: typesError } = await supabase
      .from('types')
      .select('*')

    if (typesError) {
      console.error('Error fetching types:', typesError)
      return
    }

    // Fetch tags
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('*')

    if (tagsError) {
      console.error('Error fetching tags:', tagsError)
      return
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Write all data files
    fs.writeFileSync(
      path.join(dataDir, 'products.json'),
      JSON.stringify(products, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'categories.json'),
      JSON.stringify(categories, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'product-variants.json'),
      JSON.stringify(productVariants, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'images.json'),
      JSON.stringify(images, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'colors.json'),
      JSON.stringify(colors, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'sizes.json'),
      JSON.stringify(sizes, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'types.json'),
      JSON.stringify(types, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'tags.json'),
      JSON.stringify(tags, null, 2)
    )

    console.log(`✅ Fetched ${products?.length || 0} products`)
    console.log(`✅ Fetched ${categories?.length || 0} categories`)
    console.log(`✅ Fetched ${productVariants?.length || 0} product variants`)
    console.log(`✅ Fetched ${images?.length || 0} images`)
    console.log(`✅ Fetched ${colors?.length || 0} colors`)
    console.log(`✅ Fetched ${sizes?.length || 0} sizes`)
    console.log(`✅ Fetched ${types?.length || 0} types`)
    console.log(`✅ Fetched ${tags?.length || 0} tags`)
    console.log('Data files generated successfully!')

  } catch (error) {
    console.error('Error fetching data:', error)
    process.exit(1)
  }
}

fetchData() 