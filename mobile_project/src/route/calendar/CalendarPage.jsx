import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';

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
  const [date, setDate] = useState(new Date());           // 현재 선택된 날짜
  const [markedDates, setMarkedDates] = useState([]);     // 표시할 날짜 목록

  // useEffect : 컴포넌트가 처음 렌더링될 때 한 번만 실행
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('PlanData')) || [];    // 로컬 스토리지에서 'PlanData'를 불러옴

    const allMarkedDates = storedData.flatMap(plan => {       // flatMap : 2차원 배열 -> 1차원 배열
      const dates = [];
      const [year, month, day] = plan.startDay.split('-').map(Number);
      const start = new Date(year, month - 1, day); 

      for (let i = 0; i < 3; i++) {               // start를 기준으로 3일 연속된된 날짜 생성
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(formatDateLocal(date));      // 로컬 포맷 사용
      }

      return dates;
    });

    setMarkedDates(allMarkedDates);
  }, []);

  return (
    <div className="calendarComponentStyle getLine">
      <Calendar                                               
        onChange={setDate}                                        // 날짜 클릭 시 date 상태 변경
        value={date}                                              // 현재 선택된 날짜 달력에 표시
        formatDay={(locale, date) => date.getDate()}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const dateString = formatDateLocal(date);
            if (markedDates.includes(dateString)) {
              return 'marked';
            }
          }
        }} />

        { /*테스트용 진행도바*/ }
        <div style={{width:"90%", marginTop:"20px"}}>
          <p>성취율</p>
          <ProgressBar now={80} label={`${80}%`} /> {/*성취율 값 넣기 (now,lable)*/}
        </div>
    </div>
  );
}

export default CalendarPage;
