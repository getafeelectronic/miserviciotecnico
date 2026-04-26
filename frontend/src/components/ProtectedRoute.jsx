import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()
  const location = useLocation()
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Cargando...</p>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}
