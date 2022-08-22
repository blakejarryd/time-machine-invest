import { useState, useEffect } from 'react'
import SearchList from './SearchList'
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

interface PortfolioProps {
  mode: string
  setTicker: (input: string) => void
  selectedPortfolio: number
}

const Portfolio = ({ mode, setTicker, selectedPortfolio }: PortfolioProps) => {
  const [add, setAdd] = useState(false)
  const [portfolioShares, setPortfolioShares] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://127.0.0.1:4999/portfolio/shares/${selectedPortfolio}`)
    .then(response => response.json())
    .then(portShares => {
      setPortfolioShares(portShares)
      console.log(portShares)
    })
  }, [selectedPortfolio])

  const addBuy = async (PortfolioId:number, ShareId:number) => {
    const res = await fetch('http://127.0.0.1:4999/portfolio/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ PortfolioId: PortfolioId, ShareId: ShareId})
    })
  }

  function createData(Ticker:string,AquiredDate: String,Qty: number,Cost: number,Value: number,Gain: number) {
    return { Ticker, AquiredDate, Qty, Cost, Value, Gain };
  }

  useEffect(() => {
    let shareData = [...portfolioShares]
    let rows = shareData.map((data) => {
     return createData(
        data.Ticker,
        data.AquiredDate,
        data.Qty,
        data.Cost,
        data.Cost,
        0
      )
    })
    setTableData(rows)
  }, [portfolioShares])

  return (
    <Card elevation={3} className='Portfolio'>
      <CardHeader 
      title={'Portfolio'} 
      >
      </CardHeader>
      <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>AquiredDate</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Gain/Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.Ticker}</TableCell>
              <TableCell>{row.AquiredDate}</TableCell>
              <TableCell>{row.Qty}</TableCell>
              <TableCell>{row.Cost}</TableCell>
              <TableCell>{row.Value}</TableCell>
              <TableCell>{row.Gain}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <CardActions>
      {!add && <Button onClick={()=>setAdd(true)}>Add</Button>}
      {add && < SearchList mode={'portfolio'} setTicker={setTicker} />}
      {add && <Button onClick={()=>setAdd(false)}>Cancel</Button>}
      </CardActions>
    </Card>
  )
}

export default Portfolio