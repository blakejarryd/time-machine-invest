import { FC, useState, useEffect } from 'react'
import { Share, Shares } from '../models/models'
import { Link } from "react-router-dom";

interface ShareListProps {
  shares: Share[]
  setTicker: React.Dispatch<React.SetStateAction<any>>
}

const SharesList= ({ shares, setTicker}: ShareListProps) => {
  console.log(typeof(setTicker))
  let shareList = shares.map((share) => {
    return (
      <div onClick={()=>setTicker(share.Ticker)} >
        <p>{share.Ticker} {share.Name}</p>
      </div>
    )
  })

  return (
    <>
      {shareList}
    </>
  )
}

export default SharesList