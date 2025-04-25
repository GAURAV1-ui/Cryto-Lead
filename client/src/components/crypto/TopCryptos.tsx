import Card from '@/components/ui/Card';
import { Crypto } from '@/types';

interface Props {
  cryptos: Crypto[];
  selected: string;
  onSelect: (cryptoId: string) => void;
}

export default function TopCryptos({ cryptos, selected, onSelect }: Props) {
  return (
    <Card className="p-3 bg-gray-950 border border-purple-700 rounded-xl shadow-lg">
      <h2 className="text-sm font-bold mb-2">Top 5 Cryptos</h2>
      <div className="space-y-1">
        {cryptos.slice(0, 5).map((crypto) => (
          <div
            key={crypto.id}
            className="flex justify-between items-center p-3 rounded-md cursor-pointer transition-all hover:bg-gray-800"
          >
            <div className="flex items-center space-x-2">
              <img src={crypto.image} alt={crypto.name} className="w-5 h-5" />
              <span className="text-xs font-medium text-white">
                {crypto.symbol.toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-medium text-white">
              ${crypto.current_price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}