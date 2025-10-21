import React, { createContext, useContext, useEffect, useState } from 'react'
import * as api from '../services/api'

const AuthContext = createContext(null)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        api
            .getUser()
            .then((res) => {
                if (mounted && res.data && res.data.user) setUser(res.data.user)
            })
            .catch(() => {
                // not signed in
            })
            .finally(() => mounted && setLoading(false))

        return () => (mounted = false)
    }, [])

    const signUp = async (payload) => {
        const res = await api.signUp(payload)
        return res
    }

    const signIn = async (payload) => {
        const res = await api.signIn(payload)
        // after sign in, try to fetch user
        const me = await api.getUser()
        setUser(me.data.user)
        return res
    }

    const signOut = async () => {
        await api.signOut()
        setUser(null)
    }

    const value = { user, loading, signIn, signUp, signOut }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
