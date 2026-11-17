import type { JSX } from 'react'
import type { Screen } from '../types'

interface Props {
  active: Screen
  onNavigate: (screen: 'produtos' | 'cardapio' | 'enviar') => void
}

function IconProducts() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ITEMS: {
  id: 'produtos' | 'cardapio' | 'enviar'
  label: string
  Icon: () => JSX.Element
}[] = [
  { id: 'produtos', label: 'Produtos', Icon: IconProducts },
  { id: 'cardapio', label: 'Cardápio', Icon: IconMenu },
  { id: 'enviar', label: 'Enviar', Icon: IconSend },
]

export function BottomNav({ active, onNavigate }: Props) {
  const current = active === 'form' ? 'produtos' : active

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {ITEMS.map(({ id, label, Icon }) => {
        const isActive = current === id
        return (
          <button
            key={id}
            type="button"
            className={`nav-item${isActive ? ' is-active' : ''}`}
            onClick={() => onNavigate(id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
