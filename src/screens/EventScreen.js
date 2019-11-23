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
    this.state = {
      events: [],
      currentUser:null,
      name:null,
      photo:null,
      url:null,
      randID:null,
      chosenDate:new Date(),
      date:"",
      location:null,
      speakerName:null,
      speakerProfile:null,
      summary:null,
      showToast:false
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

      <Root>
        <Drawer
        ref={(ref) => {this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={()=>this.closeDrawer()} >
      <Container>
        <Header androidStatusBarColor="#A026B5"
          style= {{backgroundColor:'#a438b6'}}>
        <Left>
        <Button transparent onPress={()=> this.openDrawer()}><Icon name="md-menu" style={{color:'white',marginRight:15}} /></Button>
        
        </Left>
        
        <Body>
          <Title style={{fontSize:16}}>Event Lists</Title>
        </Body>
        
        </Header>
        
        <Content padder>  
          <EventList events={this.state.events} onPress={(randID,name)=> {Actions.EventDetails({randID:randID,eventName:name})}} />

        </Content>
        <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style= {{backgroundColor:'#1B6951'}}
            position="bottomRight"
            onPress={ ()=> {Actions.AddEventScreen();}}>
            <Icon name="calendar" />
          </Fab>
      </Container>
      </Drawer>
      </Root>

      
    )
  }
}