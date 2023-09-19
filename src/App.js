import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Break from './components/break';
import Session from './components/session';
import Timeleft from './components/timeleft';
import beep from './Beep.wav';


function App() {
  const audioRef = useRef(null);
  const [sessionLength, setSessionLength] = useState(60 * 25)
  const [breakLength, setBreakLength] = useState(300)

  let [currentSessionType, setCurrentSessionType] = useState('Session'); // "Session" or "Break" 
  const [timeLeft, setTimeLeft] = useState(sessionLength)
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength])

  useEffect(() => {
    // time left is less than 0
    // audio play
    if (timeLeft === 0) {
      
      audioRef.current.play();
      //wait 8 seconds
      setTimeout(() => {
        if (currentSessionType === "Session") {
          setCurrentSessionType("Break");
          setTimeLeft(breakLength);
        }
        else if (currentSessionType === "Break") {
          setCurrentSessionType("Session");
          setTimeLeft(sessionLength);
        }
      }, 8000);


      

    }
  }, [timeLeft, breakLength, sessionLength, currentSessionType]);

  const decrementSessionLength = () => {
    const newsessionLength = sessionLength - 60
    if (newsessionLength > 0) {
      setSessionLength(newsessionLength);
    }

  }

  const incrementSessionLength = () => {
    const newsessionLength = sessionLength + 60
    if (newsessionLength <= 60 * 60) {
      setSessionLength(newsessionLength);
    }
  }


  const decrementBreakLength = () => {
    const newbreakLength = breakLength - 60
    if (newbreakLength > 0) {
      setBreakLength(newbreakLength);
    }

  }

  const incrementBreakLength = () => {
    const newbreakLength = breakLength + 60
    if (newbreakLength <= 60 * 60) {
      setBreakLength(newbreakLength);
    }
  }


  const handleResetButtonClick = () => {
    audioRef.current.load();
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSessionType("Session");
    setSessionLength(60 * 25);
    setBreakLength(60 * 5);
    setTimeLeft(60 * 25);

  }




  // personal note this line is evaluated everytime component is rerender so
  // it is actually not constant
  const isStarted = intervalId !== null;

  // create a ref to sessiontype


  const handleStartStopClick = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);

    }
    else {
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return newTimeLeft;
          }
        }
        )
      }, 1000);
      setIntervalId(newIntervalId);
    }

  }



  return (
    <div className="App">
      <div className='grid'>

        <Break
          breakLength={breakLength}
          decrementBreakLength={decrementBreakLength}
          incrementBreakLength={incrementBreakLength}
        />
        <Session
          sessionLength={sessionLength}
          decrementSessionLength={decrementSessionLength}
          incrementSessionLength={incrementSessionLength}
        />
      </div>
      <Timeleft
        timerLabel={currentSessionType}
        handleStartStopClick={handleStartStopClick}
        starStopButtonLabel={isStarted ? "Stop" : "Start"}
        timeLeft={timeLeft}
      />
      <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      <audio id="beep" ref={audioRef} src={beep} type="audio/wav" />


    </div>
  );
}

export default App;
