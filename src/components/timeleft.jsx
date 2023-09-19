import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
const Timeleft = ({
    timerLabel,
    handleStartStopClick,
    timeLeft,
    starStopButtonLabel
}) => {
    
    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false })


    return (
        <div>
            <p id="timer-label">{timerLabel}</p>
            <p id='time-left'>
                {formattedTimeLeft}
            </p>
            <button id='start_stop' onClick={handleStartStopClick}>{starStopButtonLabel}</button>
        </div>
    )
}

export default Timeleft; 
