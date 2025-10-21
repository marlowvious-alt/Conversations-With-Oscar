import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Componants/Loader';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        async function verifyPayment() {
            try {
                const sessionId = searchParams.get('session_id');
                if (!sessionId) {
                    toast.error('Invalid payment session');
                    navigate('/');
                    return;
                }

                const response = await fetch(
                    `${import.meta.env.VITE_REACT_APP_API_URL}/payment/verify-session?session_id=${sessionId}`,
                    {
                        credentials: 'include'
                    }
                );
                const data = await response.json();

                if (data.success) {
                    toast.success('Successfully upgraded to premium!');
                    // Wait a bit before redirecting to let the user see the success message
                    setTimeout(() => navigate('/'), 2000);
                } else {
                    toast.error('Payment verification failed. Please contact support.');
                    setTimeout(() => navigate('/'), 3000);
                }
            } catch (err) {
                console.error('Payment verification error:', err);
                toast.error('Failed to verify payment. Please contact support.');
                setTimeout(() => navigate('/'), 3000);
            } finally {
                setVerifying(false);
            }
        }

        verifyPayment();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                {verifying ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader size={2} />
                        <p className="text-gray-600">Verifying your payment...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-2xl font-bold text-[#bf925e]">Thank you!</h1>
                        <p className="text-gray-600">Your payment is being processed.</p>
                    </div>
                )}
            </div>
        </div>
    );
}