/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import '../CSS/App.css';
import '../CSS/Question.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../Navbar';
import questionList from '../assets/questions.json';

function Question() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { username } = state;
  const listQuestions = questionList;
  const [score, setScore] = useState(0);
  const [choice, setChoice] = useState();
  const [questCount, setQuestCount] = useState(1);
  const [question, setQuestion] = useState(listQuestions[Math.floor(Math.random() * 10)]);
  const [endgame, setEndgame] = useState(false);
  const [celebrityNameList, setCelebrityNameList] = useState();

  const correctChoice = useRef();

  function handleChoice(event) {
    setChoice(event.target.value);
  }

  /* Randomly order the names. Determine which one is the right choice. Set the list so that
  the component rerenders */

  function loadQuestion() {
    // list of options
    const list = [{ choice: '0', answer: question.correct_answer }, { choice: '1', answer: question.wrong_answer_1 }, { choice: '2', answer: question.wrong_answer_2 }, { choice: '3', answer: question.wrong_answer_3 }];

    // shuffles the random list
    const randomOrderedList = list.sort(() => Math.random() - 0.5);

    const celebrityNames = [];
    // Determines the choice.
    for (let i = 0; i < randomOrderedList.length; i += 1) {
      if (randomOrderedList[i].choice === '0') {
        correctChoice.current = i.toString();
      }
      celebrityNames.push(randomOrderedList[i].answer);
    }
    setCelebrityNameList(celebrityNames);
  }
  useEffect(() => {
    loadQuestion();
  }, [question]);

  useEffect(() => {
    if (questCount === 10 && endgame) {
      const key = `${username}:personal_best`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, score);
      }
      navigate('/endgame', { state: { newScore: score, name: username } });
    }
  }, [score, endgame]);

  function handleNext(event) {
    event.preventDefault();
    if (choice == null) {
      return;
    }
    if (choice !== correctChoice.current) {
      // Move onto next Question
      setScore(score);
    } else {
      setScore(score + 1);
    }
    if (questCount < 10) {
      setQuestCount(questCount + 1);
    } else {
      setEndgame(true);
    }
    setChoice();
    setQuestion(questionList[Math.floor(Math.random() * 10)]);
  }

  return (
    <>
      {' '}
      <Navbar name={username} />
      <div className="question">
        <h2>
          {' '}
          Correct Answers:
          {' '}
          {score}
          {' '}
          / 10
          {' '}
        </h2>
        <h1>
          {' '}
          Question
          {' '}
          {questCount}
          {' '}
        </h1>
        <img src={question.celeb_photo} alt="celebrity" style={{ height: '300px' }} />
        <div className="question-choice">
          <p> Please Choose 1 </p>
          <form readOnly>
            <label htmlFor="celebrity-1">
              <input className="celeb-input" id="celebrity-1" type="radio" value="0" checked={(choice === '0')} name="celebrity" onClick={handleChoice} />
              <span className="celeb-name">
                {celebrityNameList !== undefined && celebrityNameList[0]}
              </span>
            </label>
            <label htmlFor="celebrity-2">
              <input className="celeb-input" id="celebrity-2" type="radio" value="1" checked={(choice === '1')} name="celebrity" onClick={handleChoice} />
              <span className="celeb-name">
                {celebrityNameList !== undefined && celebrityNameList[1]}
              </span>
            </label>
            <label htmlFor="celebrity-3">
              <input className="celeb-input" id="celebrity-3" type="radio" value="2" checked={(choice === '2')} name="celebrity" onClick={handleChoice} />
              <span className="celeb-name">
                {celebrityNameList !== undefined && celebrityNameList[2]}
              </span>
            </label>
            <label htmlFor="celebrity-4">
              <input className="celeb-input" id="celebrity-4" type="radio" value="3" checked={(choice === '3')} name="celebrity" onClick={handleChoice} />
              <span className="celeb-name">
                {celebrityNameList !== undefined && celebrityNameList[3]}
              </span>
            </label>
            <button type="submit" onClick={handleNext}> Next &gt;&gt; </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Question;
