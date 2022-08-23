import { FC, useState, useEffect } from 'react'
import { Routes, Route, Link} from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Search from './components/Research/Search'
import SharesList from './components/Research/SharesList';
import CompanyDetails from './components/Research/CompanyDetails';
import { Share, Shares, PortfolioInterface, SelectedPortfolio } from './models/models'
import SearchList from './components/Research/SearchList';
import PortfolioList from './components/Portfolio/PortfolioList';
import Portfolio from './components/Portfolio/Portfolio';
import ResponsiveAppBar from './components/Nav';
import Grid2 from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container'
 
const App = () => {
  const [shares, setShares] = useState<Share[]>([])
  const [selectedComany, setTicker] = useState('CBA')
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([])
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>()


  useEffect(() => {
    fetch('http://127.0.0.1:4999/shares')
    .then(response => response.json())
    .then(shares => {setShares(shares)})  
  }, [])

  useEffect(() => {
    fetch(`http://127.0.0.1:4999/portfolio/1`)
    .then(response => response.json())
    .then(portfolios => {setPortfolios(portfolios)})  
  }, [])

  const deletePortfolio = async (id:number) => {
    const res = await fetch(`http://127.0.0.1:4999/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const deletedPortfolio = await res.json()
    let updatedPortfolios = [...portfolios]
    updatedPortfolios = updatedPortfolios.filter((portfolio) => {
      return portfolio.Id != id
    })
    setPortfolios(updatedPortfolios)
    setSelectedPortfolio(false)
  }

  return (
    <div className="App">
      <Routes>
      <Route path="/" element = { 
        <>
          <ResponsiveAppBar />
          <Home />
        </>
      } />
      <Route path="/research" element = {
        <>
          <ResponsiveAppBar />
          <Container maxWidth='xl' >
            <Grid2 container spacing={2}>
              <Grid2 xs={12} md={4}>
                <SearchList setTicker={setTicker} shares={shares}/>
              </Grid2>
              <Grid2 xs={12} md={8}>
              <CompanyDetails ticker={selectedComany}/>
              </Grid2>
            </Grid2>
          </Container>
        </>
      } />
      <Route path="/portfolio" element = {
        <>
          <ResponsiveAppBar />
          <Container maxWidth='xl' >
            <Grid2 container spacing={0}>
              <Grid2 xs={12} lg={2}>
                <PortfolioList setSelectedPortfolio={setSelectedPortfolio} portfolios={portfolios} setPortfolios={setPortfolios}/>
              </Grid2>
              <Grid2 xs={12} lg={10}>
                {selectedPortfolio && <Portfolio shares={shares} setTicker={setTicker} selectedPortfolio={selectedPortfolio} deletePortfolio={deletePortfolio}/>}
              </Grid2>
            </Grid2>
          </Container>
        </>
      } />
      </Routes>
    </div>
  );
}
export default App;
