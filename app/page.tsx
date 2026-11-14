import { AboutPreview, HomeHero, VisitCta, WhySenja } from "@/components/cafe/home-sections"
import { FeaturedMenu } from "@/components/cafe/featured-menu"
import { StorefrontLayout } from "@/components/cafe/site-chrome"

export default function HomePage() {
  return <StorefrontLayout><main><HomeHero /><FeaturedMenu /><AboutPreview /><WhySenja /><VisitCta /></main></StorefrontLayout>
}
