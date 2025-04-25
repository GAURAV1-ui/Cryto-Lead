"use client";
import CryptoCalculator from "@/components/calculator/CryptoCalculator";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-white">Crypto Converter</h1>
            <p className="text-lg text-gray-300">
              Convert your favorite cryptocurrencies with ease. Whether you're an investor, trader, or curious explorer — our converter delivers fast, intuitive, and secure currency conversions.
            </p>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Why Use This Tool?</h2>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>⚡ Instant crypto-to-crypto conversions</li>
                <li>📈 Real-time mock rate calculation</li>
                <li>🌐 Supports popular cryptocurrencies</li>
                <li>🧠 Simple and beginner-friendly interface</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl p-6 md:p-8 border border-gray-700">
            <CryptoCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}
