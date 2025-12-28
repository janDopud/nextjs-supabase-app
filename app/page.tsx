import { createClient } from '@/lib/supabase/server'
import { Product } from '@/types/database'
import Link from 'next/link'

async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*),
      owner:profiles(email)
    `)
    .eq('status', 'approved')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(12)

  if (error) {
    console.error('Error fetching products:', "Message: " + error.message + " Code: " + error.code)
    return []
  }

  return products || []
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">BZMarket</h1>
          <nav className="space-x-4">
            <Link href="/auth/login" className="btn-primary">
              Login
            </Link>
            <Link href="/auth/register" className="btn-secondary">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          
          {products.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${product.images[0].image_path}`}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-1 line-clamp-2">{product.description}</p>
                    <p className="text-gray-500 text-xs mb-3">by {product.owner?.email || 'Unknown Seller'}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary-600">
                        {product.price} {product.currency}
                      </span>
                      <Link 
                        href={`/product/${product.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}