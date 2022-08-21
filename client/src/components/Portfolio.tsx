import { useState, useEffect } from 'react'
import SearchList from './SearchList'

interface PortfolioProps {
  mode: string
  setTicker: (input: string) => void
}

const Portfolio = ({ mode, setTicker }: PortfolioProps) => {
  const [add, setAdd] = useState(false)
  return (
    <div className="Portfolio">
      <h1>Portfolio</h1>
      {!add && <button onClick={()=>setAdd(true)}>Add</button>}
      {add && < SearchList mode={'portfolio'} setTicker={setTicker} />}
      {add && <button onClick={()=>setAdd(false)}>Cancel</button>}
    </div>
  )
}

export default Portfolio