import type { Product } from './types'

/** Soft food-colored SVG placeholders as data URLs — no network needed */
function foodSvg(label: string, bg: string, accent: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#g)"/>
  <circle cx="310" cy="70" r="48" fill="rgba(255,255,255,0.18)"/>
  <circle cx="80" cy="230" r="36" fill="rgba(255,255,255,0.12)"/>
  <text x="200" y="158" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="rgba(255,255,255,0.92)">${label}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'seed-1',
    name: 'Marmita caseira',
    price: 22,
    category: 'Comidas',
    photo: foodSvg('Marmita', '#3d6b5a', '#6a9b7a'),
  },
  {
    id: 'seed-2',
    name: 'Feijoada completa',
    price: 35,
    category: 'Comidas',
    photo: foodSvg('Feijoada', '#5c4033', '#8b6914'),
  },
  {
    id: 'seed-3',
    name: 'Suco natural',
    price: 8,
    category: 'Bebidas',
    photo: foodSvg('Suco', '#c45c26', '#e89b4a'),
  },
  {
    id: 'seed-4',
    name: 'Café com leite',
    price: 6,
    category: 'Bebidas',
    photo: foodSvg('Café', '#4a3728', '#a67c52'),
  },
  {
    id: 'seed-5',
    name: 'Brigadeiro gourmet',
    price: 4.5,
    category: 'Doces',
    photo: foodSvg('Brigadeiro', '#5c2e1f', '#a05a3c'),
  },
  {
    id: 'seed-6',
    name: 'Bolo de cenoura',
    price: 12,
    category: 'Doces',
    photo: foodSvg('Bolo', '#d4722a', '#e8a86c'),
  },
  {
    id: 'seed-7',
    name: 'Kit talheres',
    price: 2,
    category: 'Outros',
    photo: foodSvg('Talheres', '#4a6b6b', '#7a9a9a'),
  },
]

export const SEED_MENU_IDS = ['seed-1', 'seed-3', 'seed-5', 'seed-6']
