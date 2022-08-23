import { TableRow, TableCell, TextField } from '@mui/material'

interface TableRowProps {
  row: {
    Ticker:string,
    Name:string,
    AquiredDate:string,
    Qty: number,
    Cost: number,
    Value: number,
    Gain: number
  }
}

const PortfolioRow = ({ row }:TableRowProps) => {
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
  </TableRow>
  )
}

// 

export default PortfolioRow