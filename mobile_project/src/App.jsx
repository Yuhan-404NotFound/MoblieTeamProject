import { useState, useEffect } from 'react'
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

  const location = useLocation();
  const navigate = useNavigate();

  // 모바일 환경에서 상단스크롤 새로고침 방지
  useEffect(() => {
    const preventPullToRefresh = (e) => {
      if (window.scrollY === 0) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);

  // 네비바 애니메이션 로직 처리 함수
  function handleNavClick(path) {
    // 이미 현재 페이지인 경우 다른 애니메이션 적용
    if (location.pathname === path) {
      setPartialHide(true);
      setTimeout(() => { setPartialHide(false); }, 250);
      return; 
    }

    // 다른 페이지 클릭 시 기존 네비바 애니메이션 유지
    setNavVisible(false);
    setTimeout(() => { setNavVisible(true); }, 500);

    navigate(path); // 해당 경로의 컴포넌트로 이동
   }

  return (
    <div className='fullscreen no-drag'>

      {/* 컴포넌트 분리 */}
      <div className="page-container" style={{ height: "calc(100% - 70px)"}}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"         element={<MainPage />} />
            <Route path="/calender" element={<CalendarPage />} />
            <Route path="/addplan"  element={<PlanPage />} />
          </Routes>
        </AnimatePresence>
      </div>


      {/* 하단 네비게이션 바 */}
      <div className={`custom-navbar ${navVisible ? '' : 'hidden'} ${partialHide ? 'partial-hide' : ''}`}>
        {/* 메인 컴포넌트 */}
        <div onClick={() => handleNavClick('/')}>
          <img src="/main.png" style={{ width: '50px' }} />
        </div>

        {/* 달력 컴포넌트 */}
        <div onClick={() => handleNavClick('/calender')}>
          <img src="/calendar.png" style={{ width: '40px' }} />
        </div>

        {/* 플랜 컴포넌트 */}
        <div onClick={() => handleNavClick('/addplan')}>
          <img src="/pencil2.png" style={{ width: '50px' }} />
        </div>
      </div>

    </div>
  )
}

export default App
