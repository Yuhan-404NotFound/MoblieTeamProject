import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion, px } from 'framer-motion';

import './PlanRoute.css'

function CheckPlanRoutePage()
{
  const [planData, setPlanData] = useState([]); // 초기값을 빈 배열로 설정
  const [todayCompletedPlan, setTodayCompletedPlan] = useState([]); // 초기값을 빈 배열로 설정
  const [todayPlanData, setTodayPlanData] = useState([]); // 초기값을 빈 배열로 설정
    
  // 저장된 계획 불러오기
  useEffect(() => {
    // 로컬 스토리지 PlanData JSON으로 파싱
    const savedPlanData = JSON.parse(localStorage.getItem('PlanData'));
    const savedTodayCompletedPlan = JSON.parse(localStorage.getItem('todayCompletedPlan'));
    const savedTodayPlanData = JSON.parse(localStorage.getItem('todayPlanData'));

    // 배열 구조인지 체킹 if문 (Iteral 방지)
    if (savedPlanData && Array.isArray(savedPlanData)) {
      setPlanData(savedPlanData);
      setTodayCompletedPlan(savedTodayCompletedPlan);
      setTodayPlanData(savedTodayPlanData);
    } else {
      setPlanData([]); 
    }
  }, []);

  // 저장된 계획 삭제 함수
  function deletePlan(indexToDelete) {
    const updatedPlanData = planData.filter((_, index) => index !== indexToDelete);
    setPlanData(updatedPlanData);

    localStorage.setItem('PlanData', JSON.stringify(updatedPlanData));
    localStorage.setItem('todayCompletedPlan', JSON.stringify(updatedPlanData));
    localStorage.setItem('todayPlanData', JSON.stringify(updatedPlanData));
  }

  return (
    <motion.div
        key="check"
        initial={{ opacity: 0, x: 50 }}       // 오른쪽에서 등장
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}         // 왼쪽으로 퇴장
        transition={{ duration: 0.3 }}
        className='PlanRouteStyle'>

        <div style={{textAlign:"center"}}>
            <h1>계획보는곳</h1>
        </div>
        
        
        <div className='planListSize'> 

            {planData.length ? 
            // 저장된 플랜이 있을 때
            <div style={{width:"100%"}}>
               
                {
                planData.map((planItem, index) => (
                    <div key={index} style={{marginBottom: "12px"/*width:"100%"*/}}>
                        <hr/>

                        {/* 계획 날짜, 삭제버튼*/}
                        <div className="planDateRow" >
                            <div>{planItem.startDay} ~ {planItem.finalDay}</div>

                            <button onClick={() => { deletePlan(index); }} className='checkPlanRouteDeleteButton'>삭제</button>

                        </div>

                        {/* 게획 리스트 */}
                        <div>
                            <ul className="planItemList">
                            {
                                planItem.planList.map((item, i) => (<li key={i}>{i + 1}. {item}</li>))
                            }
                             </ul>
                        </div>
                            
                    </div>
                    ))
                }
               
            </div>
          : <p style={{marginTop: "80px"}}>저장된 계획이 없습니다.</p>
          }
        </div>
        
    </motion.div>

  )
}

export default CheckPlanRoutePage
