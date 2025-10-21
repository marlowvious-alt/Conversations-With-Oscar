import { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Button from '../Componants/Button'
import { Link, useNavigate } from 'react-router-dom'
import { GoEye, GoEyeClosed } from 'react-icons/go'
import Loader from '../Componants/Loader'

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  // Validation: both fields must be filled
  const allValid = email.trim().length > 0 && password.length > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      setSubmitting(true)
      await signIn({ email, password })
      // navigate to home after successful sign in
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Sign in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border px-3 py-2 rounded"
              type="email"
              required
            />
          </div>
                    <div>
                      <label className="block text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={"mt-1 block w-full border px-3 py-2 rounded pr-10"}
                          type={showPassword ? "text" : "password"}
                          required
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(v => !v)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <GoEye /> : <GoEyeClosed />}
                        </button>
                      </div>
                      <div className="flex justify-end mt-1">
                        <button
                          type="button"
                          className="text-xs text-blue-600 hover:underline focus:outline-none"
                          onClick={() => navigate('/forgot-password')}
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-between items-center">
            <Button disabled={submitting || !allValid}>
              {submitting ? <span className="flex items-center gap-2"><Loader size={1.2} className="text-white" color="#fff" />Signing in</span> : 'Sign In'}
            </Button>
            <Link to="/sign-up" className="text-sm underline">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
