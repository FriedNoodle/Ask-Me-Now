/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Fab, Title,List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';
import EventList from '../components/EventList';

let eventRef = db.ref('/events');

export default class EventScreen extends Component {

  constructor(){
    super();
    this.state = {
      events: [],
      name:null,
      photo:null,
      url:'https://firebasestorage.googleapis.com/v0/b/dummy-db-f351b.appspot.com/o/masjid.jpg?alt=media&token=96a32e83-39f7-43d3-b1c0-f13632c1303b',
      randID:null,
      chosenDate:new Date(),
      date:"",
      location:null,
      speakerName:null,
      speakerProfile:null,
      summary:null
    };
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
        
        <Content padder>
          
          <EventList events={this.state.events} onPress={(randID,name)=> {Actions.EventDetails({randID:randID,eventName:name})}} />
          
            
            
        
          
          
        </Content>
        <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style= {{backgroundColor:'#5067FF'}}
            position="bottomRight"
            onPress={ ()=> {Actions.Test({eventName:"sd",id:"123"});}}>
            <Icon name="calendar" />
          </Fab>
      </Container>
    );
  }
}