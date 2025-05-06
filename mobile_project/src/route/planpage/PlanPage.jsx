import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
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

  return (
    <>
        <h1>플랜 페이지</h1>
    </>
  )
}

export default PlanPage
