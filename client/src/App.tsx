import { FC, useState, useEffect } from 'react'
import { Routes, Route, Link} from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Search from './components/Search'
import SharesList from './components/SharesList';
import CompanyDetails from './components/CompanyDetails';
import { Share, Shares } from './models/models'
import SearchList from './components/SearchList';
import PortfolioList from './components/PortfolioList';
import Portfolio from './components/Portfolio';
 
const App = () => {
  const [selectedComany, setTicker] = useState('CBA')

  const addPortfolio = async () => {
    const res = await fetch('http://127.0.0.1:4999/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserId: 1, Name: "New Portfolio"})
    })
  }

  // const addBuy = async () => {
  //   const res = await fetch('http://127.0.0.1:4999/portfolio/buy'
  //     method:
  // }
  
  return (
    <div className="App">
      <Routes>
      <Route path="/" element = { 
        <>
          <Nav />
          <Home />
        </>
      } />
      <Route path="/research" element = {
        <>
          <Nav />
          <SearchList mode={'research'} setTicker={setTicker}/>
          <CompanyDetails ticker={selectedComany}/>
        </>
      } />
      <Route path="/portfolio" element = {
        <>
          <Nav />
          <PortfolioList addPortfolio={addPortfolio}/>
          <Portfolio mode={'portfolio'} setTicker={setTicker}/>
        </>
      } />
      </Routes>
    </div>
  );
}
export default App;
