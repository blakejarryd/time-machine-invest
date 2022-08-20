import { FC, useState, useEffect } from 'react'
import { Share } from '../models/models'
import { useParams } from "react-router-dom";
import SharePrices from './SharePrices';

const ShareDetails: FC = () => {
  const [share, setShare] = useState<Share>({})

  let { ticker } =  useParams()
  

  const fetchShareInfo: Function = () => {
    fetch(`http://127.0.0.1:4999/shares/${ticker}`)
    .then(response => response.json())
    .then(share => setShare(share[0]))  
  }

  useEffect(() => {
    fetchShareInfo()
  }, [])
 
  return (
    <>
      <h1>{share.Ticker}</h1>
      <p>{share.Summary}</p>
      <SharePrices />
    </>
  )
}

export default ShareDetails