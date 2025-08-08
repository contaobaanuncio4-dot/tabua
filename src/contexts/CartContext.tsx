import { createContext, useContext, useMemo, useReducer, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  image: string;
  weight: '500g' | '1kg';
  unitPrice: number; // promotional price
  originalUnitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string; weight: CartItem['weight'] }
  | { type: 'UPDATE_QUANTITY'; id: string; weight: CartItem['weight']; quantity: number }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, weight: CartItem['weight']) => void;
  updateQuantity: (id: string, weight: CartItem['weight'], quantity: number) => void;
  clear: () => void;
  subtotal: number;
  originalSubtotal: number;
}>({
  state: { items: [] },
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clear: () => {},
  subtotal: 0,
  originalSubtotal: 0,
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (i) => i.id === action.item.id && i.weight === action.item.weight
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.item.quantity,
        };
        return { items: updated };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter((i) => !(i.id === action.id && i.weight === action.weight)),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        items: state.items.map((i) =>
          i.id === action.id && i.weight === action.weight ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [state.items]
  );

  const originalSubtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.originalUnitPrice * i.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      state,
      addItem: (item: CartItem) => dispatch({ type: 'ADD_ITEM', item }),
      removeItem: (id: string, weight: CartItem['weight']) => dispatch({ type: 'REMOVE_ITEM', id, weight }),
      updateQuantity: (id: string, weight: CartItem['weight'], quantity: number) =>
        dispatch({ type: 'UPDATE_QUANTITY', id, weight, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
      subtotal,
      originalSubtotal,
    }),
    [state, subtotal, originalSubtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}