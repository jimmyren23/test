/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import '../CSS/App.css';
import '../CSS/Endgame.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function EndGame() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { newScore, name } = state;
  const username = localStorage.getItem('username');
  const key = `${username}:personal_best`;
  let bestScore = localStorage.getItem(key);
  if (newScore > bestScore) {
    bestScore = newScore;
  }
  function handleClickLeader() {
    navigate('/leaderboard');
  }
  function handleClickPlay() {
    navigate('/');
  }
  function handleClickDelete() {
    localStorage.removeItem(key);
    localStorage.removeItem('username');
    navigate('/');
  }
  localStorage.setItem(key, bestScore);
  return (
    <>
      <Navbar name={name} />
      <div className="endgame">
        <h2> Your Final Score</h2>
        <h1 style={{ fontSize: '64px' }}>
          {' '}
          {(newScore / 10) * 100}
          {' '}
          %
          {' '}
        </h1>
        <h2>
          {' '}
          Your Personal Best:
          {' '}
          {bestScore > newScore ? (bestScore / 10) * 100 : (newScore / 10) * 100}
          %
        </h2>
        <div className="endgame-buttons">
          <button type="submit" onClick={handleClickLeader}> Show Leaderboard </button>
          <button type="submit" style={{ background: '#A3FE94' }} onClick={handleClickPlay}> Play Again? </button>
          <button type="submit" style={{ background: ' #F56F6F' }} onClick={handleClickDelete}> Delete Account </button>
        </div>
      </div>
    </>
  );
}

export default EndGame;
