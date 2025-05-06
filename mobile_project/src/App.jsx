import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

{ /* 컴포넌트 import */ }
import MainPage from './route/mainpage/MainPage.jsx';
import CalendarPage from './route/calendar/CalendarPage.jsx'
import PlanPage from './route/planpage/PlanPage.jsx'


function App() {

  return (
    <>
      {/* 라우터 분리 */}
      <Routes>
        <Route path="/" element={ <MainPage/> } />
        <Route path="/calender" element={ <CalendarPage/> } />
        <Route path="/addplan" element={ <PlanPage/> } />
      </Routes>


      {/* 하단 네비게이션 바 */}
      <div className="custom-navbar">
        <Link to="/">
          <div>
            <img src='/main.png' style={{width:"50px"}} />
          </div>
        </Link>

        <Link to="/calender">
          <div>
            <img src='/calendar.png' style={{width:"40px"}} />
          </div>
        </Link>

        <Link to="/addplan">
          <div>
            <img src='/pencil2.png' style={{width:"50px"}} />
          </div>
        </Link>
      </div>
    </>
  )
}

export default App
