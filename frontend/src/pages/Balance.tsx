import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { walletApi } from '../services/api';
import { WalletBalance } from '../types';

interface BalanceFormData {
  document: string;
  phone: string;
}

const Balance: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BalanceFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [balanceData, setBalanceData] = useState<WalletBalance | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: BalanceFormData) => {
    setIsLoading(true);
    setBalanceData(null);
    setError(null);
    
    try {
      const response = await walletApi.getBalance(data.document, data.phone);
      
      if (response.success && response.data) {
        setBalanceData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="balance-container">
      <h1>Consulta de Saldo</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="balance-form">
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
        
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Consultando...' : 'Consultar Saldo'}
        </button>
      </form>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      {balanceData && (
        <div className="balance-result">
          <h2>Información de la Billetera</h2>
          <div className="balance-info">
            <p><strong>Cliente:</strong> {balanceData.firstName} {balanceData.lastName}</p>
            <p><strong>Documento:</strong> {balanceData.document}</p>
            {balanceData.hasWallet ? (
              <>
                <p><strong>Saldo:</strong> ${balanceData.balance.toLocaleString()}</p>
                <p><strong>Billetera creada:</strong> {new Date(balanceData.walletCreatedAt || '').toLocaleDateString()}</p>
              </>
            ) : (
              <p className="no-wallet">El cliente no tiene una billetera activa</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Balance;
