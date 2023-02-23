import React from 'react'
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <main className='welcomePage'>
       <div className='leftBox'>{/*<button className='btn-welcome'>Connexion</button>*/}</div> 
      <div className='rightBox'>
        <Link className='btn-welcome' to="/login">Connexion</Link>
      </div>
    </main>
  )
}

export default Landing