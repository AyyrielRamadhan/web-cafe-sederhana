"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useMemo } from "react"
import { CAFE_WHATSAPP_NUMBER, formatRupiah } from "@/lib/products"
import { useCafe } from "@/components/cafe/cafe-provider"

export default function CartPage() {
  const { cart, products, cartSubtotal, loaded, setQuantity, removeFromCart } = useCafe()
  const lines = useMemo(() => cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    return product ? [{ ...line, product }] : []
  }), [cart, products])

  const checkout = () => {
    const order = lines.map(({ product, quantity }) => `${quantity} × ${product.name} — ${formatRupiah(product.price * quantity)}`).join("\n")
    const message = `Halo Kopi Senja! Saya ingin memesan:\n\n${order}\n\nTotal: ${formatRupiah(cartSubtotal)}\n\nMohon konfirmasi pesanan saya. Terima kasih!`
    window.open(`https://wa.me/${CAFE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <main className="cart-page">
      <section className="page-intro page-container"><span className="eyebrow">A little something for later</span><h1>Your <em>bag.</em></h1><p>Good things are even better when shared.</p><div className="breadcrumb"><span>Home</span><span>/</span><strong>Your bag</strong></div></section>
      <section className="page-container cart-content">
        {!loaded ? <div className="cart-loading" role="status"><span className="eyebrow">Just a moment</span><p>Gathering your good things...</p></div> : lines.length === 0 ? <div className="cart-empty"><span className="cart-empty-icon"><ShoppingBag aria-hidden="true" /></span><span className="eyebrow">Your bag is taking a little nap</span><h2>Nothing in here<br /><em>just yet.</em></h2><p>Let&apos;s find something lovely to bring home.</p><Link className="button button-dark" href="/menu">Explore the menu <ArrowRight aria-hidden="true" /></Link></div> : <div className="cart-layout">
          <div className="cart-items"><div className="cart-section-heading"><h2>Your order <span>({lines.reduce((total, item) => total + item.quantity, 0)})</span></h2><Link href="/menu" className="text-link"><ArrowLeft aria-hidden="true" /> Keep browsing</Link></div>
            {lines.map(({ product, quantity }) => <article className="cart-item" key={product.id}><img src={product.image} alt={product.name} /><div className="cart-item-details"><span className="eyebrow">{product.category}</span><h3>{product.name}</h3><p>{formatRupiah(product.price)}</p><div className="quantity-control"><button type="button" onClick={() => setQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name} quantity`}><Minus aria-hidden="true" /></button><span aria-live="polite">{quantity}</span><button type="button" onClick={() => setQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name} quantity`}><Plus aria-hidden="true" /></button></div></div><div className="cart-item-end"><strong>{formatRupiah(product.price * quantity)}</strong><button className="remove-item" type="button" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`}><Trash2 aria-hidden="true" /><span>Remove</span></button></div></article>)}
          </div>
          <aside className="order-summary"><span className="eyebrow">Almost yours</span><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><span>{formatRupiah(cartSubtotal)}</span></div><div className="summary-row"><span>Pickup / delivery</span><span>Confirmed on WhatsApp</span></div><div className="summary-total"><span>Total</span><strong>{formatRupiah(cartSubtotal)}</strong></div><button className="button button-dark checkout-button" type="button" onClick={checkout}>Order via WhatsApp <ArrowRight aria-hidden="true" /></button><p className="checkout-note">We&apos;ll confirm availability and pickup details with you directly.</p></aside>
        </div>}
      </section>
    </main>
  )
}
