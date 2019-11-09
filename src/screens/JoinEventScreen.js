import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Content, Body, Text, Left, Right, Title, Grid, Row, Col,Form, Label, Item, Input, Icon, Button, ActionSheet, Root} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';

let eventRef = db.ref('/events');

//Var for ActionSheets
var BUTTONS = ["Admin Login","Cancel"];
var CANCEL_INDEX = 1;

export default class JoinEventScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: [],
      name:null,
      randID:null,
      joinID:null
    };
    
    
    this.joinEvent = this.joinEvent.bind(this);
  }
  

  joinEvent(){
    let query = eventRef.orderByChild("randID").equalTo(parseInt(this.state.joinID))
    query.once('value', (snapshot)=>{
      //let data = snapshot.val();
      if(snapshot.exists()){
        let userData = snapshot.val();
        let firebaseData = Object.values(userData);
        this.setState({events:firebaseData},()=>{
          this.state.events.map((element)=>{
            this.setState({
              name:element.name,
              randID:element.randID
            })
          })
        });
        //Redirect to GuestScreen with props(randID,eventName)
        Actions.GuestScreen({randID:this.state.randID,eventName:this.state.name});

        console.log(this.state.randID)
      }
      else {
        Alert.alert("There is no such event")
        
      }
    })
  }

  setRandID = (value) =>{
    this.setState({joinID:value,randID:value});
    
  }

  render() {
    return (
      <Root>
        <Container>
        <Header androidStatusBarColor="#2f8c9c"
          style= {{backgroundColor:'#3297a8'}}>
        <Left />
        <Body>
          <Title style={{fontSize:16}}>Events near Me</Title>
        </Body>
        <Right>
          <Button transparent onPress={()=> ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              title:"Select an option",
            },
          
            (buttonIndex)=>{
              if(buttonIndex === 0){
                Actions.LoginScreen();
              }
            }
          )}>
            <Icon name='md-person'></Icon>
          </Button>
        </Right>
        </Header>
        
        
          <Grid>
            <Row size={70} style={{ backgroundColor: '#635DB7'}}></Row>
            <Row size={30}>
              <Content padder>
              <Col size={10}></Col>
              <Col size={80}>
              <Form>
              
              <Item rounded>
              <Icon name='md-finger-print' /><Input placeholder='enter event ID here' keyboardType='numeric' maxLength={6} onChangeText={this.setRandID}></Input><Button icon transparent onPress={this.joinEvent}>
                  <Icon name='md-arrow-round-forward' />
                </Button></Item>
              
             
              </Form>
              </Col>
              <Col size={10}></Col>
              </Content>
            </Row>
          </Grid>
          
       
      </Container>
      </Root>
      
    );
  }
}