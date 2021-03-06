import React, { Component } from 'react';
import { Container, Header, Text, Tab, Tabs, Body, Left, Drawer, Button, Title, TabHeading, Icon, ScrollableTab, Fab } from 'native-base';
import ViewDetails from '../components/ViewDetails';
import Gallery from '../components/Gallery';
import GuestQuestScreen from '../screens/GuestQuestScreen';
import { Actions } from 'react-native-router-flux';
import GuestSideBar from '../components/GuestSideBar';


export default class GuestScreen extends Component {

    closeDrawer(){
        this.drawer._root.close()
      };
    
      openDrawer(){
        this.drawer._root.open()
      };
 
    render(){

        //Assign props to variable
        const eventID = this.props.randID;
        const eventName = this.props.eventName;
      
        return(

            <Drawer
                ref={(ref) => {this.drawer = ref; }}
                content={<GuestSideBar navigator={this.navigator} />}
                onClose={()=>this.closeDrawer()} >
                <Container>
                    <Header androidStatusBarColor="#A026B5" 
                        hasTabs style= {{backgroundColor:'#a438b6'}}>
                    <Left>
                        <Button transparent onPress={()=> this.openDrawer()}><Icon name="md-menu" style={{color:'white',marginRight:15}} /></Button>
                    </Left>
                    <Body>
                        <Title>{eventName}</Title>
                    </Body>
                    
                    </Header>
                    <Tabs 
                        initialPage={
                        0} renderTabBar={()=> <ScrollableTab />}>

                        <Tab heading={<TabHeading style={{backgroundColor:'#a438b6'}}><Icon name="md-calendar"/><Text>Details</Text></TabHeading>}>
                            <ViewDetails eventID={eventID}/>
                        </Tab>
                        <Tab heading={<TabHeading style={{backgroundColor:'#a438b6'}}><Icon name="md-images"/><Text>Gallery</Text></TabHeading>}>
                            <Gallery eventID={eventID}/>
                        </Tab>
                        <Tab heading={<TabHeading style={{backgroundColor:'#a438b6'}}><Icon name="md-chatboxes"/><Text>Questions and Answers</Text></TabHeading>}>
                            <GuestQuestScreen eventID={eventID}/>
                        </Tab>                      
                    </Tabs>

                    <Fab
                        active={true}
                        direction="up"
                        containerStyle={{}}
                        style= {{backgroundColor:'#1B6951'}}
                        position="bottomRight"
                        onPress={ ()=> {Actions.AddQuestion({eventID:eventID,eventName:eventName});}}>
                        <Icon name="md-chatbubbles" />
                    </Fab>
                </Container>
            </Drawer>
            
            
        )
    }
}


