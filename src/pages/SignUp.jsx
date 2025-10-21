import { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Button from '../Componants/Button'
import Loader from '../Componants/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";

function validateEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignUp() {
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    // Validation states
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirm: false,
    })

    const nameValid = name.trim().length > 0
    const emailValid = validateEmail(email)
    const passwordValid = password.length >= 6
    const confirmValid = confirm === password && confirm.length > 0
    const allValid = nameValid && emailValid && passwordValid && confirmValid

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            setSubmitting(true)
            await signUp({ email, name, password, confirm_password: confirm })
            // navigate to sign-in after successful sign-up
            navigate('/sign-in')
        } catch (err) {
            console.log(err)
            setError(err?.response?.data?.message || 'Sign up failed')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, name: true }))}
                            className={
                                "mt-1 block w-full border px-3 py-2 rounded" +
                                (!nameValid && touched.name ? " border-red-500" : "")
                            }
                            required
                            aria-invalid={!nameValid}
                        />
                        {!nameValid && touched.name && (
                            <div className="text-xs text-red-600 mt-1">Name is required.</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, email: true }))}
                            className={
                                "mt-1 block w-full border px-3 py-2 rounded" +
                                (!emailValid && touched.email ? " border-red-500" : "")
                            }
                            type="email"
                            required
                            aria-invalid={!emailValid}
                        />
                        {!emailValid && touched.email && (
                            <div className="text-xs text-red-600 mt-1">Enter a valid email address.</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                {showPassword ? (
                                    <GoEye />
                                ) : (
                                    <GoEyeClosed />
                                )}
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
                                onChange={(e) => setConfirm(e.target.value)}
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
                                {showConfirm ? (
                                    <GoEye />
                                ) : (
                                    <GoEyeClosed />
                                )}
                            </button>
                        </div>
                        {!confirmValid && touched.confirm && (
                            <div className="text-xs text-red-600 mt-1">Passwords must match.</div>
                        )}
                    </div>
                    {error && <div className="text-sm text-red-600">{error}</div>}
                    <div className="flex justify-between items-center">
                        <Button disabled={submitting || !allValid}>
                            {submitting ? <span className="flex items-center gap-2"><Loader size={1.2} className="text-white" color="#fff" />Creating</span> : 'Create'}
                        </Button>
                        <Link to="/sign-in" className="text-sm underline">Have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
