import React, { Component } from 'react';
import { Container, Content, Header, Body, Left, Icon, Button, Title } from 'native-base';
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
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        return(
            <Container>
                <Content padder>
                <EventList events={this.props.events} onPress={(randID,name)=> {Actions.GuestViewEvent({randID:randID,eventName:name})}} />
                </Content>
                
            </Container>
        )
    }
}