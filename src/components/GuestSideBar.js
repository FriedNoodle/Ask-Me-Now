import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ImageBackground } from 'react-native';
import { Container, Content, Text, Grid, Row, Col, List, ListItem, Icon, Left, Button, Body } from "native-base";


export default class GuestSideBar extends Component {


  
  render(){
    
      return(
          <Container>
                <Grid>
                  <Row size={12}><ImageBackground source={require('../../images/sidebar-bg.jpg')} style={{width:'100%', height:'100%'}}>
                    </ImageBackground></Row>
                  <Row size={50}>
                    <List>
                    <ListItem style={{borderBottomWidth:0}}>
  
                        <Button block transparent onPress={()=>Actions.JoinEventScreen()}><Icon name='md-swap' /><Text>Switch Event</Text></Button>
       
                    </ListItem>
                    <ListItem style={{borderBottomWidth:0}}>
                    <Button block transparent onPress={()=>Actions.Loading()}><Icon name='md-contact' /><Text>Admin Login</Text></Button>
                    </ListItem>
                    </List>
                    
                  </Row>
                </Grid>
          </Container>
      )
  }
}