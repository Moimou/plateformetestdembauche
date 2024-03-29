import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../../App.css';
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';
import {IconContext} from 'react-icons';

class App extends Component {

  render(){

    return (
      <Router>
       <IconContext.Provider value={{ style:{verticalAlign:'middle'}}}> 
          <Header/>

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/welcome" component ={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route  component={ErrorPage} />
          </Switch>

          <Footer/>
        </IconContext.Provider>
      </Router>
    );

  }
 
}

export default App;
