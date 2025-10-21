import { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Button from '../Componants/Button'
import Loader from '../Componants/Loader'
import { updatePassword } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (!user) {
    // Not authenticated: redirect to sign-in
    navigate('/sign-in')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (newPassword !== confirm) return setError('Confirm password should be same.')
    try {
      setSubmitting(true)
      await updatePassword({ current_password: current, new_password: newPassword, confirm_new_password: confirm })
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to update password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Current Password</label>
            <input value={current} onChange={(e) => setCurrent(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded" type="password" required />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded" type="password" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm New Password</label>
            <input value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded" type="password" required />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-between items-center">
            <Button disabled={submitting}>{submitting ? <span className="flex items-center gap-2"><Loader size={1} className="text-white" color="#fff" />Updating...</span> : 'Update password'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
