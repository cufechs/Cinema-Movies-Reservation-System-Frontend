import React, { useState } from 'react';
import './ScreenTimes.css';

const ScreenTimes = (props) => {

    return (
        <div className="screen__times">
            <ol >
                <ScreenTime time="1:30" occupied={false} setSelectedScreenTime={props.setSelectedTime}/>
                <ScreenTime time="2:30" occupied={false} setSelectedScreenTime={props.setSelectedTime}/>
                <ScreenTime time="3:30" occupied={false} setSelectedScreenTime={props.setSelectedTime}/>
                <ScreenTime time="4:30" occupied={false} setSelectedScreenTime={props.setSelectedTime}/>
                <ScreenTime time="5:30" occupied={true} setSelectedScreenTime={props.setSelectedTime}/>
            </ol>
        </div>
    )
}

const ScreenTime = (props) => {

    const [timeColorClass, setTimeColorClass] = useState(`${'action'} ${props.occupied ? 'occupied' : 'showtime'} `);
    const [lastClicked, setLastClicked] = useState(false);
    const [lastTimeSelected, setLastTimeSelected] = useState(false);
    const handleSelection = () => {
        if (!props.occupied) {
            setLastClicked(state => !state);
            props.setSelectedScreenTime(lastClicked ? '' : props.time);
            //setTimeColorClass(`${'action'} ${lastClicked ? 'showtime' : 'selected'} `);
        }
    }

    return (
        <li className="list__item">
            {/* <a className={`${'action'} ${props.occupied ? 'occupied' : 'showtime'} `} onClick={handleSelection} >{props.time}pm</a> */}
            <a className={timeColorClass} onClick={handleSelection} >{props.time}pm</a>
        </li>
    )
}

export default ScreenTimes;
