/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import './Navbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar(props) {
  const { name } = props;
  return (
    <ul className="navbar-ul">
      <li className="navbar-li"><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Guess the Celebrity</Link></li>
      <li className="navbar-li" style={{ float: 'right' }}>{name}</li>
    </ul>
  );
}
export default Navbar;

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
};
