import React from 'react';
import './ScreenTimes.css';

const ScreenTimes = () => {
    return (
        <div className="screen__times">
            <ol >
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <li className="list__item">
                    <a className="action showtime" >1:45pm <span>3D</span></a>
                </li>
                <ScreenTime time="2:30" occupied={true}/>
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
