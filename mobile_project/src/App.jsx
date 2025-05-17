import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link, useLocation, useNavigate  } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import './App.css'

{ /* 컴포넌트 import */ }
import MainPage from './route/mainpage/MainPage.jsx';
import CalendarPage from './route/calendar/CalendarPage.jsx'
import PlanPage from './route/planpage/PlanPage.jsx'


function App() {
  const [navVisible, setNavVisible] = useState(true);
  const [partialHide, setPartialHide] = useState(false); 

  return (
    <div className='fullscreen no-drag'>

      
      {/* 라우터 애니메이션 적용 대상 AnimatePresence로 감싸기 */}
      <div className="page-container" style={{ height: "calc(100% - 70px)"}}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainPage />} />
            <Route path="/calender" element={<CalendarPage />} />
            <Route path="/addplan" element={<PlanPage />} />
          </Routes>
        </AnimatePresence>
      </div>

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

    </div>
  )
}

export default App
