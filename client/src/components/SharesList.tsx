import { FC, useState, useEffect } from 'react'
import { Share, Shares } from '../models/models'
import { Link } from "react-router-dom";



const SharesList= (props : Share[]) => {

  let shareList = Object.values(props).map((share) => {
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

export default SharesList