/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Fab, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';
import EventList from '../components/EventList';

let eventRef = db.ref('/events');

export default class EventScreen extends Component {

  constructor(){
    super();
    this.state = {
      events:[]
    }
  }

  componentDidMount(){
    eventRef.on('value',(snapshot)=> {
      let data = snapshot.val();
      if(data){
        let firebaseData = Object.values(data);
        this.setState({events: firebaseData});
        console.log(this.state.events);
      }
    });
  }
  render() {
    return (
      <Container>
        <Header>
        <Left />
        <Body>
          <Title>Event Lists</Title>
        </Body>
        <Right />
        </Header>
        
        <Content>
          
            <EventList events={this.state.events}></EventList>
            
        
          
          
        </Content>
        <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style= {{backgroundColor:'#5067FF'}}
            position="bottomRight"
            onPress={ ()=> {Actions.AddEventScreen();}}>
            <Icon name="calendar" />
          </Fab>
      </Container>
    );
  }
}