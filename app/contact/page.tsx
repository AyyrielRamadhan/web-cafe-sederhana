import { ArrowUpRight, Camera, Clock3, MapPin, Phone } from "lucide-react"
import { CAFE_WHATSAPP_NUMBER, formatWhatsAppDisplayNumber } from "@/lib/products"

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="page-intro page-container"><span className="eyebrow">Your neighborhood, your cafe</span><h1>Come on <em>in.</em></h1><p>We&apos;re just around the corner, with a good cup and a table saved for you.</p><div className="breadcrumb"><span>Home</span><span>/</span><strong>Visit us</strong></div></section>
      <section className="page-container contact-grid">
        <div className="contact-details">
          <article className="contact-item"><span className="contact-icon"><MapPin aria-hidden="true" /></span><div><h2>Find us</h2><p>Jl. Senopati No. 18<br />Kebayoran Baru, Jakarta Selatan 12190</p><a href="https://maps.google.com/?q=Senopati+Jakarta" target="_blank" rel="noreferrer">Get directions <ArrowUpRight aria-hidden="true" /></a></div></article>
          <article className="contact-item"><span className="contact-icon"><Clock3 aria-hidden="true" /></span><div><h2>Opening hours</h2><p>Monday – Sunday<br />08.00 – 22.00 WIB</p><span className="open-status"><span /> Open every day</span></div></article>
          <article className="contact-item"><span className="contact-icon"><Phone aria-hidden="true" /></span><div><h2>Say hello</h2><p>For orders, questions, or just a friendly chat.</p><a href={`https://wa.me/${CAFE_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">{formatWhatsAppDisplayNumber()} <ArrowUpRight aria-hidden="true" /></a></div></article>
          <article className="contact-item"><span className="contact-icon"><Camera aria-hidden="true" /></span><div><h2>Follow along</h2><p>A little look at what&apos;s brewing.</p><a href="https://instagram.com" target="_blank" rel="noreferrer">@kopisenja <ArrowUpRight aria-hidden="true" /></a></div></article>
        </div>
        <div className="map-panel"><div className="map-decoration"><span className="map-grid-line line-one" /><span className="map-grid-line line-two" /><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><span className="map-pin"><MapPin aria-hidden="true" /></span><span className="map-label">KOPI SENJA</span></div><div className="map-caption"><span><strong>Senopati, Jakarta</strong><small>Your next favorite coffee stop</small></span><a href="https://maps.google.com/?q=Senopati+Jakarta" target="_blank" rel="noreferrer" aria-label="Open directions in Google Maps"><ArrowUpRight aria-hidden="true" /></a></div></div>
      </section>
      <section className="contact-bottom"><div className="page-container contact-bottom-inner"><span className="eyebrow light-eyebrow">Have something in mind?</span><h2>We&apos;d love to<br /><em>hear from you.</em></h2><a className="button button-cream" href={`https://wa.me/${CAFE_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight aria-hidden="true" /></a></div></section>
    </main>
  )
}
