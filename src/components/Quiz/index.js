import React, {Component, Fragment} from 'react'
import { QuizMarvel } from '../quizMarvel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';
import {FaChevronRight} from 'react-icons/fa';
//toast.configure();

const initialState = {

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
    percent:null
}

 const levelNames = ["general","confirme","expert"];

class Quiz extends Component {

 
  constructor(props) {
    super(props)



    this.state = initialState;

    this.storedDataRef = React.createRef();
    //this.storedDataRef = this.storedDataRef.bind(this);
}

 

  loadQuestions = level =>{
    //console.log(level);
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level]
    
    if(fetchedArrayQuiz.length >= this.state.maxQuestions){

      this.storedDataRef.current = fetchedArrayQuiz;
     // console.log(this.storedDataRef.current);
    
      const newArray = fetchedArrayQuiz.map(({answer, ...keepRest})=> keepRest);

      this.setState({storedQuestions:newArray})

    }
  }

  submitAnswer = selectedAnswer =>{
    this.setState({
      userAnswer:selectedAnswer,
      btnDisabled:false
    })
  }


  getPercentage = (maxQuest, ourScore) =>(ourScore/maxQuest) * 100;

  gameOver = (percent) =>{
      if(percent >= 50){
        this.setState({
          quizLevel : this.state.quizLevel + 1,
          percent: percent,
          
        })
      }else{
        this.setState({percent: percent})
      }
    
  }

   showToastMsg = pseudo => {
    if(!this.state.showWelcomeMsg){
      this.setState({showWelcomeMsg:true})
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
    
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }


  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions-1){
      //this.gameOver();
      this.setState({quizEnd:true})
    } else{
      this.setState(prevState=>({ idQuestion:prevState.idQuestion + 1})) 
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

    const{
      
      maxQuestions,
      storedQuestions,
      idQuestion,  
      score,
      quizEnd,  
      
    } = this.state;


    if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length  ){
      this.setState({
        question: storedQuestions[idQuestion].question,
        options:storedQuestions[idQuestion].options
        
      })
    }
    if ((idQuestion !== prevState.idQuestion) && storedQuestions.length  ){
      this.setState({
        question: storedQuestions[idQuestion].question,
        options:storedQuestions[idQuestion].options,
        userAnswer:null,
        btnDisabled:true
        
      })
    }
    //pour avoir au acces au bon score
    if(quizEnd !== prevState.quizEnd){
      const gradePercent = this.getPercentage(maxQuestions,score);
      this.gameOver(gradePercent);
    }


    if(this.props.userData.pseudo !== prevProps.userData.pseudo){
      this.showToastMsg(this.props.userData.pseudo);
    }
  }


  loadLevelQuestions = param =>{
    this.setState({...initialState, quizLevel : param })
    this.loadQuestions(levelNames[param]);
  }


  render(){

    const{
    quizLevel,
    maxQuestions,
    question,
    options,
    idQuestion,
    btnDisabled, 
    userAnswer,
    score,
    quizEnd,  
    percent,
  } = this.state;
     //const {pseudo} = this.props.userData

     const displayOptions = options.map((option,index)=>{
        return(<p key={index}
                  className={`answerOptions ${userAnswer === option && "selected"}`}
                  
                  onClick={()=>this.submitAnswer(option)}> <FaChevronRight/> {option} </p> )
     })

     return quizEnd ? (
     <QuizOver 
        ref= {this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions= {this.loadLevelQuestions}
        />
     )
     :
     (
     <Fragment>
      {/* <h2>Pseudo: {pseudo}</h2>  */}
        <Levels
          levelNames = {levelNames}
          quizLevel = {quizLevel}/>
        <ProgressBar 
          idQuestion={idQuestion}
          maxQuestions={maxQuestions}/>
        <h2>{question}</h2>
         {displayOptions}
        <button 
          className='btnSubmit' 
          disabled={btnDisabled}
          onClick={this.nextQuestion}>
            {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
       </button>
      <ToastContainer />  
      </Fragment> 
      )
    
      
    
  }
  }
 

export default Quiz;