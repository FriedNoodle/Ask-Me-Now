/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Container, Header, Content,  Tab, Tabs, TabHeading, Text, Button, Icon, Left, Body, Right, Fab, Title, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { app, db } from '../config/db';
import SideBar from '../components/SideBar';
import MosqueEvent from './MosqueEvent';

let eventRef = db.ref('/events');

export default class MosqueTab extends Component {

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
    this._isMounted = true;
    let query = eventRef.orderByChild('userID').equalTo(this.props.userID)
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

  render() {

    const dateFilter = new Date();
    console.log(dateFilter.toString().substr(4,12))
    const pastEvent = this.state.events.filter(data => new Date(data.date)  < dateFilter)
    const futureEvent = this.state.events.filter(data => new Date(data.date) > dateFilter)
    const currentEvent = this.state.events.filter(data => data.date === dateFilter.toString().substr(4,12))

    return (

      
       
      <Container>
        <Header
          androidStatusBarColor="#A026B5"
          style= {{backgroundColor:'#a438b6'}}>
        <Left>
        <Button transparent onPress={()=> Actions.pop()}>
                            <Icon name='arrow-back' />
                        </Button>     
        </Left>
        
        <Body>
            <Title style={{fontSize:14}}>{this.props.mosqueName}</Title>
        </Body>
        
        </Header>
        
        <Tabs>

        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Text>Ongoing</Text></TabHeading>}>
            <MosqueEvent events={currentEvent}/>
            </Tab>
        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Text>Upcoming</Text></TabHeading>}>
            <MosqueEvent events={futureEvent}/>
            </Tab>
        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Text>Past</Text></TabHeading>}>
            <MosqueEvent events={pastEvent}/>
            </Tab>
        </Tabs>
    
      </Container>
    

      
    )
  }
}