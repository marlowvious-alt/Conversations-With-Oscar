import { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from '../Componants/Button'
import Loader from '../Componants/Loader'
import { setNewPassword } from '../services/api'
import { GoEye, GoEyeClosed } from 'react-icons/go'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const key = searchParams.get('key')
  const navigate = useNavigate()

  const [newPassword, setNewPasswordInput] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [touched, setTouched] = useState({ password: false, confirm: false })

  // Validation
  const passwordValid = newPassword.length >= 6
  const confirmValid = confirm === newPassword && confirm.length > 0
  const allValid = passwordValid && confirmValid

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!id || !key) return setError('Invalid reset link')
    if (!passwordValid) return setError('Password must be at least 6 characters')
    if (!confirmValid) return setError('Passwords do not match')
    try {
      setSubmitting(true)
      await setNewPassword({ id, key, new_password: newPassword, confirm_new_password: confirm })
      // on success navigate to sign in
      navigate('/sign-in')
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to reset password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <div className="relative">
              <input
                value={newPassword}
                onChange={e => setNewPasswordInput(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                className={
                  "mt-1 block w-full border px-3 py-2 rounded pr-10" +
                  (!passwordValid && touched.password ? " border-red-500" : "")
                }
                type={showPassword ? "text" : "password"}
                required
                aria-invalid={!passwordValid}
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
            {!passwordValid && touched.password && (
              <div className="text-xs text-red-600 mt-1">Password must be at least 6 characters.</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <input
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, confirm: true }))}
                className={
                  "mt-1 block w-full border px-3 py-2 rounded pr-10" +
                  (!confirmValid && touched.confirm ? " border-red-500" : "")
                }
                type={showConfirm ? "text" : "password"}
                required
                aria-invalid={!confirmValid}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirm(v => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <GoEye /> : <GoEyeClosed />}
              </button>
            </div>
            {!confirmValid && touched.confirm && (
              <div className="text-xs text-red-600 mt-1">Passwords must match.</div>
            )}
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-between items-center">
            <Button disabled={submitting || !allValid}>
              {submitting ? <span className="flex items-center gap-2"><Loader size={1} className="text-white" color="#fff" />Setting...</span> : 'Set new password'}
            </Button>
            <Link to="/sign-in" className="text-sm underline">Back to sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
