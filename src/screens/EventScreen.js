/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Fab, Title,List, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { app, db } from '../config/db';
import EventList from '../components/EventList';
import SideBar from '../components/SideBar';

let eventRef = db.ref('/events');

export default class EventScreen extends Component {

  constructor(){
    super();
    this._isMounted = false;
    this.state = {
      events: [],
      currentUser:null,
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
    const { currentUser } = app.auth();
    this.setState({ currentUser });
    this._isMounted = true;
    let query = eventRef.orderByChild('userID').equalTo(currentUser.uid)
    query.on('value',(snapshot)=> {
      let data = snapshot.val();
      if(data){
        let firebaseData = Object.values(data);
        this.setState({events: firebaseData});
        console.log(this.state.events);
      }
    });
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

      <Drawer
        ref={(ref) => {this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={()=>this.closeDrawer()} >
      <Container>
        <Header androidStatusBarColor="#2f8c9c"
          style= {{backgroundColor:'#3297a8'}}>
        <Left>
        <Button transparent onPress={()=> this.openDrawer()}><Icon name="md-menu" style={{color:'white',marginRight:15}} /></Button>
        
        </Left>
        
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
            style= {{backgroundColor:'#6200EE'}}
            position="bottomRight"
            onPress={ ()=> {Actions.AddEventScreen();}}>
            <Icon name="calendar" />
          </Fab>
      </Container>
      </Drawer>
    );
  }
}