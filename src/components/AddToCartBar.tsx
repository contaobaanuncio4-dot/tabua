import { useMemo } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddToCartBar() {
  const { subtotal, originalSubtotal, state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const hasItems = state.items.length > 0;
  const isCheckout = location.pathname === '/checkout';

  const fromPrice = useMemo(() => originalSubtotal, [originalSubtotal]);
  const toPrice = useMemo(() => subtotal, [subtotal]);

  if (!hasItems || isCheckout) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-center">
            {fromPrice > toPrice && (
              <p className="text-sm text-gray-500 line-through">De R$ {fromPrice.toFixed(2).replace('.', ',')}</p>
            )}
            <p className="text-2xl font-bold text-[#9B6647]">Por R$ {toPrice.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-[#9B6647] hover:bg-[#825539] text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          COMPRAR AGORA
        </button>
      </div>
    </div>
  );
}