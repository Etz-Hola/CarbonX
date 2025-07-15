// Form validation utilities
export const isRequired = (value: any): boolean => {
  return value !== undefined && value !== null && value !== '';
};

export const isValidAmount = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num > 0;
};

export const isValidSlippage = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 100;
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateTokenAmount = (amount: string, balance: string): string | null => {
  if (!isRequired(amount)) {
    return 'Amount is required';
  }
  
  if (!isValidAmount(amount)) {
    return 'Invalid amount';
  }
  
  if (parseFloat(amount) > parseFloat(balance)) {
    return 'Insufficient balance';
  }
  
  return null;
};

export const validateStakingAmount = (amount: string, balance: string, minStake: string): string | null => {
  const tokenError = validateTokenAmount(amount, balance);
  if (tokenError) return tokenError;
  
  if (parseFloat(amount) < parseFloat(minStake)) {
    return `Minimum stake is ${minStake}`;
  }
  
  return null;
};

export const validateSlippage = (slippage: string): string | null => {
  if (!isRequired(slippage)) {
    return 'Slippage is required';
  }
  
  if (!isValidSlippage(slippage)) {
    return 'Invalid slippage value';
  }
  
  if (parseFloat(slippage) > 10) {
    return 'Slippage too high (max 10%)';
  }
  
  return null;
};

export const validateAddress = (address: string): string | null => {
  if (!isRequired(address)) {
    return 'Address is required';
  }
  
  if (!isValidAddress(address)) {
    return 'Invalid wallet address';
  }
  
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!isRequired(email)) {
    return 'Email is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Invalid email format';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!isRequired(password)) {
    return 'Password is required';
  }
  
  if (!isValidPassword(password)) {
    return 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
  
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!isRequired(confirmPassword)) {
    return 'Confirm password is required';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};