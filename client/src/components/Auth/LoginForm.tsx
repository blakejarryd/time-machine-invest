import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, TextField,  Card, CardHeader, CardContent, CardActions, Button, Typography, Divider, ListItem, ListItemText} from '@mui/material'
import { Container } from '@mui/system'

interface LoginProps {
  handleSubmit: (whichForm:string) => void
}

//{ handleSubmit }:LoginProps

const LoginForm = () => {
  const initialState = { username: '', password: '' }
  const [fields, setFields] = useState(initialState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    })
  }

  const submit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    // handleSubmit(fields)
    setFields(initialState)
  }

  return (
    <Container maxWidth = 'sm' sx={{marginTop: 4}}>
      <Card>
        <CardHeader 
          title='Login'
          >
        </CardHeader>
        <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            id="login-username"
            label="username"
            value={fields.username}
            onChange={handleChange}
          ></TextField>
          <TextField 
            sx={{marginTop: 3}}
            id="login-password"
            label="password"
            type="password"
            value={fields.password}
            onChange={handleChange}
          ></TextField>
          <Button variant="contained" sx={{width: 100, marginTop: 3}}>Login</Button>
          <Typography sx={{marginTop: 3}}>Dont have an account yet?</Typography>
          <Typography sx={{marginTop: 3}}><Link to='/register'>Register</Link></Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginForm