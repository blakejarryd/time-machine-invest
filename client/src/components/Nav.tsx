import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/research">
            Research
          </NavLink>
        </li>
        <li>
          <NavLink to="/portfolio">
            Portfolio
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav