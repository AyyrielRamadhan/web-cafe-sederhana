"use client"

import Link from "next/link"
import { FormEvent, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Coffee, LayoutDashboard, Pencil, ExternalLink, LogOut, Plus, Search, Store, Trash2, X } from "lucide-react"
import { categories, formatRupiah, Product, ProductCategory } from "@/lib/products"
import { useCafe } from "@/components/cafe/cafe-provider"

const productCategories = categories.filter((category) => category !== "All Menu") as ProductCategory[]
type ProductForm = { name: string; category: ProductCategory; description: string; price: string; image: string; available: boolean; featured: boolean }
const emptyForm: ProductForm = { name: "", category: "Coffee", description: "", price: "", image: "", available: true, featured: false }

export default function AdminDashboardPage() {
  const router = useRouter()
  const { products, saveProduct, deleteProduct } = useCafe()
  const [authorized, setAuthorized] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All Menu")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    const valid = localStorage.getItem("kopi-senja-admin-session") === "active"
    setAuthorized(valid)
    setAuthChecked(true)
    if (!valid) router.replace("/admin/login")
  }, [router])

  const filteredProducts = useMemo(() => products.filter((product) =>
    (filter === "All Menu" || product.category === filter) && product.name.toLowerCase().includes(query.toLowerCase().trim())
  ), [products, filter, query])

  const openCreate = () => { setEditingId(null); setForm(emptyForm); setFormError(""); setModalOpen(true) }
  const openEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({ name: product.name, category: product.category, description: product.description, price: String(product.price), image: product.image, available: product.available, featured: Boolean(product.featured) })
    setFormError("")
    setModalOpen(true)
  }

  const submitProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const price = Number(form.price)
    if (!form.name.trim() || !form.description.trim() || !Number.isFinite(price) || price <= 0 || !form.image.trim()) {
      setFormError("Please complete every field with a valid price.")
      return
    }
    const product: Product = {
      id: editingId ?? `${form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: form.name.trim(), category: form.category, description: form.description.trim(), price,
      image: form.image.trim(), available: form.available, featured: form.featured,
    }
    saveProduct(product)
    setModalOpen(false)
  }

  const signOut = () => { localStorage.removeItem("kopi-senja-admin-session"); router.replace("/admin/login") }

  if (!authChecked || !authorized) return <main className="admin-loading"><span className="eyebrow">Opening the studio...</span></main>

  return (
    <main className="admin-dashboard">
      <header className="admin-header"><Link href="/" className="admin-brand"><span className="brand-mark"><Coffee aria-hidden="true" /></span><span>KOPI <strong>SENJA</strong><small>ADMIN STUDIO</small></span></Link><div className="admin-header-actions"><Link href="/" className="admin-view-site"><ExternalLink aria-hidden="true" /> View website</Link><button className="admin-logout" type="button" onClick={signOut}><LogOut aria-hidden="true" /> Sign out</button></div></header>
      <div className="admin-workspace"><nav className="admin-sidebar" aria-label="Admin workspace"><span className="eyebrow">Workspace</span><a className="admin-sidebar-link is-active" href="#dashboard-overview"><LayoutDashboard aria-hidden="true" /> Overview</a><a className="admin-sidebar-link" href="#menu-management"><Coffee aria-hidden="true" /> Menu management</a><Link className="admin-sidebar-link" href="/"><Store aria-hidden="true" /> View storefront</Link></nav><div className="admin-container"><Link href="/" className="admin-back"><ArrowLeft aria-hidden="true" /> Back to storefront</Link><div className="dashboard-heading"><div><span className="eyebrow">Your cafe, at a glance</span><h1>Good morning, <em>Senja.</em></h1><p>Keep your menu fresh and the good things coming.</p></div><button className="button button-dark" type="button" onClick={openCreate}><Plus aria-hidden="true" /> Add a product</button></div>
        <section id="dashboard-overview" className="admin-stats" aria-label="Menu overview"><article><span className="eyebrow">Menu items</span><strong>{products.length}</strong><small>Across all categories</small></article><article><span className="eyebrow">Available today</span><strong>{products.filter((product) => product.available).length}</strong><small>Ready to be enjoyed</small></article><article><span className="eyebrow">Out of stock</span><strong>{products.filter((product) => !product.available).length}</strong><small>Currently unavailable</small></article></section>
        <section id="menu-management" className="admin-products"><div className="admin-products-heading"><div><span className="eyebrow">The good stuff</span><h2>Your menu <span>({filteredProducts.length})</span></h2></div><div className="admin-filters"><label className="admin-search"><Search aria-hidden="true" /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search menu" /></label><select aria-label="Filter products by category" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All Menu</option>{productCategories.map((category) => <option key={category}>{category}</option>)}</select></div></div>
          <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th scope="col">Product</th><th scope="col">Category</th><th scope="col">Price</th><th scope="col">Availability</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead><tbody>{filteredProducts.map((product) => <tr key={product.id}><td><div className="admin-product-cell"><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.description}</small></span></div></td><td><span className="admin-category">{product.category}</span></td><td>{formatRupiah(product.price)}</td><td><span className={`availability ${product.available ? "is-available" : "is-sold-out"}`}><i />{product.available ? "Available" : "Sold out"}</span></td><td><div className="table-actions"><button type="button" onClick={() => openEdit(product)} aria-label={`Edit ${product.name}`}><Pencil aria-hidden="true" /></button><button type="button" onClick={() => { if (window.confirm(`Remove ${product.name} from the menu?`)) deleteProduct(product.id) }} aria-label={`Delete ${product.name}`}><Trash2 aria-hidden="true" /></button></div></td></tr>)}</tbody></table>{filteredProducts.length === 0 && <div className="admin-empty"><h3>No menu items found.</h3><p>Try another search or category.</p></div>}</div>
        </section>
      </div>
      </div>
      {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><div className="modal-heading"><div><span className="eyebrow">{editingId ? "A small refresh" : "Something lovely"}</span><h2 id="product-modal-title">{editingId ? "Edit product" : "Add to the menu"}</h2></div><button type="button" className="modal-close" aria-label="Close form" onClick={() => setModalOpen(false)}><X aria-hidden="true" /></button></div><form className="product-form" onSubmit={submitProduct}><label>Product name<input autoFocus value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Vanilla latte" /></label><div className="form-two-col"><label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as ProductCategory })}>{productCategories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Price (IDR)<input type="number" min="1" step="1000" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="28000" /></label></div><label>Description<textarea rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="A little description for the menu" /></label><label>Image URL<input type="url" value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="https://..." /></label><div className="form-checks"><label><input type="checkbox" checked={form.available} onChange={(event) => setForm({ ...form, available: event.target.checked })} /> Available to order</label><label><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Senja favorite</label></div>{formError && <p className="form-error" role="alert">{formError}</p>}<div className="modal-actions"><button className="button button-outline" type="button" onClick={() => setModalOpen(false)}>Cancel</button><button className="button button-dark" type="submit">{editingId ? "Save changes" : "Add product"}</button></div></form></section></div>}
    </main>
  )
}
