import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function UserDock() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  // Hide dock if no user
  if (!user) return null

  const displayName = user.name || user.username || user.email || 'User'

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="rounded border border-black shadow-[2px_2px_black] overflow-hidden bg-white">
        <button
          onClick={() => setOpen((v) => !v)}
          className="px-4 py-2 font-medium text-sm w-full text-left bg-[#f7f7f7]"
        >
          {displayName}
        </button>

        {open && (
          <div className="p-3 bg-white min-w-[220px]">
            <div className="text-sm mb-2"><span className="font-semibold">Name:</span> {user.name || '—'}</div>
            <div className="text-sm mb-2"><span className="font-semibold">Email:</span> {user.email || '—'}</div>
            <div className="text-sm mb-3"><span className="font-semibold">Plan:</span> {user.plan || 'basic'}</div>
            <div className="flex gap-2">
              <Button
                className="w-full"
                onClick={async () => {
                  await signOut()
                  navigate('/sign-in')
                }}
              >
                Sign out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
