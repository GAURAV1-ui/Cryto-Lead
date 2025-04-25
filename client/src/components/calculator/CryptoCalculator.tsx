"use client";

import { useEffect, useState } from "react";
import { useCryptoData } from "@/utils/api";
import { Crypto } from "@/types";

const currencyOptions = ["usd", "eur", "gbp", "jpy"];

const CryptoCalculator = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCrypto, setFromCrypto] = useState<string>("bitcoin");
  const [toCurrency, setToCurrency] = useState<string>("usd");
  const [result, setResult] = useState<number>(0);

  const { data: cryptoData, isLoading } = useCryptoData(100);

  useEffect(() => {
    if (cryptoData) {
      const fromCryptoData = cryptoData.find(
        (crypto: Crypto) => crypto.id === fromCrypto
      );
      if (fromCryptoData) {
        const calculatedResult =
          parseFloat(amount || "0") * fromCryptoData.current_price;
        setResult(calculatedResult);
      }
    }
  }, [amount, fromCrypto, cryptoData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-bold mb-4 text-white">Crypto Calculator</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm bg-[#3A3A3A] text-white focus:outline-none "
            min="0"
            step="1"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            From
          </label>
          <select
            value={fromCrypto}
            onChange={(e) => setFromCrypto(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm bg-[#3A3A3A] text-white"
          >
            {cryptoData?.map((crypto: Crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            To
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm bg-[#3A3A3A] text-white"
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 p-3 bg-[#3A3A3A] rounded-md text-white">
          <h3 className="text-sm font-semibold mb-1 text-white">Result</h3>
          <p className="text-lg font-bold">
            {result.toLocaleString(undefined, {
              style: "currency",
              currency: toCurrency.toUpperCase(),
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;

