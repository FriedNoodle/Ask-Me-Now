/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import EventScreen from './src/screens/EventScreen';
import AddEventScreen from './src/screens/AddEventScreen';

export default class App extends Component {

  render() {
    return (

      <Router hideNavBar = {true}>

        <Scene key="root">
        <Scene key="EventScreen" component={EventScreen} hideNavBar={true} initial={true} />
        <Scene key="AddEventScreen" component={AddEventScreen} hideNavBar={true} />
        </Scene>
      </Router>
    
    )
  }
}

