import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
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
    const todayStr = today.toISOString().split('T')[0]; // yyyy-mm-dd 형식

    console.log(todayStr)

    for(var i = 0; i< planData.length; i++){
      console.log(planData[i]);

      const { startDay, finalDay } = planData[i];

      // 날짜를 Date 객체로 변환
      const start = new Date(startDay);
      const end = new Date(finalDay);

      // 오늘이 시작~끝 날짜 사이에 포함되는지 확인
      if (today >= start && today <= end) {
        console.log(`오늘은 계획 ${i + 1}번 범위 안에 있음`);
        console.log(planData[i]);

        setTodayPlan(planData[i].planList); // 수정: planList에 접근해야 함

        console.log(planData[i].planList); // 수정: planList에 접근

        setPlanDay(true);

      }
    }
    
  }, [planData]);


  return (
    <>
        
        <div className="task-list">
          
      </div>

      {/* 해야할 일 */}
      <div className="task-list">
        {planDay ? ()=>{
          setPlanDay(true);
          setTodayPlan(true); } : <p>계획이 없습니다</p>}

        {
          todayPlan.map((item, i) =>{
            return (
              <div key={i}>
                <h1>작심삼일 {i+1}일 째</h1>
                {item}
              </div>
            );
          })
        }
      </div>


    </>
  )
}

export default MainPage
