import { useAuth } from './AuthProvider'

export default function RequireAuth({ children }) {
  const { loading } = useAuth()

  if (loading) return null // still wait while loading

  // ✅ Always allow access — no redirect
  return children
}

