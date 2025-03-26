// src/App.js
import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const AppWrapper = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={
            isAuthenticated ? <Navigate to='/dashboard' replace /> : <Login />
          }
        />
        <Route
          path='/signup'
          element={
            isAuthenticated ? <Navigate to='/dashboard' replace /> : <Signup />
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  )
}

export default App
