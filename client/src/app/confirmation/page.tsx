'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { CustomerFormData } from '@/types';
import { TransferFormData } from '@/utils/validation';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';

interface ConfirmationData {
  customerData: CustomerFormData;
  selectedBroker: {
    name: string;
    minCommission: number;
    maxCommission: number;
  };
  transferDetails: TransferFormData;
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);

  useEffect(() => {
    const customerData = localStorage.getItem('customerFormData');
    const selectedBroker = localStorage.getItem('selectedBroker');
    const transferDetails = localStorage.getItem('transferFormData');

    if (!customerData || !selectedBroker || !transferDetails) {
      router.push('/');
      return;
    }

    setConfirmationData({
      customerData: JSON.parse(customerData),
      selectedBroker: JSON.parse(selectedBroker),
      transferDetails: JSON.parse(transferDetails),
    });
  }, [router]);

  const handleStartOver = () => {
    localStorage.clear();
    router.push('/');
  };

  const formatWalletAddress = (address: string) => {
    if (address.length <= 16) return address;
    return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
  };

  if (!confirmationData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin h-12 w-12 border-4 border-purple-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PageHeader title="Transfer Confirmation" />

          <Card className="p-8 border border-gray-800 rounded-xl shadow-2xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Thank You!</h2>
              <p className="text-gray-300 mb-2">
                Your crypto transfer request has been successfully submitted.
              </p>
              <p className="text-gray-300">
                Our exchange agent will contact you within 10-15 minutes to complete the transfer process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Selected Cryptocurrency</h3>
                <p className="text-gray-300">{confirmationData.customerData.selectedCrypto}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Selected Broker</h3>
                <p className="text-gray-300">{confirmationData.selectedBroker.name}</p>
                <p className="text-gray-300 text-sm">
                  Commission: {confirmationData.selectedBroker.minCommission}% - {confirmationData.selectedBroker.maxCommission}%
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Transfer Details</h3>
                <div className="text-gray-300 break-all">
                  <p className="truncate" title={confirmationData.transferDetails.walletAddress}>
                    Wallet: {formatWalletAddress(confirmationData.transferDetails.walletAddress)}
                  </p>
                  <p>Date: {new Date(confirmationData.transferDetails.preferredTimeSlot).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleStartOver}
                variant="secondary"
                size="lg"
                className="font-orbitron"
              >
                Start New Transfer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}