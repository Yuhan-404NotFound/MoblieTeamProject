import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import './PlanRoute.css'

function CheckPlanRoutePage()
{
  const [planData, setPlanData] = useState([]); // 초기값을 빈 배열로 설정
    
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

  function deletePlan(indexToDelete) {
    const updatedPlanData = planData.filter((_, index) => index !== indexToDelete);
    setPlanData(updatedPlanData);

    localStorage.setItem('PlanData', JSON.stringify(updatedPlanData));
  }

  return (
    <motion.div
        key="check"
        initial={{ opacity: 0, x: 50 }}       // 오른쪽에서 등장
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}         // 왼쪽으로 퇴장
        transition={{ duration: 0.3 }}
        className='PlanRouteStyle'>
        <h1>계획보는곳</h1>
        {planData.length ? 
          <ul>
            {
              planData.map((planItem, index) => (
                <div key={index}>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>{planItem.startDay} ~ {planItem.finalDay}</div>
                    <button onClick={() => { deletePlan(index); }}>삭제</button>
                  </div>

                  <div>
                    ===계획 내용===
                    <ul>
                      {planItem.planList.map((item, i) => (
                        <li key={i}>{i + 1}. {item}</li>
                      ))}
                    </ul>

                    <p>
                      {
                        planItem.clear.map((item, idx) => (
                          <span key={idx}>
                            {idx + 1}일차: {item ? 'O ' : 'X '}
                          </span>
                        ))
                      }
                    </p>
                  </div>
                </div>
              ))
            }
          </ul>
          : <p>저장된 계획이 없습니다.</p>
          }
    </motion.div>

  )
}

export default CheckPlanRoutePage
