import { useState, useEffect } from 'react'
import { Share } from '../../models/models'
import { FormControl, TableRow, TableCell, TextField, Autocomplete, InputAdornment, IconButton, Button } from '@mui/material'
import { AttachMoney, Edit, Delete } from '@mui/icons-material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';

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
    <TableCell>{row.CostPrice}</TableCell>
    <TableCell>{row.Cost}</TableCell>
    <TableCell>{row.CurrentPrice}</TableCell>
    <TableCell>{row.CurrentValue}</TableCell>
    <TableCell>{row.Gain}</TableCell>
    <TableCell>
      <IconButton>
        <Delete onClick={()=>deleteShare(row.Id)}/>
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
      <TableCell>
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
      <TableCell>    
        <TextField
          id="Amount"
          label="Amount"
  
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