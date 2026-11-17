import { useState } from 'react'
import type { Product } from '../types'
import { CATEGORIES } from '../types'
import { formatPrice } from '../storage'
import { buildMenuText, whatsappShareUrl } from '../utils/menuText'

interface Props {
  weekLabel: string
  products: Product[]
}

export function PreviewShare({ weekLabel, products }: Props) {
  const [copied, setCopied] = useState(false)
  const text = buildMenuText(weekLabel, products)
  const hasItems = products.length > 0

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select text area if clipboard fails
      const el = document.getElementById('menu-text-fallback') as HTMLTextAreaElement | null
      if (el) {
        el.select()
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  function handleWhatsApp() {
    window.open(whatsappShareUrl(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="screen">
      <header className="screen-header">
        <p className="eyebrow">Pronto para enviar</p>
        <h1>Prévia do cardápio</h1>
        <p className="lede">Confira como fica a mensagem e compartilhe no WhatsApp.</p>
      </header>

      {!hasItems ? (
        <div className="empty-state">
          <p>Selecione produtos na aba Cardápio para montar a mensagem.</p>
        </div>
      ) : (
        <>
          <article className="preview-card">
            <p className="preview-brand">Cardápio da Cozinha</p>
            <h2 className="preview-week">{weekLabel}</h2>
            {CATEGORIES.map((category) => {
              const items = products.filter((p) => p.category === category)
              if (items.length === 0) return null
              return (
                <div key={category} className="preview-group">
                  <h3>{category}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item.id}>
                        <span>{item.name}</span>
                        <span>{formatPrice(item.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <p className="preview-footer">Pedidos pelo WhatsApp. Obrigada!</p>
          </article>

          <textarea id="menu-text-fallback" className="sr-only" readOnly value={text} aria-hidden />

          <div className="share-actions">
            <button type="button" className="btn primary whatsapp" onClick={handleWhatsApp}>
              Enviar no WhatsApp
            </button>
            <button type="button" className="btn secondary" onClick={handleCopy}>
              {copied ? 'Copiado!' : 'Copiar texto'}
            </button>
          </div>
        </>
      )}
    </section>
  )
}
