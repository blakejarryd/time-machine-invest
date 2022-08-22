import { useState, useEffect } from 'react'
import { TextField,  Card, CardHeader, CardContent, CardActions, Button, Typography, Divider, ListItem, ListItemText} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';

interface PortfolioListProps {
  userId: number
  setSelectedPortfolio: React.Dispatch<React.SetStateAction<any>>
}

const PortfolioList = ({ userId, setSelectedPortfolio }:PortfolioListProps) => {
  const [addNew, setAddNew] = useState(false)
  const [addNewInput, setAddNewInput] = useState('')
  const [portfolios, setPortfolios] = useState([])


  useEffect(() => {
    fetch(`http://127.0.0.1:4999/portfolio/${userId}`)
    .then(response => response.json())
    .then(portfolios => {setPortfolios(portfolios)})  
  }, [])


  let portfolioList = [...portfolios]
  let portfolioListItems = portfolioList.map((portfolio) => {
    console.log(portfolio)
    return (
      <ListItem button sx={{pl:0}} onClick={()=>setSelectedPortfolio(portfolio['Id'])}>
        <ListItemText primary={portfolio['Name']} />
      </ListItem>
    )
  })
  
  const showInput = () => {
    setAddNew(true)
  }

  const cancelAdd = () => {
    setAddNew(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewInput(event.target.value)
  }

  const addPortfolio = async (portfolioName:string) => {
    cancelAdd()
    const res = await fetch('http://127.0.0.1:4999/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserId: 1, Name: portfolioName})
    })
  }

  return (
    <Card sx={{p:3}} elevation={3} className = "PortfolioList">
      <CardHeader 
        title='My Portfolios'
        >
      </CardHeader>
      <CardContent>
        {portfolioListItems}
      </CardContent>
      <CardActions>
        {!addNew && <Button onClick={()=>showInput()}>Create a portfolio</Button>}
        {addNew && <TextField onChange={handleChange} fullWidth={true} placeholder={'portfolio name'}/>}
      </CardActions>
      <CardActions>
        {addNew && <Button onClick={()=>addPortfolio(addNewInput)}>Save</Button>}
        {addNew && <Button onClick={()=>cancelAdd()} color={'secondary'}>Cancel</Button>}
      </CardActions>
    </Card>
  )
}

export default PortfolioList