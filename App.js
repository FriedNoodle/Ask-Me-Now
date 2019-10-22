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
import GuestScreen from './src/screens/GuestHomeScreen';
import AnswerScreen from './src/screens/AnswerScreen';
import Test from './src/components/Test';
import {ActionConst} from 'react-native-router-flux'
import { fromBase64 } from 'bytebuffer';

export default class App extends Component {

  render() {
    return (

      <Router hideNavBar = {true}>

        <Scene key="root">
        <Scene key="EventScreen" component={EventScreen} hideNavBar={true} initial={true} />
        <Scene key="AddEventScreen" component={AddEventScreen} hideNavBar={true} />
        <Scene key="EventDetails" component={EventDetails} hideNavBar={true} />
        <Scene key="Profile" component={Profile} hideNavBar={true} />
        <Scene key="QuestionScreen" component={QuestionScreen} hideNavBar={true} />
        <Scene key="GuestScreen" component={GuestScreen} hideNavBar={true}  />
        <Scene key="AnswerScreen" component={AnswerScreen} hideNavBar={true}  />
        <Scene key="Test" component={Test} hideNavBar={true}  />
        </Scene>
      </Router>
    
    )
  }
}

