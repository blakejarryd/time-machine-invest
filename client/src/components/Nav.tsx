import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='navbar'>
      <img src='/logo/TM Invest2.png' />
      <Link to='/'>
        <div className='navitem'>Home</div>
      </Link>
      <Link to='/research'>
        <div className='navitem'>Research</div>
      </Link>
      <Link to='/portfolio'>
        <div className='navitem'>Portfolios</div>
      </Link>
    </nav>
  )
}


export default Nav