import { useState } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border">
      {/* Barra superior com aviso */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          🧀 Queijos e Doces Artesanais de Minas Gerais 🍯
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Menu hamburger (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo centralizada */}
          <div className="flex-1 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              DELÍCIAS MINEIRAS
            </h1>
            <p className="text-sm text-muted-foreground font-medium">PREMIUM</p>
          </div>

          {/* Carrinho */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-primary font-medium py-2">Início</a>
              <a href="#" className="text-muted-foreground py-2">Avaliações</a>
              <a href="#" className="text-muted-foreground py-2">Contato</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;