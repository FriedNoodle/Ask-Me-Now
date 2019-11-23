import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Spinner, Text } from 'native-base'
import { app } from '.././config/db';
import { Actions } from 'react-native-router-flux';

export default class Loading extends Component {
    componentDidMount(){
        app.auth().onAuthStateChanged(user=>{

            setTimeout(() => {
                if(user){
                    Alert.alert('Status','You are logged in.')
                    Actions.EventScreen();
                }
                else {
                    Actions.JoinEventScreen();
                }
            }, 1500);
            
        })
    }
    
    
    render(){
        return (
            <Container>
                <Content padder>
                <Text style={{alignSelf:'center'}}>Loading</Text>
                <Spinner />
                </Content>
                
            </Container>
        )
    }
}