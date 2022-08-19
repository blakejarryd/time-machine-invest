import { FC, useState, useEffect } from 'react'
import { Routes, Route, Link} from "react-router-dom";
import './App.css';
import TopShares from './components/TopShares';
import ShareDetails from './components/ShareDetails';
 
const App: FC = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element = {<TopShares />} />
      <Route path="/:ticker" element = {<ShareDetails />} />
      </Routes>
    </div>
  );
}
export default App;
