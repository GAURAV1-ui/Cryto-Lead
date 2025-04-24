import { CustomerFormData } from '@/types';

export const saveCustomerData = (data: CustomerFormData): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('customerFormData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving customer data:', error);
  }
};


export const getCustomerData = (): CustomerFormData | null => {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem('customerFormData');
    if (!data) return null;

    const parsed: unknown = JSON.parse(data);
    if (isCustomerFormData(parsed)) {
      return parsed;
    } else {
      console.warn('Invalid customer data shape:', parsed);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving customer data:', error);
    return null;
  }
};

export const clearCustomerData = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('customerFormData');
  } catch (error) {
    console.error('Error clearing customer data:', error);
  }
};

const isCustomerFormData = (data: any): data is CustomerFormData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.name === 'string' &&
    typeof data.email === 'string'
  );
};
