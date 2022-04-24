/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import '../CSS/App.css';
import '../CSS/Leaderboard.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function Leaderboard() {
  const navigate = useNavigate();
  const values = [];
  const keys = Object.keys(localStorage);
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'username') {
      values.push({ key: keys[i], value: localStorage.getItem(keys[i]) });
    }
  }

  function compare(a, b) {
    return a.value - b.value;
  }
  values.sort(compare);
  values.reverse();
  // k = 3, so display the top 3
  const userArray = values.slice(0, 3);
  function handleClick() {
    navigate(-1);
  }
  return (
    <>
      {' '}
      <Navbar />
      <div className="leaderboard">
        <h1> Leaderboard</h1>
        <div className="leaderboard-container">
          <ol className="leaderboard-list">
            {userArray.map((userObject) => (
              <li>
                {' '}
                <span className="lst-user">
                  {' '}
                  {userObject.key.split(':')[0]}
                  {' '}
                </span>
                {' '}
                <span className="lst-score">
                  {(userObject.value / 10) * 100}
                  {' '}
                  %
                </span>
              </li>
            ))}
          </ol>
        </div>
        <button type="submit" style={{ background: '#A3FE94' }} onClick={handleClick}> &lt;&lt; Go back </button>
      </div>
    </>
  );
}

export default Leaderboard;
