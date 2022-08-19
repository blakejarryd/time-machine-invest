import { FC, useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header';
 
interface Share {
  Employees: number;
  Id: number;
  Name: string;
  Sector: string;
  Summary: string;
  Ticker: string
}

const App: FC = () => {
  const [shares, setShares] = useState<Share[]>([])

  useEffect(() => {
    fetch('http://127.0.0.1:4999/shares')
    .then(response => response.json())
    .then(shares => setShares(shares))  
  }, [])

  return (
    <div className="App">
      {shares && <Header shares={shares}/>}
    </div>
  );
}
export default App;
