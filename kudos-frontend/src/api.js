import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

// Set up Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export const getOrganizations = async () => {
  const response = await api.get(`/api/organizations/?timestamp=${Date.now()}`)
  console.log(response, '============res')
  return response.data
}

export const signup = async (formData) => {
  const response = await api.post('/api/register/', formData)
  return response.data
}

export const login = async (username, password) => {
  const response = await api.post('/api/login/', {
    username,
    password,
  })
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/api/current_user/')
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/api/users/')
  return response.data
}

export const giveKudos = async (receiverId, message) => {
  const response = await api.post('/api/kudos/give/', {
    receiver: receiverId,
    message,
  })
  return response.data
}

export const getReceivedKudos = async () => {
  const response = await api.get('/api/kudos/received/')
  return response.data
}

export const logout = async () => {
  const response = await api.post('/api/logout/')
  return response.data
}
