import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup, getOrganizations } from '../api' // Add this function to api.js
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
  })
  const [organizations, setOrganizations] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations()
        console.log(data, '=========data')
        setOrganizations(data)
      } catch (err) {
        console.error('Error fetching organizations:', err)
      }
    }
    fetchOrganizations()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signup(formData)
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Registration failed. Please try again.')
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
          Sign Up
        </Typography>
        {error && <Typography color='error'>{error}</Typography>}
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label='Username'
            fullWidth
            margin='normal'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label='First Name'
            fullWidth
            margin='normal'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            label='Last Name'
            fullWidth
            margin='normal'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <TextField
            label='Email'
            type='email'
            fullWidth
            margin='normal'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>Organization</InputLabel>
            <Select
              name='organization'
              value={formData.organization}
              onChange={handleChange}
              required
            >
              <MenuItem value=''>Select an organization</MenuItem>
              {organizations.map((org) => (
                <MenuItem key={org.id} value={org.id}>
                  {org.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup
