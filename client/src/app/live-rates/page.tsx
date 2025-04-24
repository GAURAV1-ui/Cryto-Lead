'use client';

import { useState } from 'react';
import CryptoTable from '@/components/crypto/CryptoTable';
import TopCryptos from '@/components/crypto/TopCryptos';
import PriceChart from '@/components/crypto/PriceChart';
import { useCryptoData } from '@/utils/api';

export default function LiveRates() {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const { data: cryptos, isLoading, error } = useCryptoData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin h-12 w-12 border-4 border-purple-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-red-500 p-6 bg-gray-900 rounded-lg">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-10">

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <PriceChart selectedCrypto={selectedCrypto} />
          <TopCryptos cryptos={cryptos || []} selected={selectedCrypto} onSelect={setSelectedCrypto} />
        </div>

        <CryptoTable cryptos={cryptos || []} selected={selectedCrypto} onSelect={setSelectedCrypto} />
      </div>
    </div>
  );
}
