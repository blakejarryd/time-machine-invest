import { useState } from 'react'
import { Share } from '../../models/models'
import { TableRow, TableCell, TextField, Autocomplete, InputAdornment, IconButton, Button } from '@mui/material'
import { AttachMoney, Edit, Delete } from '@mui/icons-material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import NumberFormat from 'react-number-format';

interface TableRowProps {
  row: {
    Id: number
    Ticker:string,
    Name:string,
    AquiredDate:string,
    Qty:number,
    CostPrice:number,
    Cost:number,
    CurrentPrice:number
    CurrentValue:number,
    Gain:number,
    Edit:boolean
  }
  shares: Share[]
  deleteShare: (id:number) => void
  submitBuy: (company:string, date:Date|null, amount:number) => void
}


const PortfolioRow = ({ row, shares, deleteShare, submitBuy }:TableRowProps) => {
  const [edit, setEdit] = useState(row.Edit)
  const [company, setCompany] = useState('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [amount, setAmount] = useState(0)

  if (!edit) {
  return (
    <TableRow
    key={row.Ticker}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell>{row.Ticker}</TableCell>
    <TableCell>{row.Name}</TableCell>
    <TableCell>{row.AquiredDate}</TableCell>
    <TableCell>{row.Qty}</TableCell>
    <TableCell><NumberFormat value={row.CostPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true}/></TableCell>
    <TableCell><NumberFormat value={row.Cost} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true}/></TableCell>
    <TableCell><NumberFormat value={row.CurrentPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true}/></TableCell>
    <TableCell><NumberFormat value={row.CurrentValue} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true}/></TableCell>
    <TableCell><NumberFormat value={row.Gain} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true}/></TableCell>
    <TableCell>
      <IconButton onClick={()=>deleteShare(row.Id)}>
        <Delete />
      </IconButton>
    </TableCell>
  </TableRow>
  )
  } else {
    return (
      <TableRow
      key={row.Ticker}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell colSpan={2}>
        <Autocomplete
          inputValue={company}
          onInputChange={(event, newCompany) => {
            setCompany(newCompany);
          }}
          disablePortal
          id="Company"
          options={shares.map((share) => share.Ticker + ' ' + share.Name)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Company" />}
        />
      </TableCell>
      <TableCell colSpan={3}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Purchase Date"
            inputFormat="DD/MM/yyyy"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </TableCell>
      <TableCell colSpan={2}>    
        <TextField
          id="Amount"
          label="Investment Amount"
          value={amount}
          onChange={(event) => {setAmount(Number(event.target.value))}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell>
        <Button onClick={()=> submitBuy(company, date, amount)}>Submit</Button>
      </TableCell>
    </TableRow>
    )
  }
}

// 

export default PortfolioRow