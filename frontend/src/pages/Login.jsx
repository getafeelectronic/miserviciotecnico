import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuthStore from '../store/authStore'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuthStore()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const from = location.state?.from?.pathname || '/dashboard'
  
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setError('')
      await signIn(data.email, data.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>📺 Mi Servicio Técnico</h1>
          <p>Gestión de reparaciones de televisores</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido'
                }
              })}
              placeholder="tu@email.com"
              disabled={loading}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
              placeholder="••••••••"
              disabled={loading}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          
          <div className="login-footer">
            <Link to="/recuperar-contraseña" className="link">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
        
        <div className="login-info">
          <p>🔒 Acceso seguro con Supabase</p>
        </div>
      </div>
    </div>
  )
}
