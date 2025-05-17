import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import './PlanPage.css'

function PlanPage()
{
  const [planData, setPlanData] = useState([]);   // 초기값을 빈 배열로 설정
  const [startDay, setStartDay] = useState('');   // 시작 날짜
  const [finalDay, setFinalDay] = useState('');   // 마지막 날짜 (시작날짜로부터 + 3)
  const [inputPlan, setInputPlan] = useState(''); // 입력창에 쓸 임시 계획
  const [planList, setPlanList] = useState([]);   // 플랜 항목 목록
  const [clear, setClear] = useState([false, false, false]); // 각 날의 완료 여부

  // 시작 날짜(StartDay)가 변할 때마다 종료 날짜(finalDay)를 자동으로 계산
  useEffect(() => {
    // startDay State 값이 있을때만 실행
    if (startDay) {
      const date = new Date(startDay);                // date 객체 생성

      date.setDate(date.getDate() + 2);               // 시작일 포함 3일 후 = +2일
      const final = date.toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 

      setFinalDay(date.toISOString().split('T')[0]);  // finalDay State Set 
    } else {
      setFinalDay('');
    }
  }, [startDay]);

  
  // 계획 항목 추가 함수
  function addPlanItem() {
    if (inputPlan.trim() === '') { return; } // 빈 입력값은 무시

    // 새로운 계획 항목을 추가
    const updatedPlanList = [...planList, inputPlan.trim()];
    setPlanList(updatedPlanList); // 업데이트된 계획 항목 목록 저장
    setInputPlan(''); // 입력창 비우기
  }

  // 계획 저장 함수
  function savePlan() {

    // 계획 객체 생성
    const newPlanData = {
      startDay: startDay,
      finalDay: finalDay,
      planList: planList,
      clear: clear,
    };

    // 새로운 계획을 planData 배열에 추가
    const updatedPlanData = [...planData, newPlanData];
    setPlanData(updatedPlanData);

    // 로컬스토리지에 저장
    localStorage.setItem('PlanData', JSON.stringify(updatedPlanData));
  }

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

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className='componentSize'>

      <div className ='task-list'>
        시작: <input type="date" value={startDay} onChange={(e) => setStartDay(e.target.value)} />

        {/* 시작날짜가 지정되었을때만 finalDay 표시 */}
        ~ {startDay ? finalDay : <p>YYYY-MM-DD</p>}
      </div>

      <div className ='task-list'>
        3일간 계획 
        <br/>
        
        <input type="text" value={inputPlan} onChange={(e) => setInputPlan(e.target.value)}/>
        <button onClick={()=>{addPlanItem()}}>추가</button>

        <ul>
          {planList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <button onClick={()=>{savePlan();}}>저장하기</button>

        {/*테스트용 제거 버튼*/}
        <button onClick={()=>{ localStorage.removeItem('PlanData'); }}> 로컬스토리지 제거</button>
      </div>

      <div className ='task-list'>
        <h3>저장된 계획</h3>
        {planData.length ? (
          <ul>
            {
              planData.map((planItem, index) => (
                <div key={index}>
                  {planItem.startDay} ~ {planItem.finalDay}
                  <br/>
                  ===계획 내용===
                  <ul>
                    {
                      planItem.planList.map((item, i) => (
                        <li key={i}> {i + 1}. {item}</li>
                      ))
                    }
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
              ))
            }
          </ul>
          ) : (
            <p>저장된 계획이 없습니다.</p>
          )}
      </div>


    </motion.div>
  )
}

export default PlanPage
