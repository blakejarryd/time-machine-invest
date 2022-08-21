interface PortfolioListProps {
  addPortfolio: Function
}

const PortfolioList = ({addPortfolio}: PortfolioListProps) => {
  return (
    <div className = "PortfolioList">
      <h1>Portfolio List</h1>
      <button onClick={()=>addPortfolio()}>Add</button>
    </div>
  )
}

export default PortfolioList