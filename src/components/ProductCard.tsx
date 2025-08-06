import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  image: string;
  promotionalPrice: number;
  originalPrice: number;
  category: 'queijos' | 'doces';
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log('[ProductCard]', 'Renderizando produto:', product.name);
  
  const discountPercent = Math.round(
    ((product.originalPrice - product.promotionalPrice) / product.originalPrice) * 100
  );

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
        <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-warning">
              R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            size="sm"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;