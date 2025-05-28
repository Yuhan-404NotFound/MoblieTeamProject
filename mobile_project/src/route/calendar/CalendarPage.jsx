import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';

function calculateProgress(selectedPlan){ //
  if (!selectedPlan || !selectedPlan.clear) return 0; // 계획 없으면 0%
  const total = selectedPlan.clear.length;
  const completed = selectedPlan.clear.filter(item => item).length;
  return Math.round((completed / total) * 100);
}

// 로컬 날짜를 YYYY-MM-DD 문자열로 포맷하는 함수
// 날짜 비교나 로컬 스토리지 저장 시 일관된 형식을 유지하기 위함
function formatDateLocal(date) {
  const year = date.getFullYear();
  // padStart(2,'0') : 2자리 형식으로 맞춤
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function CalendarPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);         // 선택된 날짜의 계획 정보
  const [markedDates, setMarkedDates]   = useState([]);           // 표시할 날짜 목록
  const [percent, setPercent]           = useState(0);            // 성취률 퍼센트 State
  const [date, setDate]                 = useState(new Date());   // 현재 선택된 날짜
  
  
  

  // useEffect : 컴포넌트가 처음 렌더링될 때 한 번만 실행
  // 첫 렌더링: 모든 markedDates를 뽑음
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('PlanData')) || [];
     // 로컬 스토리지에서 'PlanData'를 불러옴
    const allMarkedDates = storedData.flatMap(plan => {
      const dates = [];
      const [year, month, day] = plan.startDay.split('-').map(Number);
      const start = new Date(year, month - 1, day);

      for (let i = 0; i < 3; i++) {  // start를 기준으로 3일 연속된된 날짜 생성
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(formatDateLocal(date)); // 로컬 포맷 사용
      }

      return dates; 
    });

    setMarkedDates(allMarkedDates);
  }, []);

  // 05-25 추가.
  // 선택된 날짜(date) 변경될 때마다, 해당 날짜에 맞는 계획 찾기
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('PlanData')) || []; 
    // 로컬 스토리지에서 'PlanData'를 불러옴
    const selectedDateStr = formatDateLocal(date);
    // 선택된 날짜를 변환
    const matchedPlan = storedData.find(plan => {
      const start = new Date(plan.startDay); //계획 시작 담아
      const end = new Date(plan.finalDay); //계획 마지막 담아
      const selected = new Date(selectedDateStr); // 변환된 날짜를 담아
      return selected >= start && selected <= end; // 선택 날짜 >= 시작과 선택날짜 <= 마지막 날짜 ex)5.26 >= 5.25 && 5.26 <= 5.27이 참이면 반환
    });
    if (matchedPlan){
      setSelectedPlan(matchedPlan);
    }
    else
    {
      setSelectedPlan(null);
    } 
  }, [date]);

  // 05-27 추가
  // 성취율 바 메인 페이지의 완료 개수에 따라 % 변경
  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('todayCompletedPlan')) || [];
    const remaining = JSON.parse(localStorage.getItem('todayPlanData')) || [];
    const total = completed.length + remaining.length;

    if (total > 0) {
      const progress = Math.round((completed.length / total) * 100);
      setPercent(progress);
    } else {
      setPercent(0);
    }
  }, []);

  
  return (
    <div className='calenderContainer'>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
        className="calendarComponentStyle">

        <Calendar
          onChange={setDate} // 날짜 클릭 시 date 상태 변경
          value={date} // 현재 선택된 날짜 달력에 표시
          formatDay={(locale, date) => date.getDate()}
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const dateString = formatDateLocal(date);
              if (markedDates.includes(dateString)) {
                return 'marked';
              }
            }
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }} className='progressBox'
      >
        <div className='progress_bar'> {/*컴포넌트 바 임의 수정*/}
          <p>
            성취율 {selectedPlan ? `${selectedPlan.startDay} ~ ${selectedPlan.finalDay}` : ''}
          </p>
          { /*테스트용 진행도바*/ }
          <ProgressBar now={percent} label={percent + "%"} />   {/*성취율 값 넣기 (now,lable)*/}
          <br />

        </div>
        <div className='progress_list'>
          {
            selectedPlan && selectedPlan.planList ? ( //선택된 날짜의 계획과 
              <ul>
                {selectedPlan.planList.map((item, i) => ( 
                  <li key={i} className='task-card.yellow'><span>🔥{i+1}. {item}</span></li>))}
              </ul>) : (
                <p>저장된 계획이 없습니다.</p>
                )
              }

          </div>

      </motion.div>
    </div>
  );
}

export default CalendarPage;
