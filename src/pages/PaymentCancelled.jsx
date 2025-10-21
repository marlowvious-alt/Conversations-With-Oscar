import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PaymentCancelled() {
    const navigate = useNavigate();

    useEffect(() => {
        toast.info('Payment was cancelled. You can try again anytime!');
        // Redirect back to home after a short delay
        setTimeout(() => navigate('/'), 2000);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Payment Cancelled</h1>
                <p className="text-gray-600">Redirecting you back...</p>
            </div>
        </div>
    );
}