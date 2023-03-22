import app from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBc5fAVuUSRzB5LWRrFrzOmmAHwStY6eUI",
    authDomain: "sltest-project.firebaseapp.com",
    projectId: "sltest-project",
    storageBucket: "sltest-project.appspot.com",
    messagingSenderId: "819896195066",
    appId: "1:819896195066:web:c11039eb0bd693e466f643"
  };

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth =  app.auth()
    }

    //inscription
   signupUser = (email,password) => this.auth.createUserWithEmailAndPassword(email,password);

   //connexion
   loginUser= (email,password) =>this.auth.signInWithEmailAndPassword(email,password);

   //deconnexion
   signoutUser = () =>this.auth.signOut;
}


export default Firebase;