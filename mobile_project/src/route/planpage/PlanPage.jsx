import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';

import './PlanPage.css'

import SetPlanRoutePage from './planRoutePage/SetPlanRoutePage';
import CheckPlanRoutePage from './planRoutePage/CheckPlanRoutePage';

function PlanPage()
{
  const[isSetRoute, setIsSetRoute] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className='componentSize'>

      {/* 버튼 */}
      <div className='componentChangeButtonDiv' onClick={()=>{setIsSetRoute(!isSetRoute)}}>
        {
          isSetRoute ?  <PlanCheckButton/> : <PlanSetButton/>
        }
      </div>

      {/* 컨텐츠 */}
      <div className='contentComponentStyle'>
        <AnimatePresence mode="wait">
        {
          isSetRoute ?  <SetPlanRoutePage /> :  <CheckPlanRoutePage />
        }
        </AnimatePresence>
      </div>

    </motion.div>
  )
}

export default PlanPage

{/* 플랜 확인 모달 */}
function PlanCheckButton(){
  return(
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className='PlanCheckbuttonComponentStyle'>
      
      <h1>계획 리스트 →</h1>
    </motion.div>
  )
}

{/* 플랜 작성 모달 */}
function PlanSetButton(){
  return(
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className='PlanSetbuttonComponentStyle '>
      
      <h1>← 3일 플랜 세우기</h1>
    </motion.div>
  )
}
