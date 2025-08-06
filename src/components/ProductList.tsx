import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  image: string;
  promotionalPrice: number;
  originalPrice: number;
  category: 'queijos' | 'doces';
  badge?: string;
}

interface ProductListProps {
  category: 'queijos' | 'doces';
}

// Dados dos produtos conforme fornecidos
const PRODUCTS: Product[] = [
  // Queijos
  {
    id: 'q1',
    name: 'Queijo MinasBri',
    image: 'https://i.imgur.com/90GxB2f.jpeg',
    promotionalPrice: 33.90,
    originalPrice: 64.90,
    category: 'queijos',
    badge: 'Mais Vendido'
  },
  {
    id: 'q2',
    name: 'Kit 4 Queijos de Alagoa-MG (parmesão) 475g',
    image: 'https://i.imgur.com/HUMvcjf.png',
    promotionalPrice: 53.90,
    originalPrice: 100.90,
    category: 'queijos'
  },
  {
    id: 'q3',
    name: 'Queijo Canastra Meia Cura',
    image: 'https://i.imgur.com/3FW0QQo.png',
    promotionalPrice: 69.00,
    originalPrice: 94.90,
    category: 'queijos'
  },
  {
    id: 'q4',
    name: 'Queijo Gorgonzola Duplo Creme - Meia Peça',
    image: 'https://i.imgur.com/GKEwp5Z.png',
    promotionalPrice: 49.90,
    originalPrice: 89.90,
    category: 'queijos'
  },
  {
    id: 'q5',
    name: 'Queijo Tipo Camembert',
    image: 'https://i.imgur.com/lUEzXTg.png',
    promotionalPrice: 34.90,
    originalPrice: 61.90,
    category: 'queijos'
  },
  {
    id: 'q6',
    name: 'Queijo Figueira',
    image: 'https://i.imgur.com/50TuZcl.png',
    promotionalPrice: 39.90,
    originalPrice: 72.90,
    category: 'queijos'
  },
  {
    id: 'q7',
    name: 'Parmesão Meia Cura',
    image: 'https://i.imgur.com/lJzrIPt.png',
    promotionalPrice: 44.90,
    originalPrice: 74.90,
    category: 'queijos'
  },
  {
    id: 'q8',
    name: 'Queijo do Jordão',
    image: 'https://i.imgur.com/IIOVRsg.png',
    promotionalPrice: 36.90,
    originalPrice: 80.90,
    category: 'queijos'
  },
  {
    id: 'q9',
    name: 'Queijo Lua Cheia',
    image: 'https://i.imgur.com/Hiizu7l.png',
    promotionalPrice: 45.90,
    originalPrice: 89.90,
    category: 'queijos'
  },
  {
    id: 'q10',
    name: 'Canastra Santiago',
    image: 'https://i.imgur.com/WTEH3EG.png',
    promotionalPrice: 24.90,
    originalPrice: 45.00,
    category: 'queijos'
  },
  {
    id: 'q11',
    name: 'Queijo Chabichou',
    image: 'https://i.imgur.com/InCGS2i.png',
    promotionalPrice: 49.90,
    originalPrice: 84.90,
    category: 'queijos'
  },
  {
    id: 'q12',
    name: 'Queijo Benzinho',
    image: 'https://i.imgur.com/GhkwDOz.png',
    promotionalPrice: 48.90,
    originalPrice: 76.90,
    category: 'queijos'
  },
  {
    id: 'q13',
    name: 'Queijo Gorgonzola Duplo Creme - Peça inteira',
    image: 'https://i.imgur.com/yrLmjZF.png',
    promotionalPrice: 78.90,
    originalPrice: 133.90,
    category: 'queijos'
  },
  {
    id: 'q14',
    name: 'Queijo da Santa - 650g',
    image: 'https://i.imgur.com/AP6tuzN.png',
    promotionalPrice: 68.90,
    originalPrice: 134.90,
    category: 'queijos'
  },
  {
    id: 'q15',
    name: 'Queijo Bucaneve - 200g',
    image: 'https://i.imgur.com/N1LqA2N.png',
    promotionalPrice: 42.90,
    originalPrice: 80.90,
    category: 'queijos'
  },
  {
    id: 'q16',
    name: 'Queijo Morro Azul - 120g',
    image: 'https://i.imgur.com/DZEoLC7.png',
    promotionalPrice: 36.90,
    originalPrice: 60.90,
    category: 'queijos'
  },
  {
    id: 'q17',
    name: 'Queijo Tipo Comté - 320g',
    image: 'https://i.imgur.com/R2SqLyb.png',
    promotionalPrice: 36.90,
    originalPrice: 68.90,
    category: 'queijos'
  },
  {
    id: 'q18',
    name: 'Queijo Estação Mantiqueira de minas - 500g',
    image: 'https://i.imgur.com/2pn5qcP.png',
    promotionalPrice: 58.90,
    originalPrice: 100.90,
    category: 'queijos'
  },
  {
    id: 'q19',
    name: 'Queijo Tipo Gruyere - 350g',
    image: 'https://i.imgur.com/LS1tjBN.png',
    promotionalPrice: 42.90,
    originalPrice: 77.90,
    category: 'queijos'
  },
  // Doces
  {
    id: 'd1',
    name: 'Doce de Pingo de Leite com Castanha de Caju',
    image: 'https://i.imgur.com/jcNfoUS.png',
    promotionalPrice: 34.90,
    originalPrice: 60.90,
    category: 'doces',
    badge: 'Mais Vendido'
  },
  {
    id: 'd2',
    name: 'Doce de Cocada com Abacaxi',
    image: 'https://i.imgur.com/bf7uIkJ.png',
    promotionalPrice: 33.90,
    originalPrice: 46.00,
    category: 'doces'
  },
  {
    id: 'd3',
    name: 'Doce Prestígio mineiro',
    image: 'https://i.imgur.com/IdAa9ng.png',
    promotionalPrice: 24.90,
    originalPrice: 41.90,
    category: 'doces'
  },
  {
    id: 'd4',
    name: 'Doce de Cocada com Maracujá',
    image: 'https://i.imgur.com/p6wwtEt.png',
    promotionalPrice: 32.90,
    originalPrice: 43.90,
    category: 'doces'
  },
  {
    id: 'd5',
    name: 'Doce casadinho',
    image: 'https://i.imgur.com/WoKuC7T.png',
    promotionalPrice: 27.90,
    originalPrice: 45.00,
    category: 'doces'
  },
  {
    id: 'd6',
    name: 'Doce de leite',
    image: 'https://i.imgur.com/7l56V5m.png',
    promotionalPrice: 22.90,
    originalPrice: 40.00,
    category: 'doces'
  },
  {
    id: 'd7',
    name: 'Doce de leite com café',
    image: 'https://i.imgur.com/dEVNMOd.png',
    promotionalPrice: 26.90,
    originalPrice: 45.00,
    category: 'doces'
  },
  {
    id: 'd8',
    name: 'Doce de Pingo de Leite com Amendoim',
    image: 'https://i.imgur.com/o74KsOo.png',
    promotionalPrice: 58.90,
    originalPrice: 80.90,
    category: 'doces'
  },
  {
    id: 'd9',
    name: 'Doce de Cocada com Ameixa',
    image: 'https://i.imgur.com/Rt7nWy8.png',
    promotionalPrice: 32.90,
    originalPrice: 43.90,
    category: 'doces'
  },
  {
    id: 'd10',
    name: 'Doce de Abóbora com Coco',
    image: 'https://i.imgur.com/glyYwmb.png',
    promotionalPrice: 27.90,
    originalPrice: 44.00,
    category: 'doces'
  },
  {
    id: 'd11',
    name: 'Doce Quebra-Queixo',
    image: 'https://i.imgur.com/ded8MyO.png',
    promotionalPrice: 36.90,
    originalPrice: 60.90,
    category: 'doces'
  },
  {
    id: 'd12',
    name: 'Doce de leite Dom',
    image: 'https://i.imgur.com/lHpdysA.png',
    promotionalPrice: 44.90,
    originalPrice: 80.90,
    category: 'doces'
  },
  {
    id: 'd13',
    name: 'Goiabada cremosa Tia Carla',
    image: 'https://i.imgur.com/uJPxQ3F.png',
    promotionalPrice: 32.90,
    originalPrice: 60.90,
    category: 'doces'
  },
  {
    id: 'd14',
    name: 'Doce de banana zero açúcar',
    image: 'https://i.imgur.com/dOM2hia.png',
    promotionalPrice: 24.90,
    originalPrice: 40.00,
    category: 'doces'
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