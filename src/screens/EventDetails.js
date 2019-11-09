import React, { Component } from 'react';
import { Container, Header, Text, Tab, Tabs, Body, Left, Right, Title, TabHeading, Icon, ScrollableTab } from 'native-base';
import Profile from '../components/Profile';
import Gallery from '../components/Gallery';
import QuestionScreen from '../screens/QuestionScreen';

export default class EventDetails extends Component {

 
    render(){
        const eventID = this.props.randID;
        const eventName = this.props.eventName;
        
        return(
            
                <Container>
                    <Header hasTabs
                        androidStatusBarColor="#2f8c9c"
                        style= {{backgroundColor:'#3297a8'}}>
                    <Left />
                    <Body>
                        <Title>{eventName}</Title>
                    </Body>
                    
                    </Header>
                    <Tabs initialPage={
                        0} renderTabBar={()=> <ScrollableTab />}>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#3297a8'}}><Icon name="md-calendar"/><Text>Details</Text></TabHeading>}>
                            <Profile eventID={eventID} />
                            
                        </Tab>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#3297a8'}}><Icon name="md-images"/><Text>Gallery</Text></TabHeading>}>
                            <Gallery eventID={eventID}/>
                        </Tab>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#3297a8'}}><Icon name="md-chatboxes"/><Text>Questions and Answers</Text></TabHeading>}>
                            <QuestionScreen eventID={eventID} eventName={eventName}/>
                        </Tab>
                    </Tabs>
                </Container>
                
            
            
        )
    }
}


