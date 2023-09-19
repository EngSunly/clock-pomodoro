import React from 'react'


const Break = (
    { breakLength,
        decrementBreakLength,
        incrementBreakLength }) => {




    const breakLengthInMinutes = breakLength / 60;
    return (
        <div>
            <p id="break-label">Break</p>
            <div id="break-length">{breakLengthInMinutes}</div>
            <button id="break-decrement" onClick={decrementBreakLength}>-</button>
            <button id="break-increment" onClick={incrementBreakLength}>+</button>
        </div>
    )
}

export default Break