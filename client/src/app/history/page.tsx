'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetAllUsers } from '@/utils/api';
import { UserData } from '@/types';

export default function HistoryPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await useGetAllUsers();
        if (response.isSuccess) {
          setTransactions(response.data);
        } else {
          setError('Failed to load transaction history');
        }
      } catch (err) {
        setError('Failed to load transaction history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleStartNewTransfer = () => {
    localStorage.removeItem('customerFormData');
    localStorage.removeItem('selectedBroker');
    localStorage.removeItem('transferFormData');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Transaction History</h1>
            <Button onClick={handleStartNewTransfer} variant="primary">
              Start New Transfer
            </Button>
          </div>

          {transactions.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-400">No transactions found</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {transactions.map((transaction) => (
                <Card key={transaction.email} className="p-6 bg-[#1E1E1E]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">User Information</h3>
                      <div className="space-y-1">
                        <p><span className="text-gray-400">Name:</span> {transaction.name}</p>
                        <p><span className="text-gray-400">Email:</span> {transaction.email}</p>
                        <p><span className="text-gray-400">Mobile:</span> {transaction.mobile}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Transfer Details</h3>
                      <div className="space-y-1">
                        <p><span className="text-gray-400">Cryptocurrency:</span> {transaction.selectedCrypto}</p>
                        <p><span className="text-gray-400">Wallet Address:</span> {transaction.transferDetails.walletAddress}</p>
                        <p><span className="text-gray-400">Preferred Time:</span> {new Date(transaction.transferDetails.preferredTimeSlot).toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Status & Broker</h3>
                      <div className="space-y-1">
                        <p>
                          <span className="text-gray-400">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded ${
                            transaction.status === 'completed' ? 'bg-green-500' :
                            transaction.status === 'pending' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}>
                            {transaction.status}
                          </span>
                        </p>
                        <p><span className="text-gray-400">Broker:</span> {transaction.selectedBroker.name}</p>
                        <p><span className="text-gray-400">Commission:</span> {transaction.selectedBroker.minCommission}% - {transaction.selectedBroker.maxCommission}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400">
                      Transaction Date: {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 