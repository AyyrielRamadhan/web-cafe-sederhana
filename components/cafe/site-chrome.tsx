"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ArrowUpRight, Camera, Coffee, MapPin, Menu as MenuIcon, ShoppingBag, X } from "lucide-react"
import { useCafe } from "@/components/cafe/cafe-provider"
import { CAFE_WHATSAPP_NUMBER, formatWhatsAppDisplayNumber } from "@/lib/products"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Visit us" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { cartCount } = useCafe()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner page-container">
        <Link href="/" className="brand-lockup" aria-label="Kopi Senja home" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><Coffee aria-hidden="true" /></span>
          <span className="brand-name">KOPI <span>SENJA</span><small>COFFEE & SLOW DAYS</small></span>
        </Link>
        <nav className={`desktop-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/cart" className="cart-link" aria-label={`Shopping cart, ${cartCount} items`}>
            <ShoppingBag aria-hidden="true" />
            <span>Bag</span>
            <span className="cart-count" aria-label={`${cartCount} items`}>{cartCount}</span>
          </Link>
          <button className="mobile-menu-button" type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand-lockup">
            <span className="brand-mark"><Coffee aria-hidden="true" /></span>
            <span className="brand-name">KOPI <span>SENJA</span><small>COFFEE & SLOW DAYS</small></span>
          </Link>
          <p>A little pause in the middle of your day. Made with care, served with warmth.</p>
          <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer"><Camera aria-hidden="true" /> Follow our days <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <Link href="/menu">Our menu</Link><Link href="/about">Our story</Link><Link href="/contact">Find us</Link>
        </div>
        <div className="footer-column">
          <h2>Come by</h2>
          <p><MapPin aria-hidden="true" /> Jl. Senopati No. 18, Jakarta Selatan</p>
          <p>Every day, 08.00 – 22.00</p>
          <a href={`https://wa.me/${CAFE_WHATSAPP_NUMBER}`}>{formatWhatsAppDisplayNumber()}</a>
        </div>
      </div>
      <div className="page-container footer-bottom"><span>© {new Date().getFullYear()} KOPI SENJA. Made for slow moments.</span><span>Jakarta, Indonesia</span></div>
    </footer>
  )
}

export function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>
}
