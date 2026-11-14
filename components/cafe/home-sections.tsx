import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Bean, Leaf, MapPin, Sparkles } from "lucide-react"

export function HomeHero() {
  return (
    <section className="hero-section">
      <div className="hero-image" role="img" aria-label="Warm, sunlit neighborhood coffee bar" />
      <div className="hero-overlay" />
      <div className="page-container hero-content">
        <span className="eyebrow light-eyebrow"><span /> A little corner of calm in Jakarta</span>
        <h1>A little coffee,<br /><em>a lot of happiness.</em></h1>
        <p>Nikmati setiap momen dengan secangkir kopi terbaik dan suasana yang nyaman.</p>
        <div className="hero-actions">
          <Link className="button button-cream" href="/menu">Explore our menu <ArrowRight aria-hidden="true" /></Link>
          <Link className="text-link light-link" href="/menu">Order something lovely <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <a className="hero-scroll" href="#favorites"><span>Scroll to discover</span><ArrowDown aria-hidden="true" /></a>
      </div>
      <div className="hero-index">01 <span>/</span> 04</div>
    </section>
  )
}

export function AboutPreview() {
  return (
    <section className="about-preview section-pad">
      <div className="page-container about-preview-grid">
        <div className="about-photo-wrap"><img src="/images/kopi-senja-story.png" alt="A cappuccino and freshly baked croissant served at Kopi Senja" /><span className="photo-caption">A slower kind of coffee break</span></div>
        <div className="about-copy"><span className="eyebrow">The story behind the cup</span><h2>Rooted in good coffee.<br /><em>Made for good company.</em></h2><p>We believe the best moments aren&apos;t rushed. They happen over thoughtfully sourced coffee, a warm pastry, and a table you don&apos;t have to leave just yet.</p><p>That little feeling is what we bring to every cup at Kopi Senja.</p><Link className="button button-outline" href="/about">Get to know us <ArrowRight aria-hidden="true" /></Link></div>
      </div>
    </section>
  )
}

export function WhySenja() {
  const values = [
    { icon: Bean, title: "Thoughtful beans", text: "Direct relationships with Indonesian growers, roasted in small batches." },
    { icon: Leaf, title: "Fresh, always", text: "Seasonal ingredients and a kitchen that makes the little things by hand." },
    { icon: Sparkles, title: "Room to slow down", text: "A warm, easy-going space that feels like it was made for you." },
  ]
  return (
    <section className="values-section section-pad"><div className="page-container"><div className="center-heading"><span className="eyebrow">The Senja feeling</span><h2>More than your<br /><em>daily cup.</em></h2></div><div className="values-grid">{values.map(({ icon: Icon, title, text }, index) => <article className="value-item" key={title}><span className="value-number">0{index + 1}</span><span className="value-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  )
}

export function VisitCta() {
  return <section className="visit-cta"><div className="page-container visit-cta-inner"><div><span className="eyebrow light-eyebrow">Your table is waiting</span><h2>Make a little room<br />for <em>something good.</em></h2></div><div className="visit-cta-actions"><p>Drop by for a cup, stay for the feeling. We&apos;ll have something lovely ready.</p><Link className="button button-cream" href="/contact">Come say hello <MapPin aria-hidden="true" /></Link></div></div></section>
}
