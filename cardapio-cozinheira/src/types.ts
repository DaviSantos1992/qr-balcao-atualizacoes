export type Category = 'Comidas' | 'Bebidas' | 'Doces' | 'Outros'

export interface Product {
  id: string
  name: string
  price: number
  photo: string
  category: Category
}

export type Screen = 'produtos' | 'cardapio' | 'enviar' | 'form'

export const CATEGORIES: Category[] = ['Comidas', 'Bebidas', 'Doces', 'Outros']
