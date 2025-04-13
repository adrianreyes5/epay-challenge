import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { clientApi } from '../services/api';
import { Client } from '../types';

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Client>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{ success: boolean; message: string } | null>(null);

  const onSubmit = async (data: Client) => {
    setIsLoading(true);
    setApiResponse(null);
    
    try {
      const response = await clientApi.register(data);
      setApiResponse({
        success: response.success,
        message: response.message
      });
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
    <div className="register-container">
      <h1>Registro de Cliente</h1>
      
      {apiResponse && (
        <div className={`alert ${apiResponse.success ? 'alert-success' : 'alert-error'}`}>
          {apiResponse.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
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
          <label htmlFor="firstName">Nombres</label>
          <input
            id="firstName"
            type="text"
            {...register('firstName', { 
              required: 'El nombre es requerido',
              minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
              maxLength: { value: 50, message: 'El nombre debe tener máximo 50 caracteres' }
            })}
          />
          {errors.firstName && <span className="error">{errors.firstName.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Apellidos</label>
          <input
            id="lastName"
            type="text"
            {...register('lastName', { 
              required: 'El apellido es requerido',
              minLength: { value: 2, message: 'El apellido debe tener al menos 2 caracteres' },
              maxLength: { value: 50, message: 'El apellido debe tener máximo 50 caracteres' }
            })}
          />
          {errors.lastName && <span className="error">{errors.lastName.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'El correo es requerido',
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: 'Correo electrónico inválido' 
              }
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
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
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
