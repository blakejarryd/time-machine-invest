import { Link } from 'react-router-dom'
import logo from '../logo.png'

interface NavProps {
  user:any 
  handleLogout: () => void
}

const Nav = ({ user, handleLogout }:NavProps) => {

  return (
    <nav className='navbar'>
      <div className = 'left'>
        <img src={logo} />
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
      {!user &&
        <Link to='/login'>
          <div className='navitem'>Login</div>
        </Link>
      }
      {user &&
        <div onClick={()=> handleLogout()} className='navitem'>Logout</div>
      }
      </div>
    </nav>
  )
}


export default Nav