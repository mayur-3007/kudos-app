import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import { Container, TextField, Button, Typography, Box } from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(username, password)
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Login
        </Typography>
        {error && <Typography color='error'>{error}</Typography>}
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label='Username'
            fullWidth
            margin='normal'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
