import { useState, useEffect, forwardRef } from 'react'
import { Share, SelectedPortfolio } from '../../models/models'
import { 
  Card, 
  CardHeader, 
  CardActions, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
} from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Delete } from '@mui/icons-material';
import PortfolioRow from './PortfolioRow'
import moment from 'moment';
import NumberFormat from 'react-number-format';

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
  const [gain, setGain] = useState(0)
  const [message, setMessage] = useState<any>()

  const getPortfolioShares = () => {
    fetch(`/portfolio/shares/${selectedPortfolio.Id}`)
    .then(response => response.json())
    .then(portShares => {
      setPortfolioShares(portShares)
    })
  }

  useEffect(() => {
    getPortfolioShares()
  }, [selectedPortfolio])



  function createData(
    Id:number, 
    Ticker:string, 
    Name:string, 
    AquiredDate:String,
    Qty:number,
    CostPrice:number,
    Cost:number,
    CurrentPrice:number,
    CurrentValue:number,
    Gain:number, 
    Edit:boolean
    ) 
    {
    return { Id, Ticker, Name, AquiredDate, Qty, CostPrice, Cost, CurrentPrice, CurrentValue, Gain, Edit };
  }

  const refreshTableRows = () => {
    let shareData = [...portfolioShares]
    let rows = shareData.map((data) => {
      if (data.AquiredDate.length > 10) {
        data.AquiredDate = moment(data.AquiredDate).format('DD-MM-YYYY')
      }
     return createData(
        data.Id,
        data.Ticker,
        data.Name,
        data.AquiredDate,
        data.Qty,
        data.CostPrice,
        data.Cost,
        data.CurrentPrice,
        data.CurrentValue,
        data.Gain,
        false
      )
    })
    setTableData(rows)
    let totalGain = 0
    shareData.map((share) => {
      totalGain += Number(share.Gain)
    })
    setGain(totalGain)
  }

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  }


  useEffect(() => {
    refreshTableRows()
  }, [portfolioShares])

  const addBuy = async (PortfolioId:number,ShareId:number, date: string, amount:number) => {
    const res = await fetch('/portfolio/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ portfolioId: PortfolioId, shareId: ShareId, date:date, amount:amount })
    })
    const newBuy = await res.json()
    let responseData = (Object(newBuy))
    setMessage(responseData.message)
    getPortfolioShares()
    cancelAddRow()
    setTimeout(() => setMessage(''), 4000)
  }

  const submitBuy = (company:string, date: Date|null, amount:number) => {
    let simpledate = moment(date).format("MM/DD/YYYY")
    let ticker = company.split(' ')[0] 
    let share = shares.filter((share) => share.Ticker === ticker)
    addBuy(Number(selectedPortfolio.Id),share[0].Id!,simpledate!,amount)
  }

  const addRow = () => {
    setAdd(true)
    let newRow = createData(0,'','','',0,0,0,0,0,0,true)
    let updatedRows = [...tableData, newRow]
    setTableData(updatedRows)
  }

  const cancelAddRow = () => {
    setAdd(false)
    refreshTableRows()
  }

  const deleteShare = async (PortfolioShareId:number) => {
    const res = await fetch(`/portfolio/shares/${PortfolioShareId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const deletedShare = await res.json()
    .then(()=>getPortfolioShares())
  }
  
  return (
    <Card elevation={3} className='Portfolio'>
      <CardHeader 
      title={selectedPortfolio.Name} 
      action={
        <IconButton onClick={()=> deletePortfolio(selectedPortfolio.Id)}>
          <Delete />
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
            <TableCell>Purchase Date</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Cost Price</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Gain/Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <PortfolioRow row={row} shares={shares} deleteShare={deleteShare} submitBuy={submitBuy}/>
          ))}
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}} align='right' colSpan={8}>Total Gain/Loss</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}><NumberFormat value={gain} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true}/></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      <CardActions>
      {!add && <Button onClick={()=>addRow()}>Add</Button>}
      {add && <Button onClick={()=>cancelAddRow()}>Cancel</Button>}
      </CardActions>
      {message && <Snackbar sx={{mt: 6}}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>}

    </Card>
  )
}

export default Portfolio