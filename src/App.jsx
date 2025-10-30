import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Loader from './Componants/Loader'
import { useAuth } from './context/AuthProvider'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'
import RequireAuth from './context/RequireAuth'
import Conversation from './pages/Conversation'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancelled from './pages/PaymentCancelled'
import UserDock from './Componants/UserDock'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
        <Loader size={4} />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/change-password" element={<ChangePassword />} />
<Route path="/conversation/:id" element={<Conversation />} />
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-cancelled" element={<PaymentCancelled />} />

    </Routes>
  )
}

export default App
