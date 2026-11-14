"use client"

import Link from "next/link"
import { useMemo } from "react"
import { ArrowRight } from "lucide-react"
import { useCafe } from "@/components/cafe/cafe-provider"
import { ProductCard } from "@/components/cafe/product-card"

export function FeaturedMenu() {
  const { products } = useCafe()
  const featured = useMemo(() => {
    const availableProducts = products.filter((product) => product.available)
    const favorites = availableProducts.filter((product) => product.featured)
    const remaining = availableProducts.filter((product) => !product.featured)
    return [...favorites, ...remaining].slice(0, 4)
  }, [products])

  return (
    <section className="section-pad page-container" id="favorites">
      <div className="section-heading section-heading-row">
        <div><span className="eyebrow">Good things, made daily</span><h2>Made for your<br /><em>little rituals.</em></h2></div>
        <Link href="/menu" className="text-link">See the full menu <ArrowRight aria-hidden="true" /></Link>
      </div>
      {featured.length > 0 ? <div className="product-grid feature-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="featured-empty">We&apos;re refreshing the menu. Please check back soon.</p>}
    </section>
  )
}
