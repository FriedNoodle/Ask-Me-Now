/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import EventScreen from './src/screens/EventScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import EventDetails from './src/screens/EventDetails';
import Profile from './src/components/Profile';
import QuestionScreen from './src/screens/QuestionScreen';
import GuestScreen from './src/screens/GuestScreen';
import AnswerScreen from './src/screens/AnswerScreen';
import JoinEventScreen from './src/screens/JoinEventScreen';
import LoginScreen from './src/screens/LoginScreen';
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import Test from './src/screens/Test';
import AddQuestion from './src/screens/AddQuestion';

export default class App extends Component {

  render() {
    return (

      <Router hideNavBar = {true}>

        <Scene key="root">
        <Scene key="Loading" component={Loading} hideNavBar={true} initial={true} />
        <Scene key="Test" component={Test} hideNavBar={true} />
        <Scene key="SignUp" component={SignUp} hideNavBar={true}  />
        <Scene key="LoginScreen" component={LoginScreen} hideNavBar={true} />
        <Scene key="EventScreen" component={EventScreen} hideNavBar={true} />
        <Scene key="AddEventScreen" component={AddEventScreen} hideNavBar={true} />
        <Scene key="EventDetails" component={EventDetails} hideNavBar={true} />
        <Scene key="Profile" component={Profile} hideNavBar={true} />
        <Scene key="QuestionScreen" component={QuestionScreen} hideNavBar={true} />
        <Scene key="GuestScreen" component={GuestScreen} hideNavBar={true}  />
        <Scene key="AnswerScreen" component={AnswerScreen} hideNavBar={true}  />
        <Scene key="JoinEventScreen" component={JoinEventScreen} hideNavBar={true}  />
        <Scene key="AddQuestion" component={AddQuestion} hideNavBar={true}  />
        </Scene>
      </Router>
    
    )
  }
}

