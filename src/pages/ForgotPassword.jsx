import { useState } from 'react'
import Button from '../Componants/Button'
import Loader from '../Componants/Loader'
import { sendResetLink } from '../services/api'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMsg(null)
    try {
      setSubmitting(true)
      console.log({sendResetLink})
      const res = await sendResetLink({ email })
      setMsg(res.data.message || 'If the email exists, you will receive a reset link.')
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to send reset link')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
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
          {msg && <div className="text-sm text-green-600">{msg}</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-between items-center">
            <Button disabled={submitting}>{submitting ? <span className="flex items-center gap-2"><Loader size={1} className="text-white" color="#fff" />Sending...</span> : 'Send reset link'}</Button>
            <Link to="/sign-in" className="text-sm underline">Back to sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
