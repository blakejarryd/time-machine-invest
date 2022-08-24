import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='navbar'>
      <div className = 'left'>
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
      </div>
      <div className = 'right'>
        <Link to='/login'>
          <div className='navitem'>Login</div>
        </Link>
      </div>
    </nav>
  )
}


export default Nav