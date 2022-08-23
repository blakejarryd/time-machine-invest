import { useState, useEffect } from 'react'
import { Share, Shares, SelectedPortfolio } from '../../models/models'
import { 
  Card, 
  CardHeader, 
  CardActions, 
  CardContent, 
  Typography, 
  Divider, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material'
import { Delete } from '@mui/icons-material';
import PortfolioRow from './PortfolioRow'
import moment from 'moment';

interface PortfolioProps {
  shares: Share[]
  setTicker: (input: string) => void
  selectedPortfolio: SelectedPortfolio
  deletePortfolio: (id:any) => void
}

const Portfolio = ({ shares, setTicker, selectedPortfolio, deletePortfolio }: PortfolioProps) => {
  const [portfolioShares, setPortfolioShares] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [add, setAdd] = useState(false)

  useEffect(() => {
    fetch(`http://127.0.0.1:4999/portfolio/shares/${selectedPortfolio.Id}`)
    .then(response => response.json())
    .then(portShares => {
      setPortfolioShares(portShares)
      console.log(portShares)
    })
  }, [selectedPortfolio])

  function createData(Id:number, Ticker:string, Name:string, AquiredDate: String,Qty: number,Cost: number,Value: number,Gain: number, Edit:boolean) {
    return { Id, Ticker, Name, AquiredDate, Qty, Cost, Value, Gain, Edit };
  }

  const refreshTableRows = () => {
    let shareData = [...portfolioShares]
    let rows = shareData.map((data) => {
      data.AquiredDate = new Date(data.AquiredDate).toLocaleDateString()
     return createData(
        data.Id,
        data.Ticker,
        data.Name,
        data.AquiredDate,
        data.Qty,
        data.Cost,
        data.Cost,
        0,
        false
      )
    })
    setTableData(rows)
  }

  useEffect(() => {
    refreshTableRows()
  }, [portfolioShares])

  const addBuy = async (PortfolioId:number,ShareId:number, date: string, amount:number) => {
    const res = await fetch('http://127.0.0.1:4999/portfolio/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ portfolioId: PortfolioId, shareId: ShareId, date:date, amount:amount })
    })
  }

  const submitBuy = (company:string, date: Date|null, amount:number) => {
    let simpledate = moment(date).format("MM/DD/YYYY")
    let ticker = company.split(' ')[0] 
    let share = shares.filter((share) => share.Ticker === ticker)
    addBuy(Number(selectedPortfolio.Id),share[0].Id!,simpledate!,amount)
  }

  const addRow = () => {
    setAdd(true)
    let newRow = createData(0,'','','',0,0,0,0,true)
    let updatedRows = [...tableData, newRow]
    setTableData(updatedRows)
  }

  const cancelAddRow = () => {
    setAdd(false)
    refreshTableRows()
  }

  const deleteShare = async (PortfolioShareId:number) => {
    const res = await fetch(`http://127.0.0.1:4999/portfolio/shares/${PortfolioShareId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let updatedTableData = [...tableData]
    updatedTableData = updatedTableData.filter((row) => {
      return row.Id != PortfolioShareId
    })
    setTableData(updatedTableData)
  }
  
  return (
    <Card elevation={3} className='Portfolio'>
      <CardHeader 
      title={selectedPortfolio.Name} 
      action={
        <IconButton>
          <Delete onClick={()=> deletePortfolio(selectedPortfolio.Id)}/>
        </IconButton>
      }
      >
      </CardHeader>
      <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>AquiredDate</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Gain/Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <PortfolioRow row={row} shares={shares} deleteShare={deleteShare} submitBuy={submitBuy}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <CardActions>
      {!add && <Button onClick={()=>addRow()}>Add</Button>}
      {add && <Button onClick={()=>cancelAddRow()}>Cancel</Button>}
      </CardActions>
    </Card>
  )
}

export default Portfolio