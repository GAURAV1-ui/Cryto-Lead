import Card from '@/components/ui/Card';
import { Crypto } from '@/types';

interface Props {
  cryptos: Crypto[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function CryptoTable({ cryptos, selected, onSelect }: Props) {
  return (
    <Card className="overflow-hidden  border border-white rounded-2xl shadow-2xl">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white uppercase tracking-wider text-xs border-b border-white">
            <tr>
              <th className="px-6 py-4 text-left">Cryptocurrency</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">24h %</th>
              <th className="px-6 py-4 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E1E1E]">
            {cryptos.map((crypto) => {
              const isNegative = crypto.price_change_percentage_24h < 0.00;
              const changeColor = isNegative ? 'text-red-500' : 'text-green-400';

              return (
                <tr
                  key={crypto.id}
                  onClick={() => onSelect(crypto.id)}
                  className={`cursor-pointer transition-colors ${
                    selected === crypto.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                    <span className="font-orbitron text-white">{crypto.name}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-orbitron text-white">
                    ${crypto.current_price.toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 text-right font-orbitron ${changeColor}`}>
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right font-orbitron text-white">
                    ${crypto.market_cap.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
