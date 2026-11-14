"use client"

import { Plus } from "lucide-react"
import { Product, formatRupiah } from "@/lib/products"
import { useCafe } from "@/components/cafe/cafe-provider"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCafe()

  return (
    <article className={`product-card ${!product.available ? "product-unavailable" : ""}`}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        {product.featured && <span className="product-tag">Senja favorite</span>}
        {!product.available && <span className="product-tag unavailable-tag">Sold out</span>}
        <button className="add-product-button" type="button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`} disabled={!product.available}>
          <Plus aria-hidden="true" />
        </button>
      </div>
      <div className="product-info">
        <div className="product-title-row"><h3>{product.name}</h3><span>{formatRupiah(product.price)}</span></div>
        <p>{product.description}</p>
      </div>
    </article>
  )
}
