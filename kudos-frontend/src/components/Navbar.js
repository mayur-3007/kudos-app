import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { logout } from '../api'

const Navbar = () => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('token')

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('token')
      navigate('/login')
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link
            to='/dashboard'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Kudos App
          </Link>
        </Typography>
        {isAuthenticated ? (
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
