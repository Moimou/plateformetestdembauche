import React, {useState,useEffect, useContext} from 'react'
import {FirebaseContext} from '../Firebase'

const Logout = (props) => {

    const [checked, setChecked]= useState(false);

    const firebase= useContext(FirebaseContext);

    const handleChange = (event)=>{
      setChecked(event.target.checked);
    }

    useEffect(()=>{
        if(checked){
            
            console.log("Déconnexion")
            firebase.signoutUser();
            //props.history.push('/login')
        }
    },[checked, firebase]);

  return (
    <div className='logoutContainer'>
        <label className='switch'>
             <input onChange={handleChange} type='checkbox' checked={checked}/>
            <span className='slider round'></span>
        </label>  
    </div>
  )
}

export default Logout;