import { Broker } from '../types';

export const brokerData: Broker[] = [
  {
    id: 'binance',
    name: 'Binance',
    minCommission: 0.1,
    maxCommission: 0.2,
    rating: 4.8,
    reviews: 1200,
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    minCommission: 0.5,
    maxCommission: 1.0,
    rating: 4.5,
    reviews: 950,
  },
  {
    id: 'kraken',
    name: 'Kraken',
    minCommission: 0.16,
    maxCommission: 0.26,
    rating: 4.6,
    reviews: 800,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    minCommission: 0.35,
    maxCommission: 1.0,
    rating: 4.4,
    reviews: 600,
  },
  {
    id: 'bitfinex',
    name: 'Bitfinex',
    minCommission: 0.1,
    maxCommission: 0.2,
    rating: 4.3,
    reviews: 500,
  },
]; 
