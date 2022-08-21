import { useState, useEffect } from 'react'
import Search from './Search'
import SharesList from './SharesList';
import { Share, Shares } from '../models/models'

interface SearchListProps {
  mode: string
  setTicker: (input: string) => void
}

const SearchList = ({ mode, setTicker }: SearchListProps) => {
  const [currentMode, setCurrentMode] = useState(mode)
  const [shares, setShares] = useState<Share[]>([])
  const [filteredShares, setFilteredShares] = useState<Share[]>([])

  useEffect(() => {
    fetch('http://127.0.0.1:4999/shares')
    .then(response => response.json())
    .then(shares => {setShares(shares)})  
  }, [])

  useEffect(() => {
    let trimmedShares = shares.slice(0,20)
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
    let trimmedFilteredShares = filteredShares.slice(0,20)
    setFilteredShares(trimmedFilteredShares)
  }

  return (
    <div className="SearchList">
      <Search filterShares = {filterShares} />
      {shares && <SharesList mode={mode} shares={filteredShares} setTicker={setTicker}/>}
    </div>
  )
}

export default SearchList