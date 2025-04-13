import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { paymentApi } from '../services/api';
import { PaymentSessionRequest, ConfirmPaymentRequest } from '../types';

const Payment: React.FC = () => {
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<{ success: boolean; message: string; data?: any } | null>(null);
  
  const { 
    register: registerCreate, 
    handleSubmit: handleSubmitCreate, 
    formState: { errors: errorsCreate } 
  } = useForm<PaymentSessionRequest>();
  
  const { 
    register: registerConfirm, 
    handleSubmit: handleSubmitConfirm, 
    formState: { errors: errorsConfirm } 
  } = useForm<ConfirmPaymentRequest>();

  const onCreateSession = async (data: PaymentSessionRequest) => {
    setIsLoading(true);
    setApiResponse(null);
    
    try {
      // Convertir amount a número
      const paymentData = {
        ...data,
        amount: Number(data.amount)
      };
      
      const response = await paymentApi.createSession(paymentData);
      
      if (response.success && response.data) {
        setSessionId(response.data.sessionId);
        setExpiresAt(response.data.expiresAt);
        setStep('confirm');
        setApiResponse({
          success: true,
          message: response.message
        });
      } else {
        setApiResponse({
          success: false,
          message: response.message
        });
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: 'Error al conectar con el servidor'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmPayment = async (data: ConfirmPaymentRequest) => {
    setIsLoading(true);
    setApiResponse(null);
    
    try {
      const response = await paymentApi.confirmPayment({
        sessionId: Number(data.sessionId),
        token: data.token
      });
      
      setApiResponse({
        success: response.success,
        message: response.message,
        data: response.data
      });
      
      if (response.success) {
        // Volver al paso inicial después de un pago exitoso
        setTimeout(() => {
          setStep('create');
          setSessionId(null);
          setExpiresAt(null);
        }, 5000);
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: 'Error al conectar con el servidor'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPayment = () => {
    setStep('create');
    setSessionId(null);
    setExpiresAt(null);
    setApiResponse(null);
  };

  return (
    <div className="payment-container">
      <h1>Realizar Pago</h1>
      
      {apiResponse && (
        <div className={`alert ${apiResponse.success ? 'alert-success' : 'alert-error'}`}>
          {apiResponse.message}
          {apiResponse.success && step === 'confirm' && apiResponse.data && (
            <div className="payment-details">
              <p><strong>Monto pagado:</strong> ${apiResponse.data.amount.toLocaleString()}</p>
              <p><strong>Nuevo saldo:</strong> ${apiResponse.data.newBalance.toLocaleString()}</p>
              <p><strong>Fecha de pago:</strong> {new Date(apiResponse.data.paymentDate).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}
      
      {step === 'create' ? (
        <form onSubmit={handleSubmitCreate(onCreateSession)} className="payment-form">
          <div className="form-group">
            <label htmlFor="document">Documento</label>
            <input
              id="document"
              type="text"
              {...registerCreate('document', { 
                required: 'El documento es requerido',
                minLength: { value: 5, message: 'El documento debe tener al menos 5 caracteres' },
                maxLength: { value: 20, message: 'El documento debe tener máximo 20 caracteres' }
              })}
            />
            {errorsCreate.document && <span className="error">{errorsCreate.document.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Monto a pagar</label>
            <input
              id="amount"
              type="number"
              min="1"
              step="1"
              {...registerCreate('amount', { 
                required: 'El monto es requerido',
                min: { value: 1, message: 'El monto debe ser mayor a cero' },
                valueAsNumber: true
              })}
            />
            {errorsCreate.amount && <span className="error">{errorsCreate.amount.message}</span>}
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Procesando...' : 'Iniciar Pago'}
          </button>
        </form>
      ) : (
        <div className="confirm-payment">
          <div className="session-info">
            <p>Se ha enviado un token de confirmación a tu correo electrónico.</p>
            <p><strong>ID de Sesión:</strong> {sessionId}</p>
            <p><strong>Expira:</strong> {new Date(expiresAt || '').toLocaleString()}</p>
          </div>
          
          <form onSubmit={handleSubmitConfirm(onConfirmPayment)} className="confirm-form">
            <div className="form-group">
              <label htmlFor="sessionId">ID de Sesión</label>
              <input
                id="sessionId"
                type="number"
                defaultValue={sessionId || undefined}
                {...registerConfirm('sessionId', { 
                  required: 'El ID de sesión es requerido',
                  valueAsNumber: true
                })}
              />
              {errorsConfirm.sessionId && <span className="error">{errorsConfirm.sessionId.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="token">Token de Confirmación</label>
              <input
                id="token"
                type="text"
                {...registerConfirm('token', { 
                  required: 'El token es requerido',
                  minLength: { value: 6, message: 'El token debe tener 6 dígitos' },
                  maxLength: { value: 6, message: 'El token debe tener 6 dígitos' },
                  pattern: { value: /^\d+$/, message: 'El token debe contener solo dígitos' }
                })}
              />
              {errorsConfirm.token && <span className="error">{errorsConfirm.token.message}</span>}
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={resetPayment} disabled={isLoading}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Confirmando...' : 'Confirmar Pago'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payment;
