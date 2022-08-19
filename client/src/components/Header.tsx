import { FC, useState, useEffect } from 'react'

interface Share {
  Employees: number;
  Id: number;
  Name: string;
  Sector: string;
  Summary: string;
  Ticker: string
}

interface Props {
  shares: Share[]
}

const Header: FC<Props> = ({ shares }) => {

  let shareList = shares.map((share) => {
    return (
      <p>{share.Ticker}</p>
    )
  })

  return (
    <>
      <h1>Invest App</h1>
      {shareList}
    </>
  )
}

export default Header