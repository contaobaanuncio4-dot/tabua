import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
  verified: boolean;
}

// Avaliações fictícias de clientes
const REVIEWS: Review[] = [
  {
    id: '1',
    customerName: 'Maria Silva',
    rating: 5,
    comment: 'O queijo Canastra chegou fresquinho e com sabor incrível! Melhor queijo que já comprei online. Recomendo muito!',
    product: 'Queijo Canastra Meia Cura',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    customerName: 'João Santos',
    rating: 5,
    comment: 'Doce de leite maravilhoso! Lembrou exatamente o que minha vó fazia. Qualidade excepcional e entrega rápida.',
    product: 'Doce de leite Dom',
    date: '2024-01-12',
    verified: true
  },
  {
    id: '3',
    customerName: 'Ana Oliveira',
    rating: 4,
    comment: 'Kit de queijos muito bem embalado. Todos os queijos estavam perfeitos. Só achei o preço um pouco alto, mas vale a qualidade.',
    product: 'Kit 4 Queijos de Alagoa-MG',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '4',
    customerName: 'Pedro Costa',
    rating: 5,
    comment: 'Primeiro pedido no site e fiquei impressionado! O doce de pingo de leite com castanha é divino. Já virei cliente fiel.',
    product: 'Doce de Pingo de Leite com Castanha de Caju',
    date: '2024-01-08',
    verified: true
  },
  {
    id: '5',
    customerName: 'Carla Mendes',
    rating: 5,
    comment: 'Assinei o Clube Tábua e não me arrependo! Todo mês uma surpresa deliciosa. Os produtos são sempre frescos e saborosos.',
    product: 'Clube Tábua - Plano Anual',
    date: '2024-01-05',
    verified: true
  },
  {
    id: '6',
    customerName: 'Roberto Lima',
    rating: 4,
    comment: 'Queijo Gorgonzola excelente! Cremoso na medida certa. Única observação é que poderia vir com mais informações sobre a origem.',
    product: 'Queijo Gorgonzola Duplo Creme',
    date: '2024-01-03',
    verified: true
  },
  {
    id: '7',
    customerName: 'Fernanda Reis',
    rating: 5,
    comment: 'Doce casadinho delicioso! Textura perfeita e sabor autêntico. Chegou bem embalado e dentro do prazo.',
    product: 'Doce casadinho',
    date: '2024-01-01',
    verified: true
  },
  {
    id: '8',
    customerName: 'Carlos Ferreira',
    rating: 5,
    comment: 'Queijo MinasBri surpreendente! Nunca havia experimentado e agora virou meu favorito. Textura única e sabor marcante.',
    product: 'Queijo MinasBri',
    date: '2023-12-28',
    verified: true
  },
  {
    id: '9',
    customerName: 'Lucia Alves',
    rating: 4,
    comment: 'Goiabada cremosa muito boa! Lembra os doces da fazenda. Só gostaria que tivesse tamanhos maiores disponíveis.',
    product: 'Goiabada cremosa Tia Carla',
    date: '2023-12-25',
    verified: true
  },
  {
    id: '10',
    customerName: 'Marcos Souza',
    rating: 5,
    comment: 'Atendimento excelente e produtos de primeira qualidade. O queijo Camembert estava no ponto perfeito de maturação.',
    product: 'Queijo Tipo Camembert',
    date: '2023-12-22',
    verified: true
  }
];

const Reviews = () => {
  console.log('[Reviews]', 'Carregando página de avaliações');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-warning fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Avaliações dos Nossos Clientes
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes estão dizendo sobre nossos queijos e doces artesanais. 
            Todas as avaliações são de compras verificadas.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {renderStars(5)}
              </div>
              <p className="text-sm text-muted-foreground">Avaliação média</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Avaliações verificadas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-sm text-muted-foreground">Clientes satisfeitos</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de avaliações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{review.customerName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(review.date)}
                      {review.verified && (
                        <span className="ml-2 text-success text-xs">✓ Compra verificada</span>
                      )}
                    </p>
                  </div>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <p className="text-foreground mb-3 leading-relaxed">
                  "{review.comment}"
                </p>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Produto:</span> {review.product}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8 bg-primary/5 rounded-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Experimente Nossos Produtos
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Junte-se aos centenas de clientes satisfeitos e descubra o verdadeiro sabor de Minas Gerais.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Ver Produtos
          </a>
        </div>
      </div>
    </div>
  );
};

export default Reviews;