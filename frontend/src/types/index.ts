export interface Client {
  id?: number;
  document: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Wallet {
  id?: number;
  clientId?: number;
  balance: number;
  hasWallet: boolean;
  walletCreatedAt?: string;
}

export interface WalletBalance {
  document: string;
  firstName: string;
  lastName: string;
  balance: number;
  hasWallet: boolean;
  walletCreatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
}

export interface RechargeWalletRequest {
  document: string;
  phone: string;
  amount: number;
}

export interface PaymentSessionRequest {
  document: string;
  amount: number;
}

export interface PaymentSessionResponse {
  sessionId: number;
  expiresAt: string;
}

export interface ConfirmPaymentRequest {
  sessionId: number;
  token: string;
}

export interface ConfirmPaymentResponse {
  document: string;
  amount: number;
  newBalance: number;
  paymentDate: string;
}
