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

    const handleSelection = () => {
        props.setSelectedScreenTime(props.time);
    }

    return (
        <li className="list__item">
            <a className={`${'action'} ${props.occupied ? 'occupied' : 'showtime'} `} onClick={handleSelection} >{props.time}pm</a>
        </li>
    )
}

export default ScreenTimes;
