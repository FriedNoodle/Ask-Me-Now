import React, { Component } from 'react';
import { Container, Content, Spinner, Text } from 'native-base'
import { app } from '.././config/db';
import { Actions } from 'react-native-router-flux';

export default class Loading extends Component {
    componentDidMount(){
        app.auth().onAuthStateChanged(user=>{
            if(user){
                Actions.EventScreen();
            }
            else {
                Actions.LoginScreen();
            }
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