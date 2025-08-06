import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Gift, Truck, Star } from 'lucide-react';

const ClubTabua = () => {
  console.log('[ClubTabua]', 'Renderizando página do Clube Tábua');

  return (
    <div className="space-y-8">
      {/* Banner de apresentação */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">🧀 Clube Tábua Premium</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Receba mensalmente uma seleção especial dos melhores queijos e doces mineiros 
          diretamente na sua casa, com descontos exclusivos e produtos únicos.
        </p>
      </div>

      {/* Como Funciona */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-center mb-6">Como Funciona</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">1. Escolha seu Plano</h4>
            <p className="text-muted-foreground text-sm">
              Selecione entre plano semestral ou anual com valores especiais
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">2. Curadoria Especial</h4>
            <p className="text-muted-foreground text-sm">
              Nossa equipe seleciona os melhores produtos artesanais para você
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">3. Receba em Casa</h4>
            <p className="text-muted-foreground text-sm">
              Produtos chegam fresquinhos na sua porta todos os meses
            </p>
          </div>
        </div>
      </div>

      {/* Planos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plano Semestral */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-4">
            <h3 className="text-xl font-bold">Plano Semestral</h3>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">R$ 89,90</p>
              <p className="text-muted-foreground text-sm">por mês (6 meses)</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">3-4 produtos premium por mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Frete grátis para todo Brasil</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">10% de desconto na loja</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Acesso a produtos exclusivos</span>
              </li>
            </ul>
            
            <Button className="w-full bg-primary hover:bg-primary/90">
              Assine Aqui
            </Button>
          </CardContent>
        </Card>

        {/* Plano Anual */}
        <Card className="border-2 border-warning relative overflow-hidden hover:shadow-lg transition-shadow">
          <Badge className="absolute top-4 right-4 bg-warning text-warning-foreground">
            MAIS POPULAR
          </Badge>
          
          <CardHeader className="text-center pb-4">
            <h3 className="text-xl font-bold">Plano Anual</h3>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">R$ 69,90</p>
              <p className="text-muted-foreground text-sm">por mês (12 meses)</p>
              <div className="bg-success/10 text-success text-xs px-2 py-1 rounded-full inline-block">
                Economize R$ 240,00
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">4-5 produtos premium por mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Frete grátis para todo Brasil</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">15% de desconto na loja</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Produtos exclusivos e limitados</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Brinde especial no primeiro mês</span>
              </li>
            </ul>
            
            <Button variant="premium" className="w-full">
              Assine Aqui
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-center mb-6">Perguntas Frequentes</h3>
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="border-b border-border pb-4">
            <h4 className="font-semibold mb-2">Posso cancelar minha assinatura a qualquer momento?</h4>
            <p className="text-muted-foreground text-sm">
              Sim! Você pode cancelar sua assinatura a qualquer momento através do seu painel de cliente 
              ou entrando em contato conosco. Não há multa ou taxa de cancelamento.
            </p>
          </div>
          
          <div className="pb-4">
            <h4 className="font-semibold mb-2">Posso alterar meu endereço de entrega?</h4>
            <p className="text-muted-foreground text-sm">
              Claro! Você pode alterar seu endereço de entrega até 5 dias antes da próxima remessa 
              através do seu painel de cliente ou nos enviando um WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubTabua;