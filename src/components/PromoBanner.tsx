import { Badge } from '@/components/ui/badge';
import { Percent } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-warning/20 via-warning/10 to-warning/20 border border-warning/20 rounded-2xl p-6 mb-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Percent className="w-5 h-5 text-warning" />
          <Badge className="bg-warning text-warning-foreground font-bold">
            PROMOÇÃO ESPECIAL
          </Badge>
          <Percent className="w-5 h-5 text-warning" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Até 50% OFF em Produtos Selecionados
        </h2>
        <p className="text-muted-foreground">
          Aproveite nossa seleção especial de queijos e doces com descontos imperdíveis!
        </p>
      </div>
    </div>
  );
};

export default PromoBanner;