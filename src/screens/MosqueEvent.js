import React, { Component } from 'react';
import { Container, Content, Header, Body, Text, Left, Icon, Button, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import EventList from '../components/EventList';
import { db } from '../config/db';

let eventRef = db.ref('/events');

export default class MosqueEvent extends Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            events: [],
            currentUser:null
        }
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
                        <Title style={{fontSize:14}}>{this.props.mosqueName}</Title>
                    </Body>
                </Header>
                <Content padder>
                <EventList events={this.state.events} onPress={(randID,name)=> {Actions.GuestViewEvent({randID:randID,eventName:name})}} />
                </Content>
                
            </Container>
        )
    }
}