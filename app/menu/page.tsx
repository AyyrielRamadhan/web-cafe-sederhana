"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { categories, ProductCategory } from "@/lib/products"
import { useCafe } from "@/components/cafe/cafe-provider"
import { ProductCard } from "@/components/cafe/product-card"

export default function MenuPage() {
  const { products } = useCafe()
  const [category, setCategory] = useState<(typeof categories)[number]>("All Menu")
  const [search, setSearch] = useState("")
  const visibleProducts = useMemo(() => products.filter((product) =>
    (category === "All Menu" || product.category === category as ProductCategory) &&
    `${product.name} ${product.description}`.toLowerCase().includes(search.trim().toLowerCase())
  ), [products, category, search])

  return (
    <main className="menu-page">
      <section className="page-intro page-container"><span className="eyebrow">A little something for everyone</span><h1>Our <em>menu.</em></h1><p>Thoughtfully made, just the way you like it. Find your next favorite.</p><div className="breadcrumb"><span>Home</span><span>/</span><strong>Menu</strong></div></section>
      <section className="page-container menu-content" aria-label="Browse menu">
        <div className="menu-toolbar"><div className="category-list" role="group" aria-label="Filter by category">{categories.map((item) => <button key={item} className={`category-button ${category === item ? "active" : ""}`} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><Search aria-hidden="true" /><span className="sr-only">Search menu</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find something lovely" /></label></div>
        <div className="menu-result-count">{`Showing ${visibleProducts.length} ${visibleProducts.length === 1 ? "treat" : "treats"}`}</div>
        {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-results"><span className="eyebrow">Nothing brewing here</span><h2>Try another search.</h2><p>We couldn&apos;t find a menu item matching “{search}”.</p><button type="button" className="text-link" onClick={() => { setSearch(""); setCategory("All Menu") }}>Clear filters</button></div>}
      </section>
    </main>
  )
}
