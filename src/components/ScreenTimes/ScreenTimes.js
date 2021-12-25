import React from 'react';
import './ScreenTimes.css';

const ScreenTimes = () => {
    return (
        <div className="screen__times">
            <ol >
                <ScreenTime time="1:30" occupied={false}/>
                <ScreenTime time="2:30" occupied={false}/>
                <ScreenTime time="3:30" occupied={false}/>
                <ScreenTime time="4:30" occupied={false}/>
                <ScreenTime time="5:30" occupied={true}/>
            </ol>
        </div>
    )
}

const ScreenTime = (props) => {
    return (
        <li className="list__item">
            <a className={`${'action'} ${props.occupied ? 'occupied' : 'showtime'} `} >{props.time}pm</a>
        </li>
    )
}

export default ScreenTimes;
