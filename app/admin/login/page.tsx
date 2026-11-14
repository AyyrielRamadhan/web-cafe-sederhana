"use client"

import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Coffee, Eye, EyeOff } from "lucide-react"

const ADMIN_EMAIL = "admin@kopisenja.id"
const ADMIN_PASSWORD = "senja123"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (localStorage.getItem("kopi-senja-admin-session") === "active") router.replace("/admin/dashboard")
  }, [router])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("That email and password don’t match our demo account.")
      return
    }
    localStorage.setItem("kopi-senja-admin-session", "active")
    router.push("/admin/dashboard")
  }

  return (
    <main className="admin-login-page">
      <Link href="/" className="login-back"><ArrowLeft aria-hidden="true" /> Back to the cafe</Link>
      <section className="login-card"><Link href="/" className="login-brand"><span className="brand-mark"><Coffee aria-hidden="true" /></span><span>KOPI <strong>SENJA</strong><small>ADMIN STUDIO</small></span></Link><div className="login-heading"><span className="eyebrow">Good to see you</span><h1>Welcome <em>back.</em></h1><p>Sign in to keep the little things running smoothly.</p></div>
        <form className="login-form" onSubmit={submit} noValidate><label>Email address<input type="email" autoComplete="username" value={email} onChange={(event) => { setEmail(event.target.value); setError("") }} placeholder="you@kopisenja.id" required /></label><label>Password<span className="password-field"><input type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setError("") }} placeholder="Enter your password" required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></span></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark login-submit" type="submit">Sign in to dashboard <span aria-hidden="true">→</span></button></form>
        <div className="demo-access"><strong>Prototype demo access</strong><span>Email: {ADMIN_EMAIL}</span><span>Password: {ADMIN_PASSWORD}</span></div>
        <p className="login-disclaimer">This prototype uses browser-only demo authentication. Do not use real credentials or customer data.</p>
      </section>
    </main>
  )
}
