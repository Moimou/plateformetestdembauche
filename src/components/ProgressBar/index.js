import React, {Fragment} from 'react'

const ProgressBar = ({idQuestion, maxQuestions}) => {

 
  const getWidth = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  }

  const actualQuestion = idQuestion + 1;

  const progresPercent = getWidth(maxQuestions, actualQuestion);

  return (
    <Fragment>
    <div className='percentage'>
        <div className='progressPercent'>{`Question: ${idQuestion + 1} / ${maxQuestions}`}</div>
        <div className='progressPercent'>{`Progression: ${progresPercent}%`}</div>
    </div>
    <div className='progressBar'>
        <div className='progressBarChange' style={{width:`${progresPercent}%`}}></div>
    </div>
    </Fragment>
  )
}

export default React.memo(ProgressBar);