'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import PageHeader from '@/components/layout/PageHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { CustomerFormData, Broker, TransferFormData } from '@/types';
import { validateTransferForm } from '@/utils/validation';
import { useCreateUser } from '@/utils/api';

export default function CryptoTransferPage() {
  const router = useRouter();
  const { mutateAsync: createUser } = useCreateUser(); // ✅ Proper usage of hook

  const [formData, setFormData] = useState<TransferFormData>({
    walletAddress: '',
    preferredTimeSlot: '',
    cryptoType: 'bitcoin',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userData, setUserData] = useState<CustomerFormData | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        const storedUserData = localStorage.getItem('customerFormData');
        const storedBroker = localStorage.getItem('selectedBroker');

        if (storedUserData) {
          const parsedUser = JSON.parse(storedUserData) as CustomerFormData;
          setUserData(parsedUser);
          setFormData(prev => ({ ...prev, cryptoType: parsedUser.selectedCrypto }));
        }

        if (storedBroker) {
          setSelectedBroker(JSON.parse(storedBroker) as Broker);
        }
      } catch (err) {
        console.error('Error loading stored data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTransferForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      localStorage.setItem('transferFormData', JSON.stringify(formData));

      const payload = {
        name: userData?.name || '',
        email: userData?.email || '',
        mobile: userData?.mobile || '',
        selectedCrypto: userData?.selectedCrypto || '',
        selectedBroker: selectedBroker!,
        transferDetails: {
          walletAddress: formData.walletAddress,
          preferredTimeSlot: new Date(formData.preferredTimeSlot),
          cryptoType: formData.cryptoType,
        },
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createUser(payload); // ✅ Proper usage
      router.push('/confirmation');
    } catch (error) {
      console.error('Failed to save form:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save your transfer details. Please try again.',
      }));
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!userData || !selectedBroker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Missing Information</h2>
          <p className="mb-4">Please complete the previous steps first.</p>
          <Button onClick={() => router.push('/')}>Return to Start</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PageHeader title="Crypto Transfer" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-[#1E1E1E]">
              <h2 className="text-xl font-bold mb-4 text-white">User Information</h2>
              <div className="space-y-2">
                <p><span className="text-gray-400">Name:</span> {userData.name}</p>
                <p><span className="text-gray-400">Email:</span> {userData.email}</p>
                <p><span className="text-gray-400">Mobile:</span> {userData.mobile}</p>
                <p><span className="text-gray-400">Crypto:</span> {userData.selectedCrypto}</p>
              </div>
            </Card>

            <Card className="p-6 bg-[#1E1E1E]">
              <h2 className="text-xl font-bold mb-4 text-white">Selected Broker</h2>
              <div className="space-y-2">
                <p><span className="text-gray-400">Name:</span> {selectedBroker.name}</p>
                <p><span className="text-gray-400">Commission:</span> {selectedBroker.minCommission}% - {selectedBroker.maxCommission}%</p>
                <p><span className="text-gray-400">Rating:</span> {selectedBroker.rating}/5</p>
                <p><span className="text-gray-400">Reviews:</span> {selectedBroker.reviews}</p>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <FormInput
                  type="text"
                  name="walletAddress"
                  label="Wallet Address"
                  placeholder={`Enter your ${userData.selectedCrypto.toLowerCase()} wallet address`}
                  value={formData.walletAddress}
                  onChange={handleChange}
                  error={errors.walletAddress}
                  required
                />

                <FormInput
                  type="date"
                  name="preferredTimeSlot"
                  label="Preferred Transfer Date"
                  value={formData.preferredTimeSlot}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  error={errors.preferredTimeSlot}
                  required
                />
              </div>

              <Button type="submit" fullWidth variant="primary">
                Continue to Confirmation
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
