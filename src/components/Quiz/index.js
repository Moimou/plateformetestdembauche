import React, {Component, Fragment} from 'react'
import { QuizMarvel } from '../quizMarvel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';

//toast.configure();

 // state={
  //   levelNames : ["debutant","confirme","expert"],
  //   quizLevel:0,
  //   maxQuestions:10,
  //   storedQuestions:[],
  //   question: null,
  //   options:[],
  //   idQuestion:0,
  //   btnDisabled:true,
  //   userAnswer:null,
  //   showWelcomeMsg:false,
  //   score:0
  // }
  // storedDataRef = React.createRef();

const initialState = {
  levelNames : ["debutant","confirme","expert"],
    quizLevel:0,
    maxQuestions:10,
    storedQuestions:[],
    question: null,
    options:[],
    idQuestion:0,
    btnDisabled:true,
    userAnswer:null,
    showWelcomeMsg:false,
    score:0,
    quizEnd:false,
}

class Quiz extends Component {

 
  constructor(props) {
    super(props)
    this.state = initialState;
    this.storedDataRef = React.createRef();
    //this.storedDataRef = this.storedDataRef.bind(this);
}

 

  loadQuestions = level =>{
    console.log(level);
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level]
    
    if(fetchedArrayQuiz.length >= this.state.maxQuestions){

      this.storedDataRef.current = fetchedArrayQuiz;
      console.log(this.storedDataRef.current);
    
      const newArray = fetchedArrayQuiz.map(({answer, ...keepRest})=> keepRest);

      this.setState({
        storedQuestions:newArray
      })

    }
  }

  submitAnswer = selectedAnswer =>{
    this.setState({
      userAnswer:selectedAnswer,
      btnDisabled:false
    })
  }

  gameOver = () =>{
    this.setState({
      quizEnd:true, 
    })
  }

   showWelcomeMsg = pseudo => {
    if(!this.state.showWelcomeMsg){
      this.setState({
        showWelcomeMsg:true
      })
      toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
   
  } 

  componentDidMount(){
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }


  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions-1){
      this.gameOver();
    } else{
      this.setState(prevState=>({
        idQuestion:prevState.idQuestion + 1
      })) 
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
  // console.log('current  ',this.storedDataRef.current[this.state.idQuestion].answer);
    console.log(goodAnswer);

      if(this.state.userAnswer === this.storedDataRef.current[this.state.idQuestion].answer){ 
        this.setState(prevState =>({
          score:prevState.score + 1
         }))


      toast.success(`Bravo +1`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      toast.error(`Raté 0`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     }
   }

 
  

  componentDidUpdate(prevProps, prevState){
    if(this.state.storedQuestions !== prevState.storedQuestions){
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options:this.state.storedQuestions[this.state.idQuestion].options
        
      })
    }
    if (this.state.idQuestion !== prevState.idQuestion){
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options:this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer:null,
        btnDisabled:true
        
      })
    }
    if(this.props.userData.pseudo){
      this.showWelcomeMsg(this.props.userData.pseudo);
    }
  }



  render(){
     //const {pseudo} = this.props.userData

     const displayOptions = this.state.options.map((option,index)=>{
        return(<p key={index}
                  className={`answerOptions ${this.state.userAnswer === option && "selected"}`}
                  
                  onClick={()=>this.submitAnswer(option)}> {option} </p> )
     })

     return !this.state.quizEnd ? (
     <QuizOver/>
     )
     :
     (
     <Fragment>
      {/* <h2>Pseudo: {pseudo}</h2>  */}
        <Levels/>
        <ProgressBar 
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}/>
        <h2>{this.state.question}</h2>
         {displayOptions}
        <button 
          className='btnSubmit' 
          disabled={this.state.btnDisabled}
          onClick={this.nextQuestion}>
            {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
       </button>
      <ToastContainer />  
      </Fragment> 
      )
    
      
    
  }
  }
 

export default Quiz;