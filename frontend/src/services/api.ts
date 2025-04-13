import axios from "axios";
import {
  ApiResponse,
  Client,
  WalletBalance,
  RechargeWalletRequest,
  PaymentSessionRequest,
  PaymentSessionResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
} from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const clientApi = {
  register: async (clientData: Client): Promise<ApiResponse<Client>> => {
    try {
      const response = await api.post<ApiResponse<Client>>(
        "/clients/register",
        clientData
      );
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Error de conexión",
        statusCode: 500,
      };
    }
  },
};

export const walletApi = {
  getBalance: async (
    document: string,
    phone: string
  ): Promise<ApiResponse<WalletBalance>> => {
    try {
      const response = await api.get<ApiResponse<WalletBalance>>(
        `/wallets/balance?document=${document}&phone=${phone}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Error de conexión",
        statusCode: 500,
      };
    }
  },

  recharge: async (
    rechargeData: RechargeWalletRequest
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post<ApiResponse<any>>(
        "/wallets/recharge",
        rechargeData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Error de conexión",
        statusCode: 500,
      };
    }
  },
};

export const paymentApi = {
  createSession: async (
    paymentData: PaymentSessionRequest
  ): Promise<ApiResponse<PaymentSessionResponse>> => {
    try {
      const response = await api.post<ApiResponse<PaymentSessionResponse>>(
        "/payments/create-session",
        paymentData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Error de conexión",
        statusCode: 500,
      };
    }
  },

  confirmPayment: async (
    confirmData: ConfirmPaymentRequest
  ): Promise<ApiResponse<ConfirmPaymentResponse>> => {
    try {
      const response = await api.post<ApiResponse<ConfirmPaymentResponse>>(
        "/payments/confirm",
        confirmData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Error de conexión",
        statusCode: 500,
      };
    }
  },
};
