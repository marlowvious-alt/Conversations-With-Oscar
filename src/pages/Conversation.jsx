import { use, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMessages, createConversation } from '../services/api'
import { useAuth } from '../context/AuthProvider'
import Button from '../Componants/Button'
import Loader from '../Componants/Loader'
import { toast } from 'react-toastify'
import UpgradeModal from '../Componants/UpgradeModal'

function MessageBubble({ m }) {
    return (
        <div className={`my-2 max-w-xl ${m.sender === 'user' ? 'ml-auto bg-[#a36621] text-white' : 'mr-auto bg-white border'} px-4 py-2 rounded`}>
            <div className="whitespace-pre-wrap">{m.content}</div>
            <div className={`text-xs ${m.sender === 'user' ? 'text-slate-300' : 'text-gray-500'}  mt-1`}>{new Date(m.createdAt).toLocaleString()}</div>
        </div>
    )
}

export default function Conversation() {
    const { id } = useParams()
    const { user } = useAuth()
    const [messages, setMessages] = useState([])
    const [prompt, setPrompt] = useState('')
    const [sending, setSending] = useState(false)
    const [showUpgradeModal, setShowUpgradeModal] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        if (!id) return
        getMessages(id).then(res => {
            if (res.data && res.data.messages) setMessages(res.data.messages)
        }).catch(console.error)
    }, [id])



    useEffect(() => {
        // scroll to bottom on new messages
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        if (messages.length === 1 && !sending) {
            // If no messages yet, not sending, and there's a prompt, send it
            streamPrompt(messages[0].content, true)
            setPrompt('')
        }
    }, [messages])

    const streamPrompt = async (promptText, isFirstMessage = false) => {
        if (!user) return
        setSending(true)
        // Use different endpoint for first message
        const endpoint = isFirstMessage ? '/stream-first' : '/prompt'
        try {
            const response = await fetch((import.meta.env.VITE_REACT_APP_API_URL || '') + "/conversation" + endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: promptText, character: 'oscar-wilde', conversationId: id })
            })

            if (!response.body) throw new Error('No response body')

            if (response.status === 403 && response.headers.get('X-Limit-Reached') === 'true') {
                const rb = await response.json();
                console.log(rb);
                if (rb.isFalse) {
                    const message = rb.message || 'Failed to send message';
                    if (message.includes('limit reached')) {
                        setShowUpgradeModal(true);
                    } else {
                        toast.error(message);
                    }
                    setSending(false);
                    return;
                }
            }

            // Append user's message immediately
            if(!isFirstMessage)
            setMessages(prev => [...prev, { sender: 'user', content: promptText, createdAt: new Date().toISOString() }])

            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let done = false
            let botBuffer = ''
            // Append an initial empty bot message to show typing
            setMessages(prev => [...prev, { sender: 'bot', content: '', createdAt: new Date().toISOString() }])

            while (!done) {
                const { value, done: d } = await reader.read()
                done = d
                if (value) {
                    const chunk = decoder.decode(value)
                    // The backend writes raw content chunks; append them
                    botBuffer += chunk
                    setMessages(prev => {
                        // replace last bot message content
                        const copy = [...prev]
                        const lastIndex = copy.map(m => m.sender).lastIndexOf('bot')
                        if (lastIndex >= 0) copy[lastIndex] = { ...copy[lastIndex], content: botBuffer }
                        return copy
                    })
                }
            }

            // After streaming ends, optionally refresh messages from server
            const finalRes = await getMessages(id)
            if (finalRes.data && finalRes.data.messages) setMessages(finalRes.data.messages)
        } catch (err) {
            console.error(err)
        } finally {
            setSending(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt.trim()) return
        // if no conversation id, create one
        let convId = id
        if (!convId) {
            const resp = await createConversation({ prompt, character: 'oscar-wilde' })
            convId = resp?.data?.conversationId
        }
        // Check if this is the first message
        const isFirstMessage = false;
        await streamPrompt(prompt, isFirstMessage)
        setPrompt('')
        // scroll after done
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }

    const handleUpgrade = async () => {
        try {
            const checkoutRes = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/payment/create-checkout-session`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const checkoutData = await checkoutRes.json();
            if (checkoutData.success && checkoutData.url) {
                // Redirect to Stripe Checkout
                window.location.href = checkoutData.url;
            } else {
                toast.error('Failed to initiate upgrade process. Please try again.');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            toast.error('Failed to initiate upgrade process. Please try again.');
        }
        setShowUpgradeModal(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <UpgradeModal
                isOpen={showUpgradeModal}
                onConfirm={handleUpgrade}
                onCancel={() => setShowUpgradeModal(false)}
            />
            <div className="flex-1 overflow-auto p-6 bg-[#f7f7f7]">
                <div className="max-w-3xl mx-auto">
                    {messages.map((m, i) => <MessageBubble key={i} m={m} />)}
                    <div ref={containerRef} />
                </div>
            </div>
            <div className="border-t p-4 bg-white">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1 border rounded px-3 py-2 resize-none"
                        placeholder="Ask Oscar..."
                        rows={2}
                    />
                    <Button disabled={sending || !prompt.trim()}>
                        {sending ? <span className="flex items-center gap-2"><Loader size={1} color="#fff" />Sending</span> : 'Send'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
