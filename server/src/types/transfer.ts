export interface Transfer {
  id?: string;
  amount: string;
  cryptoType: string;
  walletAddress: string;
  status?: 'pending' | 'completed' | 'failed';
  timestamp?: string;
} 