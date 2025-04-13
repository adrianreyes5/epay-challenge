import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { walletApi } from '../services/api';
import { RechargeWalletRequest } from '../types';

const Recharge: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RechargeWalletRequest>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{ success: boolean; message: string; data?: any } | null>(null);

  const onSubmit = async (data: RechargeWalletRequest) => {
    setIsLoading(true);
    setApiResponse(null);
    
    try {
      // Convertir amount a número
      const rechargeData = {
        ...data,
        amount: Number(data.amount)
      };
      
      const response = await walletApi.recharge(rechargeData);
      setApiResponse({
        success: response.success,
        message: response.message,
        data: response.data
      });
      
      if (response.success) {
        reset();
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

  return (
    <div className="recharge-container">
      <h1>Recargar Billetera</h1>
      
      {apiResponse && (
        <div className={`alert ${apiResponse.success ? 'alert-success' : 'alert-error'}`}>
          {apiResponse.message}
          {apiResponse.success && apiResponse.data && (
            <div className="recharge-details">
              <p><strong>Nuevo saldo:</strong> ${apiResponse.data.newBalance.toLocaleString()}</p>
              <p><strong>Monto recargado:</strong> ${apiResponse.data.amount.toLocaleString()}</p>
            </div>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="recharge-form">
        <div className="form-group">
          <label htmlFor="document">Documento</label>
          <input
            id="document"
            type="text"
            {...register('document', { 
              required: 'El documento es requerido',
              minLength: { value: 5, message: 'El documento debe tener al menos 5 caracteres' },
              maxLength: { value: 20, message: 'El documento debe tener máximo 20 caracteres' }
            })}
          />
          {errors.document && <span className="error">{errors.document.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            type="text"
            {...register('phone', { 
              required: 'El teléfono es requerido',
              minLength: { value: 7, message: 'El teléfono debe tener al menos 7 caracteres' },
              maxLength: { value: 15, message: 'El teléfono debe tener máximo 15 caracteres' }
            })}
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Monto a recargar</label>
          <input
            id="amount"
            type="number"
            min="1"
            step="1"
            {...register('amount', { 
              required: 'El monto es requerido',
              min: { value: 1, message: 'El monto debe ser mayor a cero' },
              valueAsNumber: true
            })}
          />
          {errors.amount && <span className="error">{errors.amount.message}</span>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Procesando...' : 'Recargar'}
        </button>
      </form>
    </div>
  );
};

export default Recharge;
