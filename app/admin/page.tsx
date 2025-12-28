import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  return { user, profile }
}

async function getAdminStats() {
  const supabase = await createClient()
  
  const [
    { count: totalUsers },
    { count: totalProducts },
    { count: pendingProducts }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'pending')
  ])

  return {
    totalUsers: totalUsers || 0,
    totalProducts: totalProducts || 0,
    pendingProducts: pendingProducts || 0
  }
}

async function getProductsBySeller() {
  const supabase = await createClient()
  
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      owner:profiles(id, email, role),
      images:product_images(*)
    `)
    .order('owner_id', { ascending: true })
    .order('created_at', { ascending: false })

  // Group products by seller
  const productsBySeller = (products || []).reduce((acc: any, product: any) => {
    const sellerId = product.owner_id
    // Skip products without owner profile
    if (!product.owner || !sellerId) return acc
    
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: product.owner,
        products: []
      }
    }
    acc[sellerId].products.push(product)
    return acc
  }, {})

  return Object.values(productsBySeller) as Array<{
    seller: { id: string; email: string; role: string }
    products: any[]
  }>
}

export default async function AdminDashboard() {
  const { user, profile } = await getUser()
  const stats = await getAdminStats()
  const productsBySeller = await getProductsBySeller()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <nav className="space-x-4">
              <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
              <Link href="/admin/users" className="text-gray-600 hover:text-gray-900">
                Users
              </Link>
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
            <h2 className="text-2xl font-semibold mb-4">Welcome, Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
                <div className="text-gray-600">Total Users</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl font-bold text-green-600">{stats.totalProducts}</div>
                <div className="text-gray-600">Total Products</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl font-bold text-yellow-600">{stats.pendingProducts}</div>
                <div className="text-gray-600">Pending Approval</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Products by Seller</h3>
            
            {productsBySeller.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600">No sellers found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {productsBySeller.map((sellerData) => (
                  <div key={sellerData.seller?.id || Math.random()} className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="text-lg font-medium text-gray-900">
                        {sellerData.seller?.email || 'Unknown Seller'}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {sellerData.seller?.role || 'unknown'}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({sellerData.products.length} products)
                        </span>
                      </h4>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sellerData.products.map((product) => (
                          <div key={product.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900 truncate">{product.title}</h5>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                product.status === 'approved' ? 'bg-green-100 text-green-800' :
                                product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                product.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {product.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-900">
                                {product.price} {product.currency}
                              </span>
                              <div className="flex space-x-1">
                                {product.status === 'pending' && (
                                  <>
                                    <button className="text-green-600 hover:text-green-700 text-xs">
                                      Approve
                                    </button>
                                    <button className="text-red-600 hover:text-red-700 text-xs">
                                      Reject
                                    </button>
                                  </>
                                )}
                                <Link 
                                  href={`/product/${product.id}`}
                                  className="text-blue-600 hover:text-blue-700 text-xs"
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}