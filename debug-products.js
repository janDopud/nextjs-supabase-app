const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wwoankgrrnxethqosjmc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3b2Fua2dycm54ZXRocW9zam1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzE5NzQsImV4cCI6MjA1MDU0Nzk3NH0.Zty6Cswu3aDfvzwT8fZkEg_IxNMCeWM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugProducts() {
  console.log('Testing Supabase connection...')
  
  // Test basic connection
  try {
    const { data, error } = await supabase.from('products').select('count').single()
    console.log('Connection test:', { data, error })
  } catch (err) {
    console.error('Connection error:', err)
  }

  // Check if products table exists and has data
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .limit(5)
    
    console.log('Products query result:')
    console.log('Error:', error)
    console.log('Data:', products)
    console.log('Count:', products?.length || 0)
  } catch (err) {
    console.error('Products query error:', err)
  }

  // Check approved products specifically
  try {
    const { data: approvedProducts, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'approved')
      .eq('is_active', true)
    
    console.log('Approved products:')
    console.log('Error:', error)
    console.log('Data:', approvedProducts)
    console.log('Count:', approvedProducts?.length || 0)
  } catch (err) {
    console.error('Approved products query error:', err)
  }
}

debugProducts()