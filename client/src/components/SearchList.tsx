import { useState, useEffect } from 'react'
import Search from './Search'
import SharesList from './SharesList';
import { Share, Shares } from '../models/models'

interface SearchListProps {
  setTicker: (input: string) => void
}

const SearchList = ({ setTicker }: SearchListProps) => {
  const [shares, setShares] = useState<Share[]>([])
  const [filteredShares, setFilteredShares] = useState<Share[]>([])

  useEffect(() => {
    fetch('http://127.0.0.1:4999/shares')
    .then(response => response.json())
    .then(shares => {setShares(shares)})  
  }, [])

  useEffect(() => {
    setFilteredShares(shares)
  }, [shares])



  const filterShares = (input: string) => {
    console.log(input)
    let shareList = shares
    let filteredShares = shareList.filter((share) => {
      return (
      share.Ticker?.toLowerCase().includes(input.toLowerCase()) 
      || 
      share.Name?.toLowerCase().includes(input.toLowerCase())
      )
    })
    setFilteredShares(filteredShares)
  }

  return (
    <div className="SearchList">
      <Search filterShares = {filterShares} />
      {shares && <SharesList shares = {filteredShares} setTicker={setTicker}/>}
    </div>
  )
}

export default SearchList