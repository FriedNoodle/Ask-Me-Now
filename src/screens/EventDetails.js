import React, { Component } from 'react';
import { Container, Header, Text, Tab, Tabs, Body, Left, Right, Title } from 'native-base';
import Profile from '../components/Profile';
import Gallery from '../components/Gallery';
import QuestionScreen from '../screens/QuestionScreen';

export default class EventDetails extends Component {

 
    render(){
        const eventID = this.props.randID;
        const eventName = this.props.eventName;
        
        return(
            
                <Container>
                    <Header hasTabs>
                    <Left />
                    <Body>
                        <Title>{eventName}</Title>
                    </Body>
                    <Right />
                    </Header>
                    <Tabs initialPage={
                        0} >
                        <Tab heading="Details">
                            <Profile eventID={eventID} />
                            
                        </Tab>
                        <Tab heading="Gallery">
                            <Gallery eventID={eventID}/>
                        </Tab>
                        <Tab heading="Q&A">
                            <QuestionScreen eventID={eventID} eventName={eventName}/>
                        </Tab>
                    </Tabs>
                </Container>
                
            
            
        )
    }
}


