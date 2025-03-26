// src/components/Navbar.js
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { AuthContext } from '../context/AuthContext'
import { removeToken } from '../api'

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await removeToken()
    logout()
    navigate('/login')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
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
