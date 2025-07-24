"use client"

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  variantId?: number
  color?: string
  size?: string
}

interface CartState {
  items: CartItem[]
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number; variantId?: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; variantId?: number; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: []
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && 
        item.variantId === action.payload.variantId
      )
      
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += action.payload.quantity
        return { ...state, items: updatedItems }
      }
      
      return { ...state, items: [...state.items, action.payload] }
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(
        item => !(item.id === action.payload.id && item.variantId === action.payload.variantId)
      )
      return { ...state, items: filteredItems }
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id && item.variantId === action.payload.variantId) {
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })
      return { ...state, items: updatedItems }
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [] }
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: number, variantId?: number) => void
  updateQuantity: (id: number, variantId: number | undefined, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  // Load initial state from localStorage
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      return saved ? { ...initialState, items: JSON.parse(saved) } : initialState
    }
    return initialState
  })

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number, variantId?: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, variantId } })
  }

  const updateQuantity = (id: number, variantId: number | undefined, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, variantId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotalItems = () => {
    return state.items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
  }

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state.items))
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('cartUpdated'))
    }
  }, [state.items])

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 