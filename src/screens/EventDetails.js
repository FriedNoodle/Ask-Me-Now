import React, { Component } from 'react';
import { Container, Header, Text, Tab, Tabs, Body, Left, Button, Title, TabHeading, Icon, ScrollableTab } from 'native-base';
import Profile from '../components/Profile';
import Gallery from '../components/Gallery';
import AdminGallery from '../components/AdminGallery'
import QuestionScreen from '../screens/QuestionScreen';
import {Actions} from 'react-native-router-flux';

export default class EventDetails extends Component {

 
    render(){
        const eventID = this.props.randID;
        const eventName = this.props.eventName;
        
        return(
            
                <Container>
                    <Header 
                    androidStatusBarColor="#A026B5"
                    style= {{backgroundColor:'#a438b6'}}>
                    <Left>
                        <Button transparent onPress={()=> Actions.pop()}>
                            <Icon name='arrow-back' />
                        </Button> 
                    </Left>
                        <Body>
                            <Title style={{fontSize:14}}>{eventName}</Title>
                        </Body>
                    </Header>
                    <Tabs initialPage={
                        0} renderTabBar={()=> <ScrollableTab />}>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Icon name="md-calendar"/><Text>Details</Text></TabHeading>}>
                            <Profile eventID={eventID} />
                            
                        </Tab>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Icon name="md-images"/><Text>Gallery</Text></TabHeading>}>
                            <AdminGallery eventID={eventID}/>
                        </Tab>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#a438b6'}}><Icon name="md-chatboxes"/><Text>Questions and Answers</Text></TabHeading>}>
                            <QuestionScreen eventID={eventID} eventName={eventName}/>
                        </Tab>
                    </Tabs>
                </Container>
                
            
            
        )
    }
}


