import React, { useState, useEffect } from 'react'
import { getCurrentUser, getUsers, giveKudos, getReceivedKudos } from '../api'
import GiveKudosForm from './GiveKudosForm'
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from '@mui/material'
import { format } from 'date-fns'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [kudos, setKudos] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        const usersList = await getUsers()
        setUsers(usersList)

        const receivedKudos = await getReceivedKudos()
        setKudos(receivedKudos)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  const handleGiveKudos = async (receiverId, message) => {
    try {
      await giveKudos(receiverId, message)
      const receivedKudos = await getReceivedKudos()
      setKudos(receivedKudos)
      setShowForm(false)
      setUser((prevUser) => ({
        ...prevUser,
        kudos_remaining: prevUser.kudos_remaining - 1,
      }))
    } catch (err) {
      console.error('Error giving kudos:', err)
    }
  }

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'MMMM d, yyyy h:mm a')
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h4' gutterBottom>
          Welcome, {user?.first_name}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Organization: {user?.organization_name}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Kudos remaining: {user?.kudos_remaining}
        </Typography>

        <Button
          variant='contained'
          onClick={() => setShowForm(true)}
          disabled={user?.kudos_remaining === 0} // Disable if no kudos remaining
          sx={{ mt: 2 }}
        >
          Give Kudos
        </Button>

        {showForm && (
          <GiveKudosForm
            users={users}
            onSubmit={handleGiveKudos}
            onClose={() => setShowForm(false)}
          />
        )}

        <Box sx={{ mt: 4 }}>
          <Typography variant='h5' gutterBottom>
            Kudos Received
          </Typography>
          {kudos.map((kudo) => (
            <Card key={kudo.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant='h6'>
                  {kudo.sender.first_name} {kudo.sender.last_name} says:
                </Typography>
                <Typography variant='body1'>{kudo.message}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mt: 1,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 'small', mr: 0.5 }} />
                  <Typography variant='caption' color='textSecondary'>
                    {formatTimestamp(kudo.created_at)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default Dashboard
