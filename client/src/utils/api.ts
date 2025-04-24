// lib/crypto.ts
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { Crypto,UserData } from '@/types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const API_URL = 'http://localhost:8000/api';
const queryClient = new QueryClient();

const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(await response.text());
    throw error;
  }
  return response.json();
};

const fetchCryptoData = async (limit = 10): Promise<Crypto[]> => {
  const url = `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}`;
  return fetcher<Crypto[]>(url, { next: { revalidate: 300 } });
};

const fetchPriceHistory = async (cryptoId: string, days = 7) => {
  const url = `${COINGECKO_API_BASE}/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`;
  return fetcher(url, { next: { revalidate: 300 } });
};

const fetchCryptoOptions = async () => {
  const data = await fetchCryptoData(5);
  return data.map(crypto => ({
    id: crypto.id,
    name: crypto.name,
    symbol: crypto.symbol.toUpperCase(),
  }));
};

const createUser = async (userData: UserData) => {
  return fetcher(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
};


const getAllUsers = async () => {
  return fetcher<UserData[]>(`${API_URL}/users`);
};

export const useCryptoData = (limit = 10) => {
  return useQuery({
    queryKey: ['cryptoData', limit],
    queryFn: () => fetchCryptoData(limit),
    staleTime: 300000,
    retry: 2,
  });
};

export const usePriceHistory = (cryptoId: string, days = 7) => {
  return useQuery({
    queryKey: ['priceHistory', cryptoId, days],
    queryFn: () => fetchPriceHistory(cryptoId, days),
    enabled: !!cryptoId,
    staleTime: 300000,
  });
};

export const useCryptoOptions = () => {
  return useQuery({
    queryKey: ['cryptoOptions'],
    queryFn: fetchCryptoOptions,
    staleTime: 300000,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const formatPercentage = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);

export const formatMarketCap = (value: number): string => {
  const ranges = [
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'B' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'K' }
  ];

  for (const range of ranges) {
    if (value >= range.divider) {
      return `$${(value / range.divider).toFixed(2)}${range.suffix}`;
    }
  }
  return `$${value.toFixed(2)}`;
};

export { queryClient };