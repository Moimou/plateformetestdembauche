import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {FirebaseContext} from '../Firebase'

const Signup = (props) => {

  const firebase = useContext(FirebaseContext );
  console.log(firebase);

  const data={
    pseudo:'',
    email:'',
    password:'',
    confirmPassword:''
  }

  const [loginData, setLoginData] = useState(data);
//console.log(loginData);
const [error,setError]=useState('');

  const handleChange = e => {
 setLoginData({...loginData, [e.target.id]:e.target.value });

  }

  const handleSubmit = e =>{
    e.preventDefault();
    const {email, password, pseudo} = loginData;
    firebase.signupUser(email,password)
    .then(authUser=>{
      return firebase.user(authUser.user.uid).set({
        pseudo,
        email
      });
    })
    .then(()=>{
      setLoginData({...data});
      props.history.push('/welcome');
    })
    .catch((error)=>{
      setError(error);
      setLoginData({...data});

    })
  }

  const {pseudo, email, password, confirmPassword} = loginData;

  const btn = pseudo === '' || email === '' || password === '' || confirmPassword !== password?<button disabled>Inscription</button>:<button>Inscription</button>

  //gestion des erreurs
  const errorMsg = error !== ''&& <span>{error.message}</span>
  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
          <div className='formBoxLeftSignup'></div>
          <div className='formBoxRight'>
             <div className="formContent">

              {errorMsg}

               <h2>Inscription</h2>
               <form onSubmit={handleSubmit}>
                  <div className='inputBox'>
                   <input onChange = {handleChange} value = {pseudo} type="text" id="pseudo" autoComplete='off' required />
                    <label htmlFor='pseudo'>Pseudo</label>
                  </div>

                  <div className='inputBox'>
                   <input onChange = {handleChange} value = {email} type="email" id="email" autoComplete='off' required />
                    <label htmlFor='email'>Email</label>
                 </div>

                <div className='inputBox'>
                  <input onChange = {handleChange} value = {password} type="password" id="password" autoComplete='off' required />
                  <label htmlFor='password'>Mot de Passe</label>
                </div>

                <div className='inputBox'>
                  <input onChange = {handleChange} value = {confirmPassword}  type="password" id="confirmPassword" autoComplete='off' required />
                  <label htmlFor='confirmPassword'>Confirmer le Mot de Passe</label>
                </div> 
                {btn}
              </form>
              <div className='linkContainer'>
                <Link className='simpleLink' to='/login'>Déjà inscrit? Connectez vous</Link>
              </div>
             </div>
          </div>
        </div>
        
    </div>
  )
}

export default Signup