import React, { Component } from 'react';
import { Container, Header, Text, Tab, Tabs, Body, Left, Button, Title, TabHeading, Icon, ScrollableTab } from 'native-base';
import ViewDetails from '../components/ViewDetails';
import Gallery from '../components/Gallery';
import GuestQuest from '../screens/GuestQuestScreen';
import { Actions } from 'react-native-router-flux';

export default class GuestViewEvent extends Component {

 
    render(){
        const eventID = this.props.randID;
        const eventName = this.props.eventName;
        
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
                            <Title style={{fontSize:14}}>{eventName}</Title>
                        </Body>
                    </Header>
                    <Tabs initialPage={
                        0} renderTabBar={()=> <ScrollableTab />}>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#3297a8'}}><Icon name="md-calendar"/><Text>Details</Text></TabHeading>}>
                            <ViewDetails eventID={eventID} />
                            
                        </Tab>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#3297a8'}}><Icon name="md-images"/><Text>Gallery</Text></TabHeading>}>
                            <Gallery eventID={eventID}/>
                        </Tab>
                        <Tab heading={<TabHeading style= {{backgroundColor:'#3297a8'}}><Icon name="md-chatboxes"/><Text>Questions and Answers</Text></TabHeading>}>
                            <GuestQuest eventID={eventID} eventName={eventName}/>
                        </Tab>
                    </Tabs>
                </Container>
                
            
            
        )
    }
}


