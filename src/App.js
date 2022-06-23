import React, { Component } from 'react'
import Data from './components/Data/Data'
import "./App.css"
import Header from './components/Header/Header'
import Citata from './components/Citata/Citata'
import City from './components/City/City'
export default class App extends Component {

  render() {
    return (
      <div className='weather'>
        <Header/>
        <Citata/>
        <City/>
        <Data/>
      </div>
    )
  }
}
