import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MainPage.css';
import { ProgressBar } from 'react-bootstrap';

function MainPage() {
  const [planData, setPlanData] = useState([]);                   // 전체 계획 목록
  const [todayPlan, setTodayPlan] = useState([]);                 // 오늘 해당되는 플랜 리스트
  const [planDay, setPlanDay] = useState(false);                  // 오늘 계획이 있는지 여부
  const [dayCount, setDayCount] = useState(null);                 // 작심삼일 며칠째
  const [todayPlanList, setTodayPlanList] = useState([]);         // 오늘의 미완료 리스트
  const [todayPlanComplete, setTodayPlanComplete] = useState([]); // 오늘의 완료 리스트

  // 최초 로드 시 PlanData 로드
  useEffect(() => {
    const savedPlanData = JSON.parse(localStorage.getItem('PlanData'));

    // 로컬스토리지에서 파싱한 데이터 유무, 배열 여부 검사
    if (savedPlanData && Array.isArray(savedPlanData)) {
      // Plan State Set
      setPlanData(savedPlanData);
    } else {
      // 검사에서 false시 빈 배열로로
      setPlanData([]);
    }
  }, []);

  // PlanData가 세팅된 후 오늘 해당되는 플랜 탐색
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 모든 플랜 데이터로 검사사
    for (let i = 0; i < planData.length; i++) {
      // planData 분해해
      const { startDay, finalDay, planList } = planData[i];

      // yyyy-mm-dd
      const [sy, sm, sd] = startDay.split('-');
      const [ey, em, ed] = finalDay.split('-');

      const start = new Date(Number(sy), Number(sm) - 1, Number(sd));
      const end   = new Date(Number(ey), Number(em) - 1, Number(ed));
      
      // 정확한 날짜 비교 위해 시간은 0
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      // 오늘 날짜가 계획 시작일과 끝날짜 사이에 포함될 떄
      if (today >= start && today <= end) {

        setTodayPlan(planList);   // 금일 플랜 State Set
        setPlanDay(true);         // 금일 계획여부 State Set

        // 오늘이 3일 계획 중 며칠 째인지 계산산
        const diffTime = today.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        setDayCount(diffDays);    // 며칠째인지 State Set

        // const todayStr = today.toISOString().split('T')[0];
        // 한국 기준 날짜 문자열로 변환 (YYYY-MM-DD) 이거 병합 됨
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const lastSavedDate = localStorage.getItem('lastSavedDate');

        // 마지막 저장 날짜와 오늘 날짜가 다를 경우 
        // 계획일에 포함되지만 하루가 지나 금일 계획을 갱신한다
        if (lastSavedDate !== todayStr) {
          localStorage.setItem('todayPlanData', JSON.stringify(planList));  // 로컬 스토리지에 금일 날짜 계획 Set
          localStorage.setItem('todayCompletedPlan', JSON.stringify([]));   // 완료된 계획 목록 빈 배열로 Set
          localStorage.setItem('lastSavedDate', todayStr);                  // 마지막 저장 날짜를 오늘로 Set

          setTodayPlanList(planList);   // 금일 계획 목록 State Set
          setTodayPlanComplete([]);     // 금일 계획 완료 목록 State Set

        } else {
          // 같을 경우 이미 위의 코드가 한번 실행된 것것
          const savedPlanData = JSON.parse(localStorage.getItem('todayPlanData'))      || [];   // 오늘 계획 목록 Get
          const savedComplete = JSON.parse(localStorage.getItem('todayCompletedPlan')) || [];   // 완료 목록 Get 

          setTodayPlanList(savedPlanData);        // 금일 완료 안된 계획 목록 State Set
          setTodayPlanComplete(savedComplete);    // 금일 완료된 계획 목록    State Set
        }
        break;
      }
    }
  }, [planData]);

  // 완료 버튼 눌렀을 때 동작
  function checkComplete(i) {

    // 오늘 계획리스트 State에서 해당 계획 목록 Slice 후 완료 목록 State Set
    const newTodayPlanList = [...todayPlanList];              
    const completedItem = newTodayPlanList.splice(i, 1)[0];

    // 로컬 스토리지에 완료 안된 항목들 Set
    localStorage.setItem('todayPlanData', JSON.stringify(newTodayPlanList));

    // State Set
    setTodayPlanList(newTodayPlanList);
    setTodayPlanComplete((prev) => [...prev, completedItem]);

    // 동작 X 코드 ==============================
    //setPlanData(updatedPlanData);
    
    // 로컬스토리지 update
    // PlanData에서 제거 후 업뎃뎃
    //localStorage.setItem('PlanData', JSON.stringify(updatedPlanData));
  }

  // 완료된 항목이 유효할 때만 저장
  useEffect(() => {
    // 배열 && 완료 항목이 0 이상일 때
    if (Array.isArray(todayPlanComplete) && todayPlanComplete.length > 0) {

      // 완료된 항목 추출출
      const validItems = todayPlanComplete.filter(item => item !== null);

      // 로컬스토리지에 완료 항목 Set
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
     <div className='divTest'>
      <div className='task-list'>
        <div className='section'>
        {
          planDay && dayCount ? (
            <h1>작심삼일 {dayCount}일 째</h1>
          ) : (
            <h1>오늘은 계획이 없음</h1>
          )
        }
      </div>

      {/* 오늘의 계획 UI */}
      <div className='todayPlan'>
        <p>✅ 오늘의 완료 항목</p>
        {
          Array.isArray(todayPlanComplete) && todayPlanComplete.length > 0 ? (
            todayPlanComplete.map((item, i) => (
              <div key={i} className='task-card' data-index={i}><span>🎉&nbsp;&nbsp;{item}</span></div>
            ))  
          ) : (
            <p className='empty'>아직 완료한 항목이 없습니다.</p>
          )
        }
      </div>

        
      <div className='section'>
        {planDay ? <p>💪 오늘의 작심삼일</p> : <p>계획 없음</p>}

        { 
          Array.isArray(todayPlanList) && todayPlanList.length > 0 ? (
            todayPlanList.map((item, i) => (
              <div key={i} className='task-card' data-index={i}>
                <span>📌&nbsp;&nbsp;{item}{' '}</span>
                <button className='complete-btn' onClick={() => checkComplete(i)}>완료</button>
              </div> ))
          ) : (
            <p className='empty'>할 일이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
    </motion.div>
  );
}

export default MainPage;
