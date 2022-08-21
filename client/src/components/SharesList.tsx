import { FC, useState, useEffect } from 'react'
import { Share, Shares } from '../models/models'
import { Link } from "react-router-dom";

interface ShareListProps {
  mode: string
  shares: Share[]
  setTicker: React.Dispatch<React.SetStateAction<any>>
}

const SharesList= ({ mode, shares, setTicker}: ShareListProps) => {

  let shareList = shares.map((share) => {
    if (mode == "research") {
      return (
        <div className="shareListItem" onClick={()=>setTicker(share.Ticker)} >
          <span>{share.Ticker} {share.Name}</span>
          <button>Details</button>
        </div>
      )
    } else {
      return (
        <div className="shareListItem" onClick={()=>setTicker(share.Ticker)} >
          <span>{share.Ticker} {share.Name}</span>
          <button>Add</button>
        </div>
      )
    }
  
  })

  return (
    <>
      {shareList}
    </>
  )
}

export default SharesList