import { Container, Content, Card, CardItem, Body, Text, Header, Left, Right, Title, Button, Icon } from 'native-base';
import React, { Component } from 'react';
import Profile from '../components/UserProfile';
import { Actions } from 'react-native-router-flux';

export default class UserProfile extends Component {
    

    render(){
        return(
            <Container>
                <Header 
                    androidStatusBarColor="#2f8c9c"
                    style= {{backgroundColor:'#3297a8'}}>
                    <Left>
                        <Button transparent onPress={()=> Actions.pop()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>User Profile</Title>
                    </Body>
                    <Right />
                </Header>
                    <Profile></Profile>           
            </Container>
        )
    }

}