import { useState } from 'react';

export function usePix() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  async function createPix(payload: any) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch('/api/create-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Erro ao criar PIX');
      }
      const json = await res.json();
      setData(json);
      return json;
    } catch (e: any) {
      setError(e.message || 'Erro inesperado');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { createPix, loading, error, data };
}