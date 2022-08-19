import { FC, useState, useEffect } from 'react'
import { Share } from '../models/share'
import { useParams } from "react-router-dom";

const ShareDetails: FC= () => {
  const [share, setShare] = useState<Share>({})

  let { ticker } =  useParams()
  
  useEffect(() => {
    fetch(`http://127.0.0.1:4999/shares/${ticker}`)
    .then(response => response.json())
    .then(share => setShare(share[0]))  
  }, [])
 
  return (
    <>
      <h1>{share.Ticker}</h1>
      <p>{share.Summary}</p>
    </>
  )
}

export default ShareDetails