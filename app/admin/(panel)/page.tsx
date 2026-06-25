import { connectDB } from '@/lib/mongodb'
import { ProductModel } from '@/models/Product'
import { CategoryModel } from '@/models/Category'
import { SubcategoryModel } from '@/models/Subcategory'
import AdminHeader from '@/components/admin/AdminHeader'
import StatsCard from '@/components/admin/StatsCard'
import { Package, Tag, Layers, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  await connectDB()

  const [productCount, categoryCount, subcategoryCount, recentProducts, inStockCount] = await Promise.all([
    ProductModel.countDocuments(),
    CategoryModel.countDocuments(),
    SubcategoryModel.countDocuments(),
    ProductModel.find({}).sort({ createdAt: -1 }).limit(5).lean<any[]>(),
    ProductModel.countDocuments({ inStock: true }),
  ])

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Products"    value={productCount}     subtitle={`${inStockCount} in stock`}         icon={Package}    color="yellow" />
          <StatsCard title="Categories"        value={categoryCount}    subtitle="Active product categories"           icon={Tag}        color="blue" />
          <StatsCard title="Subcategories"     value={subcategoryCount} subtitle="Sub-level classifications"           icon={Layers}     color="purple" />
          <StatsCard title="In Stock"          value={inStockCount}     subtitle={`${productCount - inStockCount} out of stock`} icon={TrendingUp} color="green" />
        </div>

        {/* Recent products */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Recent Products</h2>
            <Link href="/admin/products/new" className="text-xs font-medium text-yellow-600 hover:text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-lg transition-colors">
              + Add Product
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProducts.length === 0 ? (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">No products yet. <Link href="/admin/products/new" className="text-yellow-600 hover:underline">Create your first product.</Link></p>
            ) : recentProducts.map((p: any) => (
              <div key={p._id?.toString()} className="px-6 py-3.5 flex items-center gap-4">
                {p.colors?.[0]?.images?.[0] && (
                  <img src={p.colors[0].images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">PKR {p.price?.toLocaleString('en-PK')} &middot; {p.collection}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {p.inStock
                    ? <><CheckCircle size={13} className="text-green-500" /><span className="text-xs text-green-600">In stock</span></>
                    : <><AlertCircle size={13} className="text-red-400" /><span className="text-xs text-red-500">Out of stock</span></>
                  }
                </div>
                <Link href={`/admin/products/${p.id}/edit`} className="text-xs text-gray-400 hover:text-yellow-600 transition-colors flex-shrink-0">Edit</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/admin/products/new',      label: 'Add New Product',      icon: Package },
            { href: '/admin/categories/new',    label: 'Add Category',         icon: Tag },
            { href: '/admin/subcategories/new', label: 'Add Subcategory',      icon: Layers },
          ].map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:border-yellow-400 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                <Icon size={18} className="text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-700">{label}</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
