import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

type Address = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  complement?: string;
};

type Customer = {
  name: string;
  email: string;
  phone: string;
  document: string; // CPF
};

export default function Checkout() {
  const { state, subtotal, clear } = useCart();
  const [customer, setCustomer] = useState<Customer>({ name: '', email: '', phone: '', document: '' });
  const [address, setAddress] = useState<Address>({ cep: '', street: '', neighborhood: '', city: '', state: '', number: '', complement: '' });
  const [loadingPix, setLoadingPix] = useState(false);
  const [pixResponse, setPixResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const itemsPayload = useMemo(() => {
    return state.items.map((i) => ({
      title: `${i.name} (${i.weight})`,
      unitPrice: Math.round(i.unitPrice * 100),
      quantity: i.quantity,
      tangible: true,
    }));
  }, [state.items]);

  useEffect(() => {
    const fetchCep = async () => {
      const onlyDigits = address.cep.replace(/\D/g, '');
      if (onlyDigits.length !== 8) return;
      try {
        const res = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
        const data = await res.json();
        if (data.erro) return;
        setAddress((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      } catch (e) {
        // ignore
      }
    };
    fetchCep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address.cep]);

  const handleCreatePix = async () => {
    setError(null);
    setLoadingPix(true);
    try {
      const payload = {
        amount: Math.round(subtotal * 100),
        items: itemsPayload,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone.replace(/\D/g, ''),
          document: { number: customer.document.replace(/\D/g, ''), type: 'cpf' },
          address: {
            street: address.street,
            number: address.number,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            zipCode: address.cep.replace(/\D/g, ''),
          }
        },
      };

      const res = await fetch('/api/create-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Erro ao criar PIX');
      }

      const data = await res.json();
      setPixResponse(data);
      clear();
    } catch (e: any) {
      setError(e.message || 'Erro inesperado');
    } finally {
      setLoadingPix(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Dados do Cliente</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Seu nome completo" />
                </div>
                <div>
                  <Label>CPF</Label>
                  <Input value={customer.document} onChange={(e) => setCustomer({ ...customer, document: e.target.value })} placeholder="000.000.000-00" />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="voce@exemplo.com" />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="(00) 90000-0000" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Endereço</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <Label>CEP</Label>
                  <Input value={address.cep} onChange={(e) => setAddress({ ...address, cep: e.target.value })} placeholder="00000-000" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Rua</Label>
                  <Input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="Rua" />
                </div>
                <div>
                  <Label>Número</Label>
                  <Input value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} placeholder="123" />
                </div>
                <div>
                  <Label>Bairro</Label>
                  <Input value={address.neighborhood} onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })} placeholder="Bairro" />
                </div>
                <div>
                  <Label>Cidade</Label>
                  <Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="Cidade" />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="UF" />
                </div>
                <div className="sm:col-span-3">
                  <Label>Complemento</Label>
                  <Input value={address.complement} onChange={(e) => setAddress({ ...address, complement: e.target.value || '' })} placeholder="Apartamento, bloco, referência..." />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">Resumo</h2>
              <div className="space-y-2 text-sm">
                {state.items.map((i) => (
                  <div key={`${i.id}-${i.weight}`} className="flex justify-between">
                    <div>
                      {i.name} ({i.weight}) x {i.quantity}
                    </div>
                    <div>R$ {(i.unitPrice * i.quantity).toFixed(2).replace('.', ',')}</div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold">
                <div>Total</div>
                <div>R$ {subtotal.toFixed(2).replace('.', ',')}</div>
              </div>
              <Button disabled={loadingPix || state.items.length === 0} onClick={handleCreatePix} className="w-full">
                {loadingPix ? 'Gerando PIX...' : 'Pagar com PIX'}
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </CardContent>
          </Card>

          {pixResponse?.pix?.qrcode && (
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-medium">Escaneie o QR Code PIX</h3>
                <p className="text-sm text-muted-foreground break-all">{pixResponse.pix.qrcode}</p>
                {/* Caso a API forneça uma URL de imagem/base64 no futuro, podemos exibir um QR visual aqui */}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}