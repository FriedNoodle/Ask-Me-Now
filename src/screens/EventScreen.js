/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Fab, Title,List, Drawer, Root, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { app, db } from '../config/db';
import EventList from '../components/EventList';
import SideBar from '../components/SideBar';

let eventRef = db.ref('/events');

export default class EventScreen extends Component {

  constructor(){
    super();
    this._isMounted = false;
  }

  componentDidMount(){
    const { currentUser } = app.auth();
    this.setState({ currentUser });
    this._isMounted = true;
   
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  closeDrawer(){
    this.drawer._root.close()
  };

  openDrawer(){
    this.drawer._root.open()
  };

  render() {

  
    

    return (

        
      <Container>

        
        <Content padder>  
          <EventList events={this.props.events} onPress={(randID,name)=> {Actions.EventDetails({randID:randID,eventName:name})}} />

        </Content>
       
      </Container>
      
    

      
    )
  }
}