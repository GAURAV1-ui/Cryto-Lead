'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Broker } from '@/types';
import Card from '@/components/ui/Card';
import { brokerData } from '@/data/brokers';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function BrokerComparison() {
  const router = useRouter();
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        sortBrokers(sortOrder);
      } catch (err) {
        setError('Failed to fetch broker data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
  }, [sortOrder]);

  const sortBrokers = (order: 'asc' | 'desc') => {
    const sorted = [...brokerData].sort((a, b) =>
      order === 'asc'
        ? a.minCommission - b.minCommission
        : b.minCommission - a.minCommission
    );
    setBrokers(sorted);
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleBrokerSelect = (broker: Broker) => {
    try {
      localStorage.setItem('selectedBroker', JSON.stringify(broker));
      router.push('/crypto-transfer');
    } catch (err) {
      console.error('Failed to save broker selection:', err);
      setError('Failed to save your selection. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 text-red-500">{error}</Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <PageHeader title="Broker Comparison" />
          <Button
            onClick={toggleSort}
            variant="secondary"
            className="whitespace-nowrap"
          >
            Sort: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map(broker => (
            <Card key={broker.id} className="p-6 hover:shadow-lg transition-shadow bg-[#1E1E1E]">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{broker.name}</h2>
                  <p className="text-gray-400 text-sm">{broker.tagline}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-gray-400 text-sm">Commission:</span>
                    <p className="font-semibold">
                      {broker.minCommission}% - {broker.maxCommission}%
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Rating:</span>
                    <p>{broker.rating}/5 ({broker.reviews} reviews)</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleBrokerSelect(broker)}
                  variant="primary"
                  className="w-full"
                >
                  Select Broker
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}