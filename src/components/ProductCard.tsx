import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductOption {
  weight: '500g' | '1kg';
  promotionalPrice: number;
  originalPrice: number;
  checkoutUrl: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  category: 'queijos' | 'doces';
  badge?: string;
  options: ProductOption[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption>(product.options[0]);
  
  console.log('[ProductCard]', 'Renderizando produto:', product.name);
  
  const discountPercent = Math.round(
    ((selectedOption.originalPrice - selectedOption.promotionalPrice) / selectedOption.originalPrice) * 100
  );

  const handleCheckout = () => {
    window.open(selectedOption.checkoutUrl, '_blank');
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-md">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge className="bg-promotion text-white font-bold px-2 py-1">
            -{discountPercent}%
          </Badge>
          {product.badge && (
            <Badge className="bg-primary text-primary-foreground px-2 py-1">
              {product.badge}
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Weight selector */}
        <div className="mb-3">
          <div className="flex gap-2">
            {product.options.map((option) => (
              <button
                key={option.weight}
                onClick={() => setSelectedOption(option)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  selectedOption.weight === option.weight
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary'
                }`}
              >
                {option.weight}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-warning">
              R$ {selectedOption.promotionalPrice.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              R$ {selectedOption.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <Button 
            onClick={handleCheckout}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            size="sm"
          >
            Comprar Agora
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;