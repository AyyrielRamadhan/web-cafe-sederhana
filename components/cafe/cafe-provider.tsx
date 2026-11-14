"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { CartLine, initialProducts, Product } from "@/lib/products"

type CafeContextValue = {
  products: Product[]
  cart: CartLine[]
  cartCount: number
  cartSubtotal: number
  loaded: boolean
  notice: string
  addToCart: (product: Product) => void
  setQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  saveProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
  notify: (message: string) => void
}

const CafeContext = createContext<CafeContextValue | null>(null)
const PRODUCTS_KEY = "kopi-senja-products"
const CART_KEY = "kopi-senja-cart"

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false
  const item = value as Product
  return typeof item.id === "string" && typeof item.name === "string" &&
    ["Coffee", "Non-Coffee", "Food", "Dessert"].includes(item.category) &&
    typeof item.description === "string" && Number.isFinite(item.price) && item.price >= 0 &&
    typeof item.image === "string" && typeof item.available === "boolean"
}

export function CafeProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [cart, setCart] = useState<CartLine[]>([])
  const [loaded, setLoaded] = useState(false)
  const [notice, setNotice] = useState("")

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY)
      const storedCart = localStorage.getItem(CART_KEY)
      if (storedProducts) {
        const parsed: unknown = JSON.parse(storedProducts)
        if (Array.isArray(parsed)) setProducts(parsed.filter(isProduct))
      }
      if (storedCart) {
        const parsed: unknown = JSON.parse(storedCart)
        if (Array.isArray(parsed)) {
          setCart(parsed.filter((line): line is CartLine => Boolean(line) && typeof line.productId === "string" && Number.isInteger(line.quantity) && line.quantity > 0))
        }
      }
    } catch {
      setProducts(initialProducts)
      setCart([])
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  }, [loaded, products])

  useEffect(() => {
    if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [loaded, cart])

  const notify = useCallback((message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2600)
  }, [])

  const addToCart = useCallback((product: Product) => {
    if (!product.available) return
    setCart((current) => {
      const line = current.find((item) => item.productId === product.id)
      return line
        ? current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { productId: product.id, quantity: 1 }]
    })
    notify(`${product.name} ditambahkan ke keranjang`)
  }, [notify])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((item) => item.productId !== productId))
      return
    }
    setCart((current) => current.map((item) => item.productId === productId ? { ...item, quantity } : item))
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId))
  }, [])

  const saveProduct = useCallback((product: Product) => {
    setProducts((current) => current.some((item) => item.id === product.id)
      ? current.map((item) => item.id === product.id ? product : item)
      : [product, ...current])
  }, [])

  const deleteProduct = useCallback((productId: string) => {
    setProducts((current) => current.filter((item) => item.id !== productId))
    setCart((current) => current.filter((item) => item.productId !== productId))
  }, [])

  const value = useMemo(() => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
    const cartSubtotal = cart.reduce((total, item) => {
      const product = products.find((candidate) => candidate.id === item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
    return { products, cart, cartCount, cartSubtotal, loaded, notice, addToCart, setQuantity, removeFromCart, saveProduct, deleteProduct, notify }
  }, [products, cart, loaded, notice, addToCart, setQuantity, removeFromCart, saveProduct, deleteProduct, notify])

  return (
    <CafeContext.Provider value={value}>
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {notice && <p className="toast-message">{notice}</p>}
      </div>
    </CafeContext.Provider>
  )
}

export function useCafe() {
  const context = useContext(CafeContext)
  if (!context) throw new Error("useCafe must be used within CafeProvider")
  return context
}
