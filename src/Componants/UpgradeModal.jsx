import React from 'react'
import Button from './Button'

export default function UpgradeModal({ onConfirm, onCancel, isOpen }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full m-4 transform transition-all">
                {/* Icon or illustration */}
                <div className="text-center mb-6">
                    <div className="bg-[#bf925e] bg-opacity-10 rounded-full p-3 inline-flex mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#bf925e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Premium</h3>
                    <p className="text-gray-600 mb-6">
                        You've reached the message limit for the basic plan. Upgrade to premium for:
                    </p>
                    <ul className="text-left text-gray-600 mb-6 space-y-2">
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-[#bf925e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Unlimited messages with Oscar
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-[#bf925e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Priority response times
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-[#bf925e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Exclusive content and features
                        </li>
                    </ul>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Maybe Later
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-[#bf925e] text-white rounded-md hover:bg-[#a67b4d] transition-colors"
                    >
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    )
}