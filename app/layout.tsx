import type { Metadata, Viewport } from "next"
import { CafeProvider } from "@/components/cafe/cafe-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "Kopi Senja — Coffee & Slow Days", template: "%s | Kopi Senja" },
  description: "A little corner of calm in Jakarta. Thoughtfully sourced coffee, fresh things from the kitchen, and room to slow down.",
  applicationName: "Kopi Senja",
  openGraph: { title: "Kopi Senja — Coffee & Slow Days", description: "Thoughtfully made coffee and a slower kind of cafe moment in Senopati, Jakarta.", type: "website" },
}

export const viewport: Viewport = { themeColor: "#f8f6f0", width: "device-width", initialScale: 1, maximumScale: 5 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><CafeProvider>{children}</CafeProvider></body></html>
}
