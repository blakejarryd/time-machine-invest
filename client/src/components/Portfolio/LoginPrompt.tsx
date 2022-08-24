import { TextField,  Card, CardHeader, CardContent, CardActions, Button, Typography, Divider, ListItem, ListItemText} from '@mui/material'
import { Link } from 'react-router-dom'

const LoginPrompt = () => {
  return (
    <Card sx={{p:1}} elevation={3} className = "PortfolioList">
      <CardHeader 
        title='Login Required'
        >
      </CardHeader>
      <CardContent>
        <Typography>To access the portfolio functionality you need to be logged in.</Typography>
        <Link to="/login"><Typography sx={{marginTop: 1}}>Login</Typography></Link>
        <Link to="/register"><Typography sx={{marginTop: 1}}>Register</Typography></Link>
      </CardContent>
    </Card>
  )
}

export default LoginPrompt