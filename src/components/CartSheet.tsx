import { useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartSheet({ children }: { children: React.ReactNode }) {
  const { state, updateQuantity, removeItem, subtotal } = useCart();

  const totalItems = useMemo(() => state.items.reduce((n, i) => n + i.quantity, 0), [state.items]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrinho ({totalItems})</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {state.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Seu carrinho está vazio.</p>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.weight}`} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name} ({item.weight})</div>
                    <div className="text-sm text-muted-foreground">R$ {item.unitPrice.toFixed(2).replace('.', ',')}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.weight, Math.max(1, item.quantity - 1))}><Minus className="w-4 h-4" /></Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}><Plus className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => removeItem(item.id, item.weight)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="font-medium">R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}</div>
                </div>
              ))}
              <div className="border-t pt-4 flex items-center justify-between">
                <div className="text-muted-foreground">Subtotal</div>
                <div className="text-lg font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</div>
              </div>
              <Button asChild className="w-full">
                <Link to="/checkout">Ir para o Checkout</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}