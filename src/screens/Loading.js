import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground} from 'react-native';
import { Container, Content, Spinner, Text, Grid, Col, Row } from 'native-base'
import { app } from '.././config/db';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';

export default class Loading extends Component {
 
    componentDidMount(){
        SplashScreen.hide();
        app.auth().onAuthStateChanged(user=>{

            setTimeout(() => {
                if(user){
                    Alert.alert('Status','You are logged in.')
                    Actions.EventTabs();
                }
                else {
                    Actions.JoinEventScreen();
                }
            }, 10);
            
        })
    }
    
    
    render(){
        return (
            <Container style={{backgroundColor:'#FFF'}}>
                <StatusBar backgroundColor="#a438b6"/>
                
                <Grid>
                    <Row size={30} backgroundColor={"#a438b6"}></Row>
                    <Row size={40} backgroundColor={"#a438b6"}>
                        <ImageBackground source={require('../../images/logo-ask-me-now.png')} style={{width:'100%',
                         height:'100%'}}></ImageBackground></Row>
                    <Row size={30} backgroundColor={"#a438b6"}>
                     <Col style={{marginTop:-50}}><Spinner /></Col></Row>
                </Grid>
                
            </Container>
        )
    }
}