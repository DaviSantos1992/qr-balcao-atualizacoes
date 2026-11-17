import { useRef, useState, type FormEvent } from 'react'
import type { Category, Product } from '../types'
import { CATEGORIES } from '../types'

interface Props {
  product: Product | null
  onSave: (data: {
    id?: string
    name: string
    price: number
    photo: string
    category: Category
  }) => void
  onCancel: () => void
}

const PLACEHOLDER =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#d5e0d8"/><text x="200" y="155" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#2f5d50">Foto</text></svg>`,
  )

export function ProductForm({ product, onSave, onCancel }: Props) {
  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product ? String(product.price).replace('.', ',') : '')
  const [photo, setPhoto] = useState(product?.photo ?? PLACEHOLDER)
  const [photoUrl, setPhotoUrl] = useState('')
  const [category, setCategory] = useState<Category>(product?.category ?? 'Comidas')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Escolha um arquivo de imagem.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result)
        setPhotoUrl('')
        setError('')
      }
    }
    reader.readAsDataURL(file)
  }

  function applyUrl() {
    const trimmed = photoUrl.trim()
    if (!trimmed) return
    setPhoto(trimmed)
    setError('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    const parsed = Number(price.replace(',', '.'))
    if (!trimmed) {
      setError('Informe o nome do produto.')
      return
    }
    if (!Number.isFinite(parsed) || parsed < 0) {
      setError('Informe um preço válido.')
      return
    }
    onSave({
      id: product?.id,
      name: trimmed,
      price: parsed,
      photo,
      category,
    })
  }

  return (
    <section className="screen form-screen">
      <header className="screen-header compact">
        <button type="button" className="text-btn" onClick={onCancel}>
          ← Voltar
        </button>
        <h1>{product ? 'Editar produto' : 'Novo produto'}</h1>
      </header>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="photo-field">
          <img src={photo} alt="" className="photo-preview" />
          <div className="photo-actions">
            <button type="button" className="btn secondary" onClick={() => fileRef.current?.click()}>
              Enviar foto
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <div className="url-row">
              <input
                type="url"
                placeholder="Ou cole a URL da imagem"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <button type="button" className="btn ghost" onClick={applyUrl} disabled={!photoUrl.trim()}>
                Usar
              </button>
            </div>
          </div>
        </div>

        <label className="field">
          <span>Nome</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Marmita caseira"
            autoFocus
            required
          />
        </label>

        <label className="field">
          <span>Preço (R$)</span>
          <input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0,00"
            required
          />
        </label>

        <fieldset className="field">
          <legend>Categoria</legend>
          <div className="chip-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip${category === cat ? ' is-selected' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </fieldset>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn primary">
            Salvar
          </button>
        </div>
      </form>
    </section>
  )
}
