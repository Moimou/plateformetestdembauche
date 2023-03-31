import React, {useState, useEffect, Fragment, useContext} from 'react'
import {FirebaseContext} from '../Firebase'
import Logout from '../Logout'
import Quiz from '../Quiz'


const Welcome = (props) => {

  const firebase = useContext(FirebaseContext); 

  const [userSession, setUserSession] = useState (null);
  
   
   useEffect (() => {
    let listener = firebase.auth.onAuthStateChanged(user => { user ? setUserSession(user) : props.history.push('/');
     })
    
     return ()=>{
       console.log(userSession);
       listener() 
    };
 },[userSession, firebase, props.history])
  
  return userSession === null ? (
    <Fragment>
      <div className='loader'></div>
      <p className='loaderText' >Loading...</p>
    </Fragment>
  ):( 
  <div className='quiz-bg'>
    <div className='container'>
      <Logout/>
      <Quiz/>
    </div>
</div>
)

}

export default Welcome