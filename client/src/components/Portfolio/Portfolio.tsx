import { useState, useEffect } from 'react'
import { Share, Shares } from '../../models/models'
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
  TableRow
} from '@mui/material'
import PortfolioRow from './PortfolioRow'

interface PortfolioProps {
  shares: Share[]
  setTicker: (input: string) => void
  selectedPortfolio: (number|string)[]
}

const Portfolio = ({ shares, setTicker, selectedPortfolio }: PortfolioProps) => {
  const [portfolioShares, setPortfolioShares] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [add, setAdd] = useState(false)

  useEffect(() => {
    fetch(`http://127.0.0.1:4999/portfolio/shares/${selectedPortfolio[0]}`)
    .then(response => response.json())
    .then(portShares => {
      setPortfolioShares(portShares)
      console.log(portShares)
    })
  }, [selectedPortfolio])

  function createData(Ticker:string, Name:string, AquiredDate: String,Qty: number,Cost: number,Value: number,Gain: number, Edit:boolean) {
    return { Ticker, Name, AquiredDate, Qty, Cost, Value, Gain, Edit };
  }

  const refreshTableRows = () => {
    let shareData = [...portfolioShares]
    let rows = shareData.map((data) => {
      data.AquiredDate = new Date(data.AquiredDate).toLocaleDateString()
     return createData(
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

  const addBuy = async (PortfolioId:number, ShareId:number) => {
    const res = await fetch('http://127.0.0.1:4999/portfolio/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ PortfolioId: PortfolioId, ShareId: ShareId})
    })
  }

  const addRow = () => {
    setAdd(true)
    let newRow = createData('','','',0,0,0,0,true)
    let updatedRows = [...tableData, newRow]
    setTableData(updatedRows)
  }

  const cancelAddRow = () => {
    setAdd(false)
    refreshTableRows()
  }

  return (
    <Card elevation={3} className='Portfolio'>
      <CardHeader 
      title={selectedPortfolio[1]} 
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
            <PortfolioRow row={row} shares={shares}/>
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