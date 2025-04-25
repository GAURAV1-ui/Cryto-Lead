import { CustomerFormData, TransferFormData } from '@/types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobileNumber = (mobileNumber: string): boolean => {
  const mobileRegex = /^\+?[1-9]\d{9,14}$/;
  return mobileRegex.test(mobileNumber);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateAmount = (amount: string): boolean => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount > 0;
};

export const getCustomerFormErrors = (data: CustomerFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.mobile.trim()) {
    errors.mobile = 'Mobile number is required';
  } else if (!validateMobileNumber(data.mobile)) {
    errors.mobile = 'Please enter a valid mobile number';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.selectedCrypto) {
    errors.selectedCrypto = 'Please select a cryptocurrency';
  }

  return errors;
};

export const validateWalletAddress = (address: string, cryptoType: string): string | null => {
  const trimmedAddress = address.trim();

  if (!trimmedAddress) {
    return 'Wallet address is required';
  }

  switch (cryptoType.toLowerCase()) {
    case 'bitcoin':
      if (trimmedAddress.startsWith('bc1')) {
        const bech32Regex = /^bc1[ac-hj-np-z02-9]{11,71}$/;
        if (!bech32Regex.test(trimmedAddress)) {
          return 'Invalid Native SegWit (bech32) Bitcoin address format';
        }
      } else if (trimmedAddress.startsWith('3')) {
        const segwitRegex = /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/;
        if (!segwitRegex.test(trimmedAddress)) {
          return 'Invalid SegWit Bitcoin address format';
        }
      } else if (trimmedAddress.startsWith('1')) {
        const legacyRegex = /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/;
        if (!legacyRegex.test(trimmedAddress)) {
          return 'Invalid Legacy Bitcoin address format';
        }
      } else {
        return 'Bitcoin address must start with bc1 (Native SegWit), 3 (SegWit), or 1 (Legacy)';
      }
      break;

    case 'ethereum':
      const ethRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!ethRegex.test(trimmedAddress)) {
        return 'Invalid Ethereum address format. Must start with 0x followed by 40 hexadecimal characters';
      }
      break;

    case 'litecoin':
      if (trimmedAddress.startsWith('ltc1')) {
        const ltcBech32Regex = /^ltc1[ac-hj-np-z02-9]{11,71}$/;
        if (!ltcBech32Regex.test(trimmedAddress)) {
          return 'Invalid Native SegWit Litecoin address format';
        }
      } else if (trimmedAddress.startsWith('M') || trimmedAddress.startsWith('3')) {
        const ltcSegwitRegex = /^[M3][1-9A-HJ-NP-Za-km-z]{25,34}$/;
        if (!ltcSegwitRegex.test(trimmedAddress)) {
          return 'Invalid SegWit Litecoin address format';
        }
      } else if (trimmedAddress.startsWith('L')) {
        const ltcLegacyRegex = /^L[1-9A-HJ-NP-Za-km-z]{25,34}$/;
        if (!ltcLegacyRegex.test(trimmedAddress)) {
          return 'Invalid Legacy Litecoin address format';
        }
      } else {
        return 'Litecoin address must start with ltc1 (Native SegWit), M/3 (SegWit), or L (Legacy)';
      }
      break;

    case 'tether':
      const usdtRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!usdtRegex.test(trimmedAddress)) {
        return 'Invalid USDT address format. Must start with 0x followed by 40 hexadecimal characters';
      }
      break;

    default:
      return 'Unsupported cryptocurrency type';
  }

  return null;
};

export const validateTransferForm = (data: TransferFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  const walletError = validateWalletAddress(data.walletAddress, data.cryptoType);
  if (walletError) {
    errors.walletAddress = walletError;
  }

  if (!data.preferredTimeSlot) {
    errors.preferredTimeSlot = 'Please select a preferred date';
  } else {
    const selectedDate = new Date(data.preferredTimeSlot);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.preferredTimeSlot = 'Please select a future date';
    }
  }

  return errors;
};
