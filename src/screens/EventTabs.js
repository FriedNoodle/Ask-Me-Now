/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Container, Header, Content,  Tab, Tabs, TabHeading, Text, Button, Icon, Left, Body, Right, Fab, Title,List, Drawer, Root, Toast, Segment } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { app, db } from '../config/db';
import SideBar from '../components/SideBar';
import EventScreen from './EventScreen';

let eventRef = db.ref('/events');

export default class EventTabs extends Component {

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

    const dateFilter = new Date();
    const pastEvent = this.state.events.filter(data => new Date(data.date)  < dateFilter)
    
    const futureEvent = this.state.events.filter(data => new Date(data.date) > dateFilter)
    const currentEvent = this.state.events.filter(data => data.date === dateFilter.toString().substr(4,12))
    //console.log(currentEvent)
    return (

      <Root>
        <Drawer
        ref={(ref) => {this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={()=>this.closeDrawer()} >
      <Container>
        <Header
          androidStatusBarColor="#A026B5"
          style= {{backgroundColor:'#a438b6'}}>
        <Left>
        <Button transparent onPress={()=> this.openDrawer()}><Icon name="md-menu" style={{color:'white',marginRight:15}} /></Button>
        
        </Left>
        
        <Body>
            <Title style={{fontSize:16}}>Event Lists</Title>
        </Body>
        
        </Header>
        
        <Tabs>

        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Text>Ongoing</Text></TabHeading>}>
            <EventScreen events={currentEvent}/>
            </Tab>
        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Text>Upcoming</Text></TabHeading>}>
            <EventScreen events={futureEvent}/>
            </Tab>
        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Text>Past</Text></TabHeading>}>
            <EventScreen events={pastEvent}/>
            </Tab>
        </Tabs>
        <Fab
            active={true}
            direction="up"
            
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