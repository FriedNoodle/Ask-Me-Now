import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { Container, Content, Button, Icon, Text, Form, Item, Label, Input, DatePicker, Footer, FooterTab } from 'native-base';
import { addEvent } from '../services/DataService';

export default class AddEventScreen extends Component {
    constructor(){
        super();
        this.state = {
            name:null,
            randID:null,
            chosenDate:new Date(),
            date:"",
            location:null,
            speakerName:null,
            speakerProfile:null,
            summary:null
        };
        this.setDate = this.setDate.bind(this);

        //Convert chosen date to string datatype to store in Database
        this.state.date = this.state.chosenDate.toString().substr(4,12);
        //Generate random 6 number as ID for the event
        this.state.randID = Math.floor(100000 + Math.random() * 900000);
    
    }

    setName = (value) =>{
        this.setState({ name: value});
    }

    setDate = (newDate) =>{
        this.setState({ chosenDate: newDate});
    }
    setLocation = (value) =>{
        this.setState({ location: value});
    }
    setSpeakerName = (value) =>{
        this.setState({ speakerName: value});
    }
    setSpeakerProfile = (value) =>{
        this.setState({ speakerProfile: value});
    }
    setSummary = (value) =>{
        this.setState({ summary: value});
    }
    // && this.state.location
   // && this.state.speakerName && this.state.speakerProfile && this.state.summary
    saveData = ()=>{
        if(this.state.name && this.state.date){
                addEvent(this.state.name, this.state.randID, this.state.date, this.state.location,
                     this.state.speakerName, this.state.speakerProfile, this.state.summary)
            }
            else {
                Alert.alert('Status', 'Empty Field(s)!')
            }
    }
    render(){
        return(
            <Container>  
                    <Content padder>
                        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Details</Text>

                        <Form>
                        <Item bordered>
                            <Label>Event Name</Label>
                            <Input maxLength={15} onChangeText={this.setName} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Event ID</Label>
                            <Text>{this.state.randID}</Text>
                            <Input disabled onChangeText={this.setRandID} />
                        </Item>
                        <Item bordered last>
                            <Label>Event Date</Label>
                            <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date()}
                                maximumDate={new Date(2020, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                                />

                            
                        </Item>

                        
                        <Item fixedLabel last>

                            <Label>Speaker's Name</Label>
                            <Input onChangeText={this.setSpeakerName} />                

                        </Item>

                        <Item fixedLabel plast>

                            <Label>Speaker's Profile</Label>
                            <Input onChangeText={this.setSpeakerProfile} />     
                        </Item>

                        </Form>

                            <Button block last style={{marginTop: 50}} onPress={this.saveData}>

                            <Text style={{fontWeight: "bold"}}>Save</Text>

                            </Button>

        </Content>



        <Footer>

          <FooterTab>

          <Button vertical onPress={() => {Actions.EventScreen();}}>

              <Icon name="home" />

              <Text>Home</Text>

            </Button>

          </FooterTab>

        </Footer>
                </Container>
        )
    }
}

