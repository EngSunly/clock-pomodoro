import React from 'react'


const Session = (
    {   sessionLength,
        decrementSessionLength,
        incrementSessionLength }) => {

    const sessionLengthInMinutes = sessionLength / 60;
    return (
        <div>
            <p id="session-label">Session</p>
            <div id="session-length">{sessionLengthInMinutes}</div>
            <button id="session-decrement" onClick={decrementSessionLength}>-</button>
            <button id="session-increment" onClick={incrementSessionLength}>+</button>
        </div>
    )
}

export default Session