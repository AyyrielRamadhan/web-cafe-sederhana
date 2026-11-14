export type ProductCategory = "Coffee" | "Non-Coffee" | "Food" | "Dessert"

export type Product = {
  id: string
  name: string
  category: ProductCategory
  description: string
  price: number
  image: string
  available: boolean
  featured?: boolean
}

export type CartLine = {
  productId: string
  quantity: number
}

export const CAFE_WHATSAPP_NUMBER = "6281234567890"

export const formatWhatsAppDisplayNumber = () => {
  const digits = CAFE_WHATSAPP_NUMBER.replace(/\D/g, "")
  const localNumber = digits.startsWith("62") ? digits.slice(2) : digits
  return digits.startsWith("62") && localNumber.length >= 8
    ? `+62 ${localNumber.slice(0, 3)} ${localNumber.slice(3, 7)} ${localNumber.slice(7)}`
    : `+${digits}`
}

export const categories = ["All Menu", "Coffee", "Non-Coffee", "Food", "Dessert"] as const

export const initialProducts: Product[] = [
  { id: "espresso", name: "Espresso", category: "Coffee", description: "A bold, balanced shot with notes of dark chocolate.", price: 18000, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=85", available: true, featured: false },
  { id: "americano", name: "Americano", category: "Coffee", description: "Our house espresso, lengthened with hot water.", price: 22000, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85", available: true, featured: true },
  { id: "cafe-latte", name: "Cafe Latte", category: "Coffee", description: "Silky steamed milk meets our signature espresso.", price: 28000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85", available: true, featured: true },
  { id: "cappuccino", name: "Cappuccino", category: "Coffee", description: "A beautiful balance of espresso, milk and foam.", price: 28000, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=85", available: true, featured: false },
  { id: "caramel-macchiato", name: "Caramel Macchiato", category: "Coffee", description: "Espresso and creamy milk finished with caramel.", price: 32000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85", available: true, featured: false },
  { id: "matcha-latte", name: "Matcha Latte", category: "Non-Coffee", description: "Ceremonial-grade matcha whisked until smooth.", price: 30000, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=85", available: true, featured: true },
  { id: "chocolate-milk", name: "Chocolate Milk", category: "Non-Coffee", description: "Rich Indonesian cocoa with chilled fresh milk.", price: 25000, image: "https://images.unsplash.com/photo-1542990253-0b8be6f5a52d?auto=format&fit=crop&w=900&q=85", available: true, featured: false },
  { id: "strawberry-tea", name: "Strawberry Tea", category: "Non-Coffee", description: "Fragrant tea, real strawberries and a little sunshine.", price: 22000, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85", available: true, featured: false },
  { id: "chicken-katsu", name: "Chicken Katsu Rice", category: "Food", description: "Crispy chicken, house-made sauce and warm rice.", price: 35000, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85", available: true, featured: false },
  { id: "beef-burger", name: "Beef Burger", category: "Food", description: "Juicy grilled beef, sharp cheddar and house pickles.", price: 38000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85", available: true, featured: true },
  { id: "chocolate-croissant", name: "Chocolate Croissant", category: "Dessert", description: "Flaky, buttery pastry with a dark chocolate center.", price: 25000, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85", available: true, featured: false },
  { id: "cheesecake", name: "Cheesecake", category: "Dessert", description: "Creamy baked cheesecake with a delicate crumb.", price: 30000, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85", available: true, featured: true },
]

export const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount)
