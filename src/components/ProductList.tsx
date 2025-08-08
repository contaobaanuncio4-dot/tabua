import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface ProductOption {
  weight: '500g' | '1kg';
  promotionalPrice: number;
  originalPrice: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  category: 'queijos' | 'doces';
  badge?: string;
  options: ProductOption[];
}

interface ProductListProps {
  category: 'queijos' | 'doces';
}

// Dados dos produtos com opções de peso
const PRODUCTS: Product[] = [
  // Queijos
  {
    id: 'q1',
    name: 'Queijo MinasBri',
    image: 'https://i.imgur.com/90GxB2f.jpeg',
    category: 'queijos',
    badge: 'Mais Vendido',
    options: [
      {
        weight: '500g',
        promotionalPrice: 33.90,
        originalPrice: 64.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 65.90,
        originalPrice: 120.90,
      }
    ]
  },
  {
    id: 'q2',
    name: 'Kit 4 Queijos de Alagoa-MG (parmesão)',
    image: 'https://i.imgur.com/HUMvcjf.png',
    category: 'queijos',
    options: [
      {
        weight: '500g',
        promotionalPrice: 53.90,
        originalPrice: 100.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 105.90,
        originalPrice: 195.90,
      }
    ]
  },
  {
    id: 'q3',
    name: 'Queijo Canastra Meia Cura',
    image: 'https://i.imgur.com/3FW0QQo.png',
    category: 'queijos',
    options: [
      {
        weight: '500g',
        promotionalPrice: 69.00,
        originalPrice: 94.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 135.00,
        originalPrice: 185.90,
      }
    ]
  },
  {
    id: 'q4',
    name: 'Queijo Gorgonzola Duplo Creme',
    image: 'https://i.imgur.com/GKEwp5Z.png',
    category: 'queijos',
    options: [
      {
        weight: '500g',
        promotionalPrice: 49.90,
        originalPrice: 89.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 95.90,
        originalPrice: 175.90,
      }
    ]
  },
  {
    id: 'q5',
    name: 'Queijo Tipo Camembert',
    image: 'https://i.imgur.com/lUEzXTg.png',
    category: 'queijos',
    options: [
      {
        weight: '500g',
        promotionalPrice: 34.90,
        originalPrice: 61.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 65.90,
        originalPrice: 120.90,
      }
    ]
  },
  {
    id: 'q6',
    name: 'Queijo Figueira',
    image: 'https://i.imgur.com/50TuZcl.png',
    category: 'queijos',
    options: [
      {
        weight: '500g',
        promotionalPrice: 39.90,
        originalPrice: 72.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 75.90,
        originalPrice: 140.90,
      }
    ]
  },
  // Doces
  {
    id: 'd1',
    name: 'Doce de Pingo de Leite com Castanha de Caju',
    image: 'https://i.imgur.com/jcNfoUS.png',
    category: 'doces',
    badge: 'Mais Vendido',
    options: [
      {
        weight: '500g',
        promotionalPrice: 34.90,
        originalPrice: 60.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 65.90,
        originalPrice: 115.90,
      }
    ]
  },
  {
    id: 'd2',
    name: 'Doce de Cocada com Abacaxi',
    image: 'https://i.imgur.com/bf7uIkJ.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 33.90,
        originalPrice: 46.00,
      },
      {
        weight: '1kg',
        promotionalPrice: 62.90,
        originalPrice: 85.00,
      }
    ]
  },
  {
    id: 'd3',
    name: 'Doce Prestígio mineiro',
    image: 'https://i.imgur.com/IdAa9ng.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 24.90,
        originalPrice: 41.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 45.90,
        originalPrice: 78.90,
      }
    ]
  },
  {
    id: 'd4',
    name: 'Doce de Cocada com Maracujá',
    image: 'https://i.imgur.com/p6wwtEt.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 32.90,
        originalPrice: 43.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 59.90,
        originalPrice: 80.90,
      }
    ]
  },
  {
    id: 'd5',
    name: 'Doce casadinho',
    image: 'https://i.imgur.com/WoKuC7T.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 27.90,
        originalPrice: 45.00,
      },
      {
        weight: '1kg',
        promotionalPrice: 52.90,
        originalPrice: 85.00,
      }
    ]
  },
  {
    id: 'd6',
    name: 'Doce de leite',
    image: 'https://i.imgur.com/7l56V5m.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 22.90,
        originalPrice: 40.00,
      },
      {
        weight: '1kg',
        promotionalPrice: 42.90,
        originalPrice: 75.00,
      }
    ]
  },
  {
    id: 'd7',
    name: 'Doce de leite com café',
    image: 'https://i.imgur.com/dEVNMOd.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 26.90,
        originalPrice: 45.00,
      },
      {
        weight: '1kg',
        promotionalPrice: 49.90,
        originalPrice: 85.00,
      }
    ]
  },
  {
    id: 'd8',
    name: 'Doce de Pingo de Leite com Amendoim',
    image: 'https://i.imgur.com/o74KsOo.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 58.90,
        originalPrice: 80.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 110.90,
        originalPrice: 155.90,
      }
    ]
  },
  {
    id: 'd9',
    name: 'Doce de Cocada com Ameixa',
    image: 'https://i.imgur.com/Rt7nWy8.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 32.90,
        originalPrice: 43.90,
      },
      {
        weight: '1kg',
        promotionalPrice: 59.90,
        originalPrice: 80.90,
      }
    ]
  },
  {
    id: 'd10',
    name: 'Doce de Abóbora com Coco',
    image: 'https://i.imgur.com/glyYwmb.png',
    category: 'doces',
    options: [
      {
        weight: '500g',
        promotionalPrice: 27.90,
        originalPrice: 44.00,
      },
      {
        weight: '1kg',
        promotionalPrice: 52.90,
        originalPrice: 82.00,
      }
    ]
  }
];

const ProductList = ({ category }: ProductListProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('[ProductList]', 'Carregando produtos para categoria:', category);

  useEffect(() => {
    // Simular carregamento
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLoading(false);
      } catch (err) {
        console.error('[ProductList]', 'Erro ao carregar produtos:', err);
        setError('Erro ao carregar produtos. Tente novamente.');
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const filteredProducts = PRODUCTS.filter(product => product.category === category);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-muted animate-pulse rounded-lg h-80" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;