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
import ResponsiveAppBar from './components/Nav';
import Grid2 from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container'
 
const App = () => {
  const [selectedComany, setTicker] = useState('CBA')
  const [selectedPortfolio, setSelectedPortfolio] = useState([0, 'None Selected'])

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
                <SearchList mode={'research'} setTicker={setTicker}/>
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
              <Grid2 xs={12} md={3}>
                <PortfolioList userId={1} setSelectedPortfolio={setSelectedPortfolio}/>
              </Grid2>
              <Grid2 xs={12} md={9}>
                <Portfolio mode={'portfolio'} setTicker={setTicker} selectedPortfolio={selectedPortfolio}/>
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
