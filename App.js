/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import EventTabs from './src/screens/EventTabs';
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
import AddQuestion from './src/screens/AddQuestion';
import UserProfile from './src/screens/Profile';
import MosqueTab from './src/screens/MosqueTab';
import GuestViewEvent from './src/screens/GuestViewEvent';
console.disableYellowBox = true;

export default class App extends Component {

  render() {
    return (

      <Router hideNavBar = {true}>

        <Scene key="root">
        <Scene key="Loading" component={Loading} hideNavBar={true} initial={true} />
        <Scene key="SignUp" component={SignUp} hideNavBar={true}  />
        <Scene key="LoginScreen" component={LoginScreen} hideNavBar={true} type={ActionConst.RESET} />
        <Scene key="EventTabs" component={EventTabs} hideNavBar={true} type={ActionConst.RESET}/>
        <Scene key="AddEventScreen" component={AddEventScreen} hideNavBar={true} />
        <Scene key="EventDetails" component={EventDetails} hideNavBar={true} />
        <Scene key="Profile" component={Profile} hideNavBar={true} />
        <Scene key="UserProfile" component={UserProfile} hideNavBar={true} />
        <Scene key="QuestionScreen" component={QuestionScreen} hideNavBar={true} />
        <Scene key="GuestScreen" component={GuestScreen} hideNavBar={true}  />
        <Scene key="AnswerScreen" component={AnswerScreen} hideNavBar={true}  />
        <Scene key="JoinEventScreen" component={JoinEventScreen} hideNavBar={true} type={ActionConst.RESET} />
        <Scene key="MosqueTab" component={MosqueTab} hideNavBar={true}  />
        <Scene key="GuestViewEvent" component={GuestViewEvent} hideNavBar={true}  />
        <Scene key="AddQuestion" component={AddQuestion} hideNavBar={true}  />
        </Scene>
      </Router>
    
    )
  }
}

