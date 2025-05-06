import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
function CalendarPage()
{

  return (
    <div className="calendar-content">
        { /*테스트용 진행도바*/ }
        <div style={{width:"90%", marginTop:"20px"}}>
          <p>성취율</p>
          <ProgressBar now={80} label={`${80}%`} /> {/*성취율 값 넣기 (now,lable)*/}
        </div>
    </div>
  );
}

export default CalendarPage
