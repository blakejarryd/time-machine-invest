import { FC, useState, useEffect } from 'react'
import { Share } from '../models/share'
import { Link } from "react-router-dom";

// interface Props {
//   shares: Share[]
// }

const TopShares: FC= () => {
  const [shares, setShares] = useState<Share[]>([])

  useEffect(() => {
    fetch('http://127.0.0.1:4999/shares')
    .then(response => response.json())
    .then(shares => setShares(shares))  
  }, [])

  let shareList = shares.map((share) => {
    return (
      <Link to={`/${share.Ticker}`} >
        <p>{share.Ticker} {share.Name}</p>
      </Link>
    )
  })

  return (
    <>
      <h1>Invest App</h1>
      {shareList}
    </>
  )
}

export default TopShares