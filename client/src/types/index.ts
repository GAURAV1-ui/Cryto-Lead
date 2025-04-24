
export interface CustomerFormData {
  name: string;
  email: string;
  mobile: string;
  selectedCrypto: string;
}

export interface Broker {
  id: string;
  name: string;
  tagline: string;
  minCommission: number;
  maxCommission: number;
  rating: number;
  reviews: number;
}

export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

export interface TransferFormData {
  walletAddress: string;
  preferredTimeSlot: string;
  cryptoType: string;
} 

export interface TransferDetails {
  crypto: string;
  amount: string;
  recipientAddress: string;
}

export interface ConfirmationData {
  customerData: CustomerFormData;
  selectedBroker: Broker;
  transferDetails: TransferDetails;
} 

export interface UserData {
  name: string;
  email: string;
  mobile: string;
  selectedCrypto: string;
  selectedBroker: {
    id: string;
    name: string;
    minCommission: number;
    maxCommission: number;
    rating: number;
    reviews: number;
  };
  transferDetails: {
    walletAddress: string;
    preferredTimeSlot: Date;
    cryptoType: string;
  };
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}