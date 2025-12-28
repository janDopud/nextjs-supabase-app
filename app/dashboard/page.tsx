import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile }
}

async function getUserProducts(userId: string) {
  const supabase = await createClient()
  
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })

  return products || []
}

export default async function DashboardPage() {
  const { user, profile } = await getUser()
  const products = await getUserProducts(user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
            <nav className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Shop
              </Link>
              <form action="/auth/logout" method="post" className="inline">
                <button type="submit" className="text-red-600 hover:text-red-700">
                  Logout
                </button>
              </form>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {profile?.email}</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">{products.length}</div>
                  <div className="text-gray-600">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {products.filter(p => p.status === 'approved').length}
                  </div>
                  <div className="text-gray-600">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {products.filter(p => p.status === 'pending').length}
                  </div>
                  <div className="text-gray-600">Pending</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-xl font-semibold">My Products</h3>
            <Link href="/dashboard/products/new" className="btn-primary">
              Add New Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">You haven't created any products yet.</p>
              <Link href="/dashboard/products/new" className="btn-primary">
                Create Your First Product
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              className="h-16 w-16 rounded object-cover"
                              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${product.images[0].image_path}`}
                              alt={product.title}
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.price} {product.currency}</div>
                          <div className="text-sm">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.status === 'approved' ? 'bg-green-100 text-green-800' :
                              product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/dashboard/products/${product.id}/edit`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <Link 
                          href={`/product/${product.id}`}
                          className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}