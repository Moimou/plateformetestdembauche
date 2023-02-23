import React, { Component } from 'react'

export class ChildComponent extends Component {

    constructor(props) {
        super(props)
      
  
        console.log('Je suis dans le Constructeur Enfant');
      }

      componentDidMount() { 
        console.log('Je suis dans le ComponentDidMount Enfant');
       }
  render() {
    console.log('Je suis dans le render() Enfant');
    return (
      <div>
        {console.log('Mise à jour DOM Enfant')}
        child
      </div>
    )
  }
}

export default ChildComponent