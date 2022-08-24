import { FC, useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Search from './components/Research/Search';
import SharesList from './components/Research/SharesList';
import CompanyDetails from './components/Research/CompanyDetails';
import { Share, Shares, PortfolioInterface, SelectedPortfolio } from './models/models';
import SearchList from './components/Research/SearchList';
import PortfolioList from './components/Portfolio/PortfolioList';
import Portfolio from './components/Portfolio/Portfolio';
import Grid2 from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container'
import LoginPrompt from './components/Portfolio/LoginPrompt';
 
const App = () => {
  const [user, setUser] = useState<any>(null)
  const [shares, setShares] = useState<Share[]>([])
  const [selectedComany, setTicker] = useState('CBA')
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([])
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>()

  let navigate=useNavigate()

/***********************************************************************
 * AUTH
 **********************************************************************/
  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch('/is-authenticated')
      const data = await res.json()
      setUser(data.user)
    }
    if (!user) checkLoggedIn()
  }, [])


  const handleSubmit = async (whichForm:string, fields:any) => {
    console.log(fields)
    const res = await fetch(`/${whichForm}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields)
    })
    const data = await res.json()
    console.log(data)
    setUser(data.user)
    navigate('/portfolio')
  }


  const handleLogout = async () => {
    const res = await fetch('/logout', {
      method: 'POST'
    })
    const data = await res.json()
    if (data.success) setUser(null)
    navigate('/')
  }

/***********************************************************************
 Shares & Portfolios
 **********************************************************************/

  useEffect(() => {
    fetch('http://127.0.0.1:4999/shares')
    .then(response => response.json())
    .then(shares => {setShares(shares)})  
  }, [])

  useEffect(() => {
    if (!user) return
    fetch(`http://127.0.0.1:4999/portfolio/${user.Id}`)
    .then(response => response.json())
    .then(portfolios => {setPortfolios(portfolios)})  
  }, [user])

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
          <Nav user={user} handleLogout={handleLogout}/>
          <Home />
        </>
      } />
      <Route path="/login" element = { 
        <>
          <Nav user={user} handleLogout={handleLogout}/>
          <LoginForm handleSubmit={handleSubmit} />
        </>
      } />
      <Route path="/register" element = { 
        <>
          <Nav user={user} handleLogout={handleLogout}/>
          <RegisterForm handleSubmit={handleSubmit} />
        </>
      } />
      <Route path="/research" element = {
        <>
          <Nav user={user} handleLogout={handleLogout}/>
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
          <Nav user={user} handleLogout={handleLogout}/>
          {!user && 
          <Container maxWidth='md' >
            <LoginPrompt />
          </Container>}
          {user && 
          <Container maxWidth='xl' >
            <Grid2 container spacing={0}>
              <Grid2 xs={6} lg={2}>
                <PortfolioList setSelectedPortfolio={setSelectedPortfolio} portfolios={portfolios} setPortfolios={setPortfolios} userId={user.Id}/>
              </Grid2>
              <Grid2 xs={12} lg={10}>
                {selectedPortfolio && <Portfolio shares={shares} setTicker={setTicker} selectedPortfolio={selectedPortfolio} deletePortfolio={deletePortfolio}/>}
              </Grid2>
            </Grid2>
          </Container>}
        </>
      } />
      </Routes>
    </div>
  );
}
export default App;
