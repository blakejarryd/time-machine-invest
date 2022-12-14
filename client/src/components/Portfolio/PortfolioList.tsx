import { useState } from 'react'
import { TextField,  Card, CardHeader, CardContent, CardActions, Button, ListItem, ListItemText} from '@mui/material'
import { PortfolioInterface, SelectedPortfolio } from '../../models/models'


interface PortfolioListProps {
  setSelectedPortfolio: React.Dispatch<React.SetStateAction<any>> 
  setPortfolios: React.Dispatch<React.SetStateAction<any>>
  portfolios:PortfolioInterface[]
  userId:number
}


const PortfolioList = ({ setSelectedPortfolio, portfolios, setPortfolios, userId }:PortfolioListProps) => {
  const [addNew, setAddNew] = useState(false)
  const [addNewInput, setAddNewInput] = useState('')

  const setPortfolio = (portfolio:SelectedPortfolio) => {
    let selectedPortfolio = {
      Id: portfolio.Id,
      Name: portfolio.Name
    }
    setSelectedPortfolio(selectedPortfolio)
  }

  let portfolioList = [...portfolios]
  let portfolioListItems = portfolioList.map((portfolio) => {
    return (
      <ListItem button sx={{pl:0}} onClick={()=>setPortfolio(portfolio)}>
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
    const res = await fetch('/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserId: userId, Name: portfolioName})
    })
    const newPortfolio = await res.json()
    let updatedPortfolios = [...portfolios, newPortfolio[0]]
    setPortfolios(updatedPortfolios)
    setSelectedPortfolio(newPortfolio[0])
  }

  return (
    <Card sx={{p:1}} elevation={3} className = "PortfolioList">
      <CardHeader 
        title='Portfolios'
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