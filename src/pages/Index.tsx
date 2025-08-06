import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import PromoBanner from '@/components/PromoBanner';
import ProductList from '@/components/ProductList';
import ClubTabua from '@/components/ClubTabua';

const Index = () => {
  const [activeTab, setActiveTab] = useState('doces');
  
  console.log('[Index]', 'Renderizando página principal, tab ativa:', activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <PromoBanner />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted p-1 rounded-xl">
            <TabsTrigger 
              value="doces" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg font-medium transition-all"
            >
              Doces
            </TabsTrigger>
            <TabsTrigger 
              value="queijos"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg font-medium transition-all"
            >
              Queijos
            </TabsTrigger>
            <TabsTrigger 
              value="clube-tabua"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg font-medium transition-all"
            >
              Clube Tábua
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doces" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Doces Artesanais</h2>
              <p className="text-muted-foreground">
                Doces tradicionais mineiros feitos com ingredientes selecionados e muito carinho
              </p>
            </div>
            <ProductList category="doces" />
          </TabsContent>

          <TabsContent value="queijos" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Queijos Artesanais</h2>
              <p className="text-muted-foreground">
                Queijos especiais das melhores fazendas de Minas Gerais, com sabor único e autêntico
              </p>
            </div>
            <ProductList category="queijos" />
          </TabsContent>

          <TabsContent value="clube-tabua" className="mt-0">
            <ClubTabua />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer simples */}
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-bold mb-4">DELÍCIAS MINEIRAS - PREMIUM</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90">
            <a href="/reviews" className="hover:underline">Avaliações</a>
            <a href="#" className="hover:underline">Contato</a>
            <a href="#" className="hover:underline">Sobre</a>
            <a href="#" className="hover:underline">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
