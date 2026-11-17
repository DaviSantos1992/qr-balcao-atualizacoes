import { useCallback, useEffect, useState } from 'react'
import {
  createId,
  loadMenuIds,
  loadProducts,
  loadWeekLabel,
  saveMenuIds,
  saveProducts,
  saveWeekLabel,
} from '../storage'
import type { Category, Product } from '../types'

export function useStore() {
  const [products, setProducts] = useState<Product[]>(() => loadProducts())
  const [menuIds, setMenuIds] = useState<string[]>(() => loadMenuIds())
  const [weekLabel, setWeekLabelState] = useState(() => loadWeekLabel())

  useEffect(() => {
    saveProducts(products)
  }, [products])

  useEffect(() => {
    saveMenuIds(menuIds)
  }, [menuIds])

  useEffect(() => {
    saveWeekLabel(weekLabel)
  }, [weekLabel])

  const upsertProduct = useCallback(
    (input: {
      id?: string
      name: string
      price: number
      photo: string
      category: Category
    }) => {
      setProducts((prev) => {
        if (input.id) {
          return prev.map((p) =>
            p.id === input.id
              ? {
                  ...p,
                  name: input.name,
                  price: input.price,
                  photo: input.photo,
                  category: input.category,
                }
              : p,
          )
        }
        const next: Product = {
          id: createId(),
          name: input.name,
          price: input.price,
          photo: input.photo,
          category: input.category,
        }
        return [next, ...prev]
      })
    },
    [],
  )

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setMenuIds((prev) => prev.filter((mid) => mid !== id))
  }, [])

  const toggleMenu = useCallback((id: string) => {
    setMenuIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const setWeekLabel = useCallback((label: string) => {
    setWeekLabelState(label)
  }, [])

  const menuProducts = products.filter((p) => menuIds.includes(p.id))

  return {
    products,
    menuIds,
    menuProducts,
    weekLabel,
    upsertProduct,
    deleteProduct,
    toggleMenu,
    setWeekLabel,
  }
}
