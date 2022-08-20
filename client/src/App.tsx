import { FC, useState, useEffect } from 'react'
import { Routes, Route, Link} from "react-router-dom";
import './App.css';
import SharesList from './components/SharesList';
import ShareDetails from './components/ShareDetails';
import Search from './components/Search'
import { Share, Shares } from './models/models'
 
const App = () => {
  const [shares, setShares] = useState<Share[]>([])
  const [filteredShares, setFilteredShares] = useState<Share[]>([])

  useEffect(() => {
    fetch('http://127.0.0.1:4999/shares')
    .then(response => response.json())
    .then(shares => {setShares(shares)})  
  }, [])

  const filterShares = (input: string) => {
    console.log(input)
    let shareList = shares
    let filteredShares = shareList.filter((share) => {
      return share.Ticker?.includes(input)
    })
    console.log(filteredShares)
    // let shortenedList = shareList.slice(0,10)
    setFilteredShares(filteredShares)
  }


  return (
    <div className="App">
      <Routes>
      <Route path="/" element = {
        <>
          <Search filterShares = {filterShares} />
          {shares && <SharesList {...filteredShares}/>}
        </>
      } />
      <Route path="/:ticker" element = {<ShareDetails />} />
      </Routes>
    </div>
  );
}
export default App;
