import { FC, useState, useEffect } from 'react'
import { Price } from '../models/models'
import { useParams } from "react-router-dom";

const SharePrices: FC = () => {
  const [prices, setShare] = useState<Price[]>([])

  let { ticker } =  useParams()

  const fetchPriceInfo: Function = () => {
    fetch(`http://127.0.0.1:4999/prices/${ticker}`)
    .then(response => response.json())
    .then(prices => setShare(prices)) 
  }
  
  useEffect(() => {
    fetchPriceInfo()
  }, [])

  let priceList = prices.map((p) => {
    return (
      <li>{p.Date}: {p.Price}</li>
    )
  })
 
  return (
    <>
      <p>prices</p>
      {priceList}
    </>
  )
}

export default SharePrices