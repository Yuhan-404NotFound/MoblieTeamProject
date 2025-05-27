import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion';


function SetPlanRoutePage()
{
  const pastelColors = [
    '#FFDAC1', '#E2F0CB', '#B5EAD7',
    '#C7CEEA', '#FFB7B2', '#FF9AA2',
    '#D5AAFF', '#A2E1DB', '#FFFFD1',
  ];
  
  const [planData, setPlanData] = useState([]); // 초기값을 빈 배열로 설정

  const [startDay, setStartDay] = useState('');   // 시작 날짜
  const [finalDay, setFinalDay] = useState('');   // 마지막 날짜 (시작날짜로부터 + 3)
  const [inputPlan, setInputPlan] = useState('');  // 입력창에 쓸 임시 계획
  const [planList, setPlanList] = useState([]);   // 플랜 항목 목록
  const [clear, setClear] = useState([false, false, false]); // 각 날의 완료 여부

  // 현재 로컬스토리지에 저장된 플랜 배열 가져와서 Set
  useEffect(() => {
  const savedPlanData = JSON.parse(localStorage.getItem('PlanData'));
    if (savedPlanData && Array.isArray(savedPlanData)) {
        setPlanData(savedPlanData);
    }
    }, []);

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
    setInputPlan('');             // 입력창 비우기
  }

  // 계획 저장 함수
  function savePlan() {

    // 저장할 계획 객체 생성
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


  return (
    <motion.div
        key="set"
        initial={{ opacity: 0, x: -50 }}      // 왼쪽에서 등장
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}          // 오른쪽으로 퇴장
        transition={{ duration: 0.3 }}
        className='PlanRouteStyle'>

        {/* 상단 문구*/}
        <div style={{ textAlign: "center", fontWeight: "bold", color:'black'}}>
            <h1>작심삼일</h1>
            <hr/>
        </div>
        
        {/* 추가한 플랜 리스트 */}
        <div className='getLine3 setPlanRouteList' >
        <ul>
  {planList.map((item, i) => {
    const className = `pastel-${i % 9}`; // 0 ~ 8까지 반복
    return (
      <li key={i} className={className}>
        {item}
      </li>
    );
  })}
</ul>
        </div>
        


        {/* 게획 생성 UI*/}
        <div>
            {/* 날짜 입력 UI */}
            <div style={{display:"flex", marginTop:"15px"}}>
                <input type="date" value={startDay} onChange={(e) => setStartDay(e.target.value)} 
                    className='dateInputStyle'/>

                { /* 시작날짜가 지정되었을때만 finalDay 표시*/ }
                 {startDay && <span className="dateDisplay">~ {finalDay}</span>}
            </div>
        
            
            <div style={{marginTop:"5px"}}>
                 <input type="text" className='input-dark' value={inputPlan} onChange={(e) => setInputPlan(e.target.value)}/>
                 <button onClick={()=>{addPlanItem()}} className='setPlanRoutebutton'>추가</button>
            </div>
           
            
            <div>
               <button onClick={()=>{ savePlan(); }} className='setPlanRouteSavebutton'>저장하기</button>
            </div>
            
        </div>
        
     
    </motion.div>

  )
}

export default SetPlanRoutePage
