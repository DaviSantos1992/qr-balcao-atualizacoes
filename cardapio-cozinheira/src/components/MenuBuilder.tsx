import type { Product } from '../types'
import { CATEGORIES } from '../types'
import { formatPrice } from '../storage'

interface Props {
  products: Product[]
  menuIds: string[]
  weekLabel: string
  onToggle: (id: string) => void
  onWeekLabelChange: (label: string) => void
}

export function MenuBuilder({
  products,
  menuIds,
  weekLabel,
  onToggle,
  onWeekLabelChange,
}: Props) {
  const selectedCount = menuIds.length

  return (
    <section className="screen">
      <header className="screen-header">
        <p className="eyebrow">Montagem</p>
        <h1>Cardápio da semana</h1>
        <p className="lede">Toque nos produtos para incluir ou tirar do cardápio.</p>
      </header>

      <label className="field week-field">
        <span>Rótulo da semana</span>
        <input
          type="text"
          value={weekLabel}
          onChange={(e) => onWeekLabelChange(e.target.value)}
          placeholder="Ex.: Semana de 17 a 23 nov"
        />
      </label>

      <p className="selection-count">
        {selectedCount === 0
          ? 'Nenhum produto selecionado'
          : `${selectedCount} produto${selectedCount > 1 ? 's' : ''} no cardápio`}
      </p>

      {CATEGORIES.map((category) => {
        const items = products.filter((p) => p.category === category)
        if (items.length === 0) return null
        return (
          <div key={category} className="category-block">
            <h2 className="category-title">{category}</h2>
            <div className="menu-grid">
              {items.map((product) => {
                const selected = menuIds.includes(product.id)
                return (
                  <button
                    key={product.id}
                    type="button"
                    className={`menu-card${selected ? ' is-selected' : ''}`}
                    onClick={() => onToggle(product.id)}
                    aria-pressed={selected}
                  >
                    <img src={product.photo} alt="" />
                    <span className="menu-card-body">
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">{formatPrice(product.price)}</span>
                    </span>
                    <span className="check-badge" aria-hidden>
                      {selected ? '✓' : '+'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {products.length === 0 && (
        <div className="empty-state">
          <p>Cadastre produtos primeiro na aba Produtos.</p>
        </div>
      )}
    </section>
  )
}
