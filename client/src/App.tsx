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
 
const App = () => {
  const [selectedComany, setTicker] = useState('CBA')
  
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
          <SearchList setTicker={setTicker}/>
          <CompanyDetails ticker={selectedComany}/>
        </>
      } />
      <Route path="/portfolio" element = {
        <>
          <Nav />
          <SearchList setTicker={setTicker}/>
          <CompanyDetails ticker={selectedComany}/>
        </>
      } />
      </Routes>
    </div>
  );
}
export default App;
