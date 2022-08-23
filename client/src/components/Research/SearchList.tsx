import { useState, useEffect } from 'react'
import Search from './Search'
import SharesList from './SharesList'
import { Share, Shares } from '../../models/models'
import { Paper } from '@mui/material'

interface SearchListProps {
  setTicker: (input: string) => void
  shares: Share[]
}

const SearchList = ({ setTicker, shares }: SearchListProps) => {
  const [filteredShares, setFilteredShares] = useState<Share[]>([])

  useEffect(() => {
    let trimmedShares = shares.slice(0,10)
    setFilteredShares(trimmedShares)
  }, [shares])

  const filterShares = (input: string) => {
    let shareList = shares
    let filteredShares = shareList.filter((share) => {
      return (
      share.Ticker?.toLowerCase().includes(input.toLowerCase()) 
      || 
      share.Name?.toLowerCase().includes(input.toLowerCase())
      )
    })
    let trimmedFilteredShares = filteredShares.slice(0,10)
    setFilteredShares(trimmedFilteredShares)
  }

  return (
    <Paper sx={{p:3}} elevation={3} className="SearchList">
      <Search filterShares = {filterShares} />
      {shares && <SharesList shares={filteredShares} setTicker={setTicker}/>}
    </Paper>
  )
}

export default SearchList