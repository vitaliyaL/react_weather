import React, { Component } from 'react'
import Data from './components/Data/Data'
import "./App.css"
import Header from './components/Header/Header'
import Citata from './components/Citata/Citata'
export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      value:'Могилёв'
    }
  }
   getValinApp=(i)=>{
        this.setState({value:i});
    }
  render() {
    return (
      <div className='weather'>
        <Header getValinApp={this.getValinApp} />
        
        <Data value={this.state.value}/>
      </div>
    )
  }
}
