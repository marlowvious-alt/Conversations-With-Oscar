import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || '',
withCredentials: false,


})

export const signUp = (data) => api.post('/auth/create-user', data)
export const signIn = (data) => api.post('/auth/create-session', data)
export const getUser = () => api.get('/auth/user-info')
export const signOut = () => api.get('/auth/sign-out')
export const sendResetLink = (data) => api.post('/auth/send-reset-link', data)
export const setNewPassword = (data) => api.post('/auth/set-new-password', data)
export const updatePassword = (data) => api.post('/auth/update-password', data)
export const createConversation = (data) => api.post('/conversation/create', data)
export const getMessages = (conversationId) => api.get(`/conversation/${conversationId}/messages`)
// Note: streaming is handled with fetch in the component because axios doesn't expose browser streams reliably


export default api
