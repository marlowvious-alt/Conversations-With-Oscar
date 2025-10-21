import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null // App already shows loader during initial check

  if (!user) return <Navigate to="/sign-in" replace />

  return children
}
