import { SEED_MENU_IDS, SEED_PRODUCTS } from './seed'
import type { Product } from './types'

const PRODUCTS_KEY = 'cardapio.products.v1'
const MENU_KEY = 'cardapio.menu.v1'
const WEEK_LABEL_KEY = 'cardapio.weekLabel.v1'
const SEEDED_KEY = 'cardapio.seeded.v1'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function ensureSeeded(): void {
  if (localStorage.getItem(SEEDED_KEY)) return
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS))
  localStorage.setItem(MENU_KEY, JSON.stringify(SEED_MENU_IDS))
  localStorage.setItem(WEEK_LABEL_KEY, defaultWeekLabel())
  localStorage.setItem(SEEDED_KEY, '1')
}

export function loadProducts(): Product[] {
  ensureSeeded()
  return readJson<Product[]>(PRODUCTS_KEY, SEED_PRODUCTS)
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export function loadMenuIds(): string[] {
  ensureSeeded()
  return readJson<string[]>(MENU_KEY, SEED_MENU_IDS)
}

export function saveMenuIds(ids: string[]): void {
  localStorage.setItem(MENU_KEY, JSON.stringify(ids))
}

export function loadWeekLabel(): string {
  ensureSeeded()
  return localStorage.getItem(WEEK_LABEL_KEY) || defaultWeekLabel()
}

export function saveWeekLabel(label: string): void {
  localStorage.setItem(WEEK_LABEL_KEY, label)
}

export function defaultWeekLabel(): string {
  const now = new Date()
  const start = new Date(now)
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const fmt = (d: Date) =>
    d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })

  return `Semana de ${fmt(start)} a ${fmt(end)}`
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function createId(): string {
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}
