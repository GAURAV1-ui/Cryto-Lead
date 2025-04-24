'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerFormData } from '@/types';
import { getCustomerFormErrors } from '@/utils/validation';
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import { useCryptoOptions } from '@/utils/api';
import { saveCustomerData } from '@/utils/storage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CustomerForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    mobile: '',
    email: '',
    selectedCrypto: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { 
    data: cryptoOptions, 
    isLoading: isLoadingOptions, 
    error: cryptoOptionsError 
  } = useCryptoOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = getCustomerFormErrors(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      await saveCustomerData(formData);
      router.push('/broker-comparison');
    } catch (err) {
      console.error('Error saving customer data:', err);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save your information. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isLoadingOptions) {
    return <LoadingSpinner />;
  }

  if (cryptoOptionsError) {
    return (
      <div className="container mx-auto px-4 py-14">
        <Card className="max-w-2xl mx-auto p-6 text-red-500">
          Failed to load cryptocurrency options. Please refresh the page.
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-14">
      <PageHeader title="Customer Information" />
      
      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="John Doe"
            required
          />

          <FormInput
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
            placeholder="+1 234 567 8901"
            required
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="example@email.com"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Select Cryptocurrency <span className="text-red-500">*</span>
            </label>
            <select
              name="selectedCrypto"
              value={formData.selectedCrypto}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-[#1E1E1E] text-white ${
                errors.selectedCrypto ? 'border-red-500' : 'border-gray-600'
              }`}
              required
            >
              <option value="">Select a cryptocurrency</option>
              {cryptoOptions?.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name} ({option.symbol})
                </option>
              ))}
            </select>
            {errors.selectedCrypto && (
              <p className="text-sm text-red-500">{errors.selectedCrypto}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Continue to Broker Selection'}
          </Button>
        </form>
      </Card>
    </div>
  );
}