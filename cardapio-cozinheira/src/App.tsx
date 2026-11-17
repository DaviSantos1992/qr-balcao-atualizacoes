import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { MenuBuilder } from './components/MenuBuilder'
import { PreviewShare } from './components/PreviewShare'
import { ProductForm } from './components/ProductForm'
import { ProductList } from './components/ProductList'
import { useStore } from './hooks/useStore'
import type { Product, Screen } from './types'

export default function App() {
  const store = useStore()
  const [screen, setScreen] = useState<Screen>('produtos')
  const [editing, setEditing] = useState<Product | null>(null)

  function openCreate() {
    setEditing(null)
    setScreen('form')
  }

  function openEdit(product: Product) {
    setEditing(product)
    setScreen('form')
  }

  function handleSave(data: {
    id?: string
    name: string
    price: number
    photo: string
    category: Product['category']
  }) {
    store.upsertProduct(data)
    setScreen('produtos')
    setEditing(null)
  }

  return (
    <div className="app-shell">
      <main className="app-main">
        {screen === 'produtos' && (
          <ProductList
            products={store.products}
            onAdd={openCreate}
            onEdit={openEdit}
            onDelete={store.deleteProduct}
          />
        )}

        {screen === 'form' && (
          <ProductForm
            product={editing}
            onSave={handleSave}
            onCancel={() => {
              setEditing(null)
              setScreen('produtos')
            }}
          />
        )}

        {screen === 'cardapio' && (
          <MenuBuilder
            products={store.products}
            menuIds={store.menuIds}
            weekLabel={store.weekLabel}
            onToggle={store.toggleMenu}
            onWeekLabelChange={store.setWeekLabel}
          />
        )}

        {screen === 'enviar' && (
          <PreviewShare weekLabel={store.weekLabel} products={store.menuProducts} />
        )}
      </main>

      {screen !== 'form' && (
        <BottomNav
          active={screen}
          onNavigate={(next) => {
            setEditing(null)
            setScreen(next)
          }}
        />
      )}
    </div>
  )
}
