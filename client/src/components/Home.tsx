import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
  <Container className='home'>
    <Card>
      <CardHeader title='The investment tool that reveals the power of time'>
      </CardHeader>
      <Divider></Divider>
      <CardContent className='homecard'>
        <div className='research'>
          <h3>RESEARCH</h3>
          <ul>
            <li>Search the ASX300</li>
            <li>View company information</li>
            <li>View full share price history</li>
          </ul>
          <Link to='/research'>
            <Typography sx={{m:4}}>Go to Portfolios</Typography>
          </Link>
        </div>
        <div className='portfolios'>
          <h3>PORTFOLIOS</h3>
          <ul>
            <li>Create portfolios linked to your account</li>
            <li>Add historic simulated share investments</li>
            <li>See how much you could have made</li>
          </ul>
          <Link to='/portfolio'>
            <Typography sx={{m:4}}>Go to Portfolios</Typography>
          </Link>
        </div>
      </CardContent>
    </Card>
  </Container>
  )
}

export default Home