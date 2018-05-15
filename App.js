import React from 'react';
import Home from './screens/home';
import ListPlace from './screens/ListPlace';

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCwNMsRppjwHyD7PRnB-WEJ15TL5nHDLhw",
    authDomain: "transights-cccb4.firebaseapp.com",
    databaseURL: "https://transights-cccb4.firebaseio.com",
    projectId: "transights-cccb4",
    storageBucket: "transights-cccb4.appspot.com",
    messagingSenderId: "604729076158"
};

firebase.initializeApp(config);

export default class App extends React.Component {
  state = {
    currentScreen : 'home'
  }

  switchScreen = (screen) => {
    this.setState({currentScreen:screen})
  }

  renderScreen = () => {
    if(this.state.currentScreen === 'home'){
      return (
        <Home switchScreen={this.switchScreen} />
      )
    } else {
      return (
        <ListPlace switchScreen={this.switchScreen} />
      )
    }
  }
  render() {
    return (
      this.renderScreen()
    );
  }
}
