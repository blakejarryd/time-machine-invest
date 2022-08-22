import { FC, useState, useEffect } from 'react'
import { Share, Shares } from '../models/models'
import { Link } from "react-router-dom";
import { Divider, List, ListItem, ListItemText, Chip} from '@mui/material'

interface ShareListProps {
  mode: string
  shares: Share[]
  setTicker: React.Dispatch<React.SetStateAction<any>>
}

const SharesList= ({ mode, shares, setTicker}: ShareListProps) => {
  let shareList = shares.map((share) => {
    if (mode === 'research') {
      return (
        <ListItem sx={{pl:0}} button onClick={()=>setTicker(share.Ticker)}>
          <Chip sx={{mr:2}} label={share.Ticker} />
          <ListItemText primary={share.Name} />
        </ListItem>
      )
    } else {
      return (
        <ListItem sx={{pl:0}} button onClick={()=>setTicker(share.Ticker)}>
          <Chip sx={{mr:2}} label={share.Ticker} />
          <ListItemText primary={share.Name} />
        </ListItem>
      )
    }
  })
  if (mode != 'research') {
    shareList = shareList.slice(0,3)
  }
  
  return (
    <>
      <List component="nav" aria-label="mailbox folders">
      {shareList}
      </List>
    </>
  )
}

export default SharesList