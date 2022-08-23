import { useState, useEffect } from 'react'
import { Share } from '../../models/models'
import { TableRow, TableCell, TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material'
import { AttachMoney, Edit, Delete } from '@mui/icons-material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';

interface TableRowProps {
  row: {
    Ticker:string,
    Name:string,
    AquiredDate:string,
    Qty: number,
    Cost: number,
    Value: number,
    Gain: number,
    Edit: boolean
  }
  shares: Share[]
}

const PortfolioRow = ({ row, shares }:TableRowProps) => {
  const [value, setValue] = useState<Date | null>(new Date('2014-08-18T21:11:54'))
  const [edit, setEdit] = useState(row.Edit)

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

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
    <TableCell>{row.Cost}</TableCell>
    <TableCell>{row.Value}</TableCell>
    <TableCell>{row.Gain}</TableCell>
    <TableCell>
      <IconButton>
        <Edit />
      </IconButton>
      <IconButton>
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
          disablePortal
          id="combo-box-demo"
          options={shares.map((share) => share.Ticker + ' ' + share.Name)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Company" />}
        />
      </TableCell>
      <TableCell>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Purchase Date"
            inputFormat="dd/MM/yyyy"
            value='01/01/2022'
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </TableCell>
      <TableCell>    
        <TextField
          id="Amount"
          label="Amount"
          type="number"
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
    </TableRow>
    )
  }
}

// 

export default PortfolioRow