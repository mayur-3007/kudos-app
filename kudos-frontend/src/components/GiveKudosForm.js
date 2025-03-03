import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'

const GiveKudosForm = ({ users, onSubmit, onClose }) => {
  const [receiverId, setReceiverId] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(receiverId, message)
  }

  return (
    <Box sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant='h6' gutterBottom>
        Give Kudos
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='normal'>
          <InputLabel>To</InputLabel>
          <Select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
          >
            <MenuItem value=''>Select a user</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='Message'
          fullWidth
          margin='normal'
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type='submit' variant='contained' sx={{ mt: 2, mr: 2 }}>
          Send Kudos
        </Button>
        <Button type='button' onClick={onClose} sx={{ mt: 2 }}>
          Cancel
        </Button>
      </form>
    </Box>
  )
}

export default GiveKudosForm
