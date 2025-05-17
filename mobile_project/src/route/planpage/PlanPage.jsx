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
      <div className='getLine2 componentChangeButtonDiv' onClick={()=>{setIsSetRoute(!isSetRoute)}}>
        <h1>계획 생성 </h1>
        <h1>게획 확인 </h1>
      </div>

      {/* 컨텐츠 */}
      <div className='getLine contentComponentStyle'>
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
