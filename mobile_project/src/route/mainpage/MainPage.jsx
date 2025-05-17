import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MainPage.css';
import { ProgressBar } from 'react-bootstrap';

function MainPage() {
  const [planData, setPlanData] = useState([]);             // 전체 계획 목록
  const [todayPlan, setTodayPlan] = useState([]);           // 오늘 해당되는 플랜 리스트
  const [planDay, setPlanDay] = useState(false);            // 오늘 계획이 있는지 여부
  const [dayCount, setDayCount] = useState(null);           // 작심삼일 며칠째
  const [todayPlanList, setTodayPlanList] = useState([]);   // 오늘의 미완료 리스트
  const [todayPlanComplete, setTodayPlanComplete] = useState([]); // 오늘의 완료 리스트

  // 최초 로드 시 PlanData 로드
  useEffect(() => {
    const savedPlanData = JSON.parse(localStorage.getItem('PlanData'));
    if (savedPlanData && Array.isArray(savedPlanData)) {
      setPlanData(savedPlanData);
    } else {
      setPlanData([]);
    }
  }, []);

  // PlanData가 세팅된 후 오늘 해당되는 플랜 탐색
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < planData.length; i++) {
      const { startDay, finalDay, planList } = planData[i];

      const [sy, sm, sd] = startDay.split('-');
      const [ey, em, ed] = finalDay.split('-');

      const start = new Date(Number(sy), Number(sm) - 1, Number(sd));
      const end   = new Date(Number(ey), Number(em) - 1, Number(ed));
      
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      if (today >= start && today <= end) {
        setTodayPlan(planList);
        setPlanDay(true);

        const diffTime = today.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setDayCount(diffDays);

        const todayStr = today.toISOString().split('T')[0];
        const lastSavedDate = localStorage.getItem('lastSavedDate');

        if (lastSavedDate !== todayStr) {
          localStorage.setItem('todayPlanData', JSON.stringify(planList));
          localStorage.setItem('todayCompletedPlan', JSON.stringify([]));
          localStorage.setItem('lastSavedDate', todayStr);

          setTodayPlanList(planList);
          setTodayPlanComplete([]);
        } else {
          const savedPlanData = JSON.parse(localStorage.getItem('todayPlanData'))      || [];
          const savedComplete = JSON.parse(localStorage.getItem('todayCompletedPlan')) || [];

          setTodayPlanList(savedPlanData);
          setTodayPlanComplete(savedComplete);
        }

        break;
      }
    }
  }, [planData]);

  // 완료 버튼 눌렀을 때
  function checkComplete(i) {
    const newTodayPlanList = [...todayPlanList];
    const completedItem = newTodayPlanList.splice(i, 1)[0];

    localStorage.setItem('todayPlanData', JSON.stringify(newTodayPlanList));
    setTodayPlanList(newTodayPlanList);

    setTodayPlanComplete((prev) => [...prev, completedItem]);
  }

  // 완료된 항목이 유효할 때만 저장
  useEffect(() => {
    if (Array.isArray(todayPlanComplete) && todayPlanComplete.length > 0) {
      const validItems = todayPlanComplete.filter(item => item !== null);
      localStorage.setItem('todayCompletedPlan', JSON.stringify(validItems));
    }
  }, [todayPlanComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className="MainPageComponentSize"
    >
      {/* 상단 작심삼일 몇일차인지 */}
      <div className="task-list">
        {planDay && dayCount ? (
          <h1>작심삼일 {dayCount}일 째</h1>
        ) : (
          <h1>오늘은 계획이 없음</h1>
        )}
      </div>

      {/* 오늘의 계획 UI */}
      <div className="task-list todayPlan">
        <p>오늘의 완료 항목</p>
        {Array.isArray(todayPlanComplete) && todayPlanComplete.length > 0 ? (
          todayPlanComplete.map((item, i) => (
            <div key={i}>- {item}</div>
          ))
        ) : (
          <p style={{ color: '#888' }}>아직 완료한 항목이 없습니다.</p>
        )}

        <hr />

        {planDay ? <p>오늘의 작심삼일</p> : <p>계획 없음</p>}

        { Array.isArray(todayPlanList) && todayPlanList.length > 0 ? (
          todayPlanList.map((item, i) => (
            <div key={i}>
              - {item}{' '}
              <button onClick={() => checkComplete(i)}>완료</button>
            </div>
          ))
        ) : (
          <p style={{ color: '#888' }}>할 일이 없습니다.</p>
        )}
      </div>
    </motion.div>
  );
}

export default MainPage;
