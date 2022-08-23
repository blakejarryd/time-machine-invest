import { FC, useState, useEffect } from 'react'
import { Share, Shares } from '../../models/models'
import { Link } from "react-router-dom";
import { Divider, List, ListItem, ListItemText, Chip} from '@mui/material'

interface ShareListProps {
  shares: Share[]
  setTicker: React.Dispatch<React.SetStateAction<any>>
}

const SharesList= ({ shares, setTicker}: ShareListProps) => {
  let shareList = shares.map((share) => {
      return (
        <ListItem sx={{pl:0}} button onClick={()=>setTicker(share.Ticker)}>
          <Chip sx={{mr:2}} label={share.Ticker} />
          <ListItemText primary={share.Name} />
        </ListItem>
      )
    })
  
  return (
    <>
      <List component="nav" aria-label="mailbox folders">
      {shareList}
      </List>
    </>
  )
}


export default SharesList