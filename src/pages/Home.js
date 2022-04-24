/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import '../CSS/App.css';
import '../CSS/Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function Home() {
  const [user, setUser] = useState('');
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  function handleChange(event) {
    setUser(event.target.value);
  }
  function handleSubmit() {
    const regEx = /^[0-9a-zA-Z]+$/;
    if (user.match(regEx)) { // Submit username and proceed to next page
      /* insert query */
      setInvalid(false);
      navigate('question', { state: { username: user } });
    } else { // Display error alert
      setInvalid(true);
    }
  }
  useEffect(() => {
    localStorage.setItem('username', user);
  });
  return (
    <>
      <Navbar name={null} />
      <div className="home">
        <h1> Guess that Celebrity </h1>
        <p id="game-desc">
          {' '}
          Do you REALLY think you know celebrities that well?
          You&apos;re up to a challenge? Guess the following people and
          click the write answer. Start by typing your name, then
          click start
          {' '}
        </p>
        {invalid && (
        <p className="alert"> Invalid Username</p>
        )}
        <div className="enter-name">
          <p> Enter a Username: </p>
          <input type="text" value={user} onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleSubmit}> Start Quiz &gt; &gt; </button>
      </div>
    </>
  );
}

export default Home;
