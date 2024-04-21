import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetNote_time, setDeniedNotifications, toggle_modal } from '../features/weatherSlice';
import styled from 'styled-components';
import { getNotifications } from '../features/selectors/selectors';

export default function SetNotTimeModal() {
    const dispatch = useDispatch();
    const [turn, setTurn] = useState(1); // Use state to manage the value of Turn
    const [time,setTime]=useState(0.0)
    const AskIsNotification = (
        <div>
            <h1>Would you like to be reminded about daily weather?</h1>
            <button onClick={() => setTurn(2)}>yes</button> {/* Use setTurn to update Turn */}
            <button onClick={() => dispatch(setDeniedNotifications())}>no</button>
        </div>
    );

    const TakeInput = (
        <div>
            <input type='number'  placeholder="format: 18.00" onChange={(e) =>setTime(e.target.value)} />
            <button onClick={()=>{ 
                dispatch(SetNote_time(time))
            }}>save</button>
        </div>
    );

    return (
        <div>
            {turn === 1 ? AskIsNotification : TakeInput}
        </div>
    );
}
