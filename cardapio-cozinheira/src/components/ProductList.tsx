import type { Product } from '../types'
import { CATEGORIES } from '../types'
import { formatPrice } from '../storage'

interface Props {
  products: Product[]
  onAdd: () => void
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductList({ products, onAdd, onEdit, onDelete }: Props) {
  return (
    <section className="screen">
      <header className="screen-header">
        <p className="eyebrow">Sua cozinha</p>
        <h1>Produtos</h1>
        <p className="lede">Cadastre o que você vende — comidas, bebidas, doces e mais.</p>
      </header>

      {CATEGORIES.map((category) => {
        const items = products.filter((p) => p.category === category)
        if (items.length === 0) return null
        return (
          <div key={category} className="category-block">
            <h2 className="category-title">{category}</h2>
            <ul className="product-list">
              {items.map((product) => (
                <li key={product.id} className="product-row">
                  <button
                    type="button"
                    className="product-main"
                    onClick={() => onEdit(product)}
                    aria-label={`Editar ${product.name}`}
                  >
                    <img src={product.photo} alt="" className="product-thumb" />
                    <span className="product-meta">
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">{formatPrice(product.price)}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn danger"
                    onClick={() => {
                      if (confirm(`Excluir “${product.name}”?`)) onDelete(product.id)
                    }}
                    aria-label={`Excluir ${product.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}

      {products.length === 0 && (
        <div className="empty-state">
          <p>Nenhum produto ainda.</p>
          <p>Toque no botão + para começar.</p>
        </div>
      )}

      <button type="button" className="fab" onClick={onAdd} aria-label="Adicionar produto">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
    </section>
  )
}
