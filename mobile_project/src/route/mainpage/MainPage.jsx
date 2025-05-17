import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import './MainPage.css'
import { ProgressBar } from 'react-bootstrap';


function MainPage()
{
  const [planData, setPlanData] = useState([]);   // 로컬 스토리지 담을 State
  const [todayPlan, setTodayPlan] = useState([]); // 오늘의 계획
  const [planDay, setPlanDay] = useState(false);  // 오늘 계획 있는지 여부


  // 저장된 계획 불러오기
  useEffect(() => {
    // 로컬 스토리지 PlanData JSON으로 파싱
    const savedPlanData = JSON.parse(localStorage.getItem('PlanData'));

    // 배열 구조인지 체킹 if문 (Iteral 방지)
    if (savedPlanData && Array.isArray(savedPlanData)) {
      setPlanData(savedPlanData);
    } else {
      setPlanData([]); 
    }
  }, []);


  // 상태가 변경된 후 planData에 접근
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시/분/초 제거

    // 오늘에 해당하는 3일 플랜 찾기기
    for (let i = 0; i < planData.length; i++) {
      const { startDay, finalDay, planList } = planData[i];

      // '2025-05-11' → Date 변환 (한국 시간 기준 안전하게 처리 위함함)
      const [sy, sm, sd] = startDay.split('-');
      const [ey, em, ed] = finalDay.split('-');

      const start = new Date(Number(sy), Number(sm) - 1, Number(sd));
      const end = new Date(Number(ey), Number(em) - 1, Number(ed));

      // 비교를 위해 start, end도 시간 제거
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      // 시작날짜 ~ 끝날짜 포함 여부부
      if (today >= start && today <= end) {
        setTodayPlan(planList);  // 오늘 포함된 일정만 저장
        setPlanDay(true);
        break; // 첫 번째 매치 후 종료
      }
    }
  }, [planData]);


  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}>

      {/* 상단 작심삼일 몇일차인지*/}
      <div className="task-list ">
          <h1>작심삼일 N일 째</h1>
      </div>

      {/* 해야할 일 */}
      <div className="task-list">
        {planDay ? <p>오늘의 작심삼일</p> : <p>계획 없음</p>}

        {
          todayPlan.map((item, i) =>{
            return (
              <div key={i}>
                {item}
              </div>
            );
          })
        }
      </div>


    </motion.div>
  )
}

export default MainPage
