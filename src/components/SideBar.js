import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ImageBackground } from 'react-native';
import { Container, Content, Text, Grid, Row, Col, List, ListItem, Icon, Left, Button, Body } from "native-base";
import { app } from '../config/db';


export default class SideBar extends Component {

  constructor(props){
    super(props);
    this.state = {
        currentUser: null
    } 
  }

  componentDidMount(){
    const { currentUser } = app.auth();
    this.setState({ currentUser })
  }
  
  render(){
    const { currentUser } = this.state;
      return(
          <Container>
                <Grid>
                  <Row size={12}><ImageBackground source={require('../../images/sidebar-bg.jpg')} style={{width:'100%', height:'100%'}}>
                    <Text style={{color:'white',margin:50, }}>{currentUser && currentUser.email}</Text></ImageBackground></Row>
                  <Row size={50}>
                    <List>
                    <ListItem>
                        <Button block transparent style={{width:'100%'}} onPress={()=>Actions.UserProfile()}><Icon name='md-person' /><Text>Profile</Text></Button>
                    </ListItem>
                    <ListItem>
                    <Button block transparent style={{width:'100%'}} onPress={()=>app.auth().signOut()}><Icon name='md-power' /><Text>Sign Out</Text></Button>
                    </ListItem>
                    </List>
                    
                  </Row>
                </Grid>
          </Container>
      )
  }
}