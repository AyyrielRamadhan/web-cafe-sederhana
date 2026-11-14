import Link from "next/link"
import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="page-intro page-container"><span className="eyebrow">A place to come back to</span><h1>Good coffee.<br /><em>Good people.</em></h1><p>We opened Kopi Senja for the moments that make an ordinary day feel like something special.</p><div className="breadcrumb"><span>Home</span><span>/</span><strong>Our story</strong></div></section>
      <section className="page-container story-hero"><img src="/images/kopi-senja-story.png" alt="Coffee and pastry shared around a cafe table" /><div className="story-image-note">Jakarta, Indonesia <span>·</span> Est. 2021</div></section>
      <section className="page-container story-copy-grid"><div><span className="eyebrow">How it started</span><h2>A little more<br /><em>room to breathe.</em></h2></div><div className="story-prose"><p className="lead">Senja means twilight — that gentle pause between a busy day and a slower evening. We wanted to bring that feeling into the middle of every day.</p><p>Kopi Senja began with one simple thought: a neighborhood cafe should feel like a friend&apos;s living room, only with really good coffee. Since 2021, we&apos;ve been building just that — one carefully brewed cup, one shared table, and one familiar hello at a time.</p><p>Our coffee comes from people we know and trust across Indonesia. Our kitchen works with fresh, honest ingredients. And everything else? We keep it easy, warm, and welcoming.</p><Link href="/menu" className="text-link">Taste what we mean <ArrowRight aria-hidden="true" /></Link></div></section>
      <section className="mission-section"><div className="page-container"><span className="eyebrow light-eyebrow">What we believe</span><h2>Small moments make<br /><em>the whole day.</em></h2><div className="mission-grid"><article><Heart aria-hidden="true" /><h3>Our vision</h3><p>To be the neighborhood&apos;s favorite little pause — a place where everyone feels at home.</p></article><article><Leaf aria-hidden="true" /><h3>Our promise</h3><p>Serve good things with care, source thoughtfully, and leave room for the people around us.</p></article><article><Sparkles aria-hidden="true" /><h3>Our ritual</h3><p>Make every cup with patience, every welcome with warmth, and every visit worth remembering.</p></article></div></div></section>
      <section className="page-container about-last"><div><span className="eyebrow">Come as you are</span><h2>There&apos;s always<br />a seat <em>for you.</em></h2></div><img src="/images/kopi-senja-hero.png" alt="The warm interior and coffee bar at Kopi Senja" /></section>
    </main>
  )
}
