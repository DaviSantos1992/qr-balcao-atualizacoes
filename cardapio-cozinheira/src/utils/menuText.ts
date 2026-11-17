import { CATEGORIES, type Product } from '../types'
import { formatPrice } from '../storage'

export function buildMenuText(weekLabel: string, products: Product[]): string {
  const lines: string[] = [
    `*Cardápio da semana*`,
    weekLabel,
    '',
  ]

  for (const category of CATEGORIES) {
    const items = products.filter((p) => p.category === category)
    if (items.length === 0) continue
    lines.push(`*${category}*`)
    for (const item of items) {
      lines.push(`• ${item.name} — ${formatPrice(item.price)}`)
    }
    lines.push('')
  }

  lines.push('Pedidos pelo WhatsApp. Obrigada!')
  return lines.join('\n').trim()
}

export function whatsappShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
