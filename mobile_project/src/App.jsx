import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

{/* 컴포넌트 import */}
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
      <nav className="navbar">
        <Link to="/">메인화면</Link>
        <Link to="/calender">캘린더임</Link>
        <Link to="/addplan">일정추가</Link>
      </nav>
    </>
  )
}

export default App
