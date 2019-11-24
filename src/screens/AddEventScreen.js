import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, Image,View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Text, Form, Item, Label, Input, DatePicker, Footer, FooterTab, Header, Body, Title, Left, Right, Card } from 'native-base';
import { addEvent } from '../services/DataService';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { app,db,storage } from '../config/db';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

export default class AddEventScreen extends Component {
    constructor(){
        super();
        this.pickImage = this.pickImage.bind(this);
        this.state = {
            currentUser:null,
            userID:null,
            name:null,
            photo:null,
            url:'https://firebasestorage.googleapis.com/v0/b/dummy-db-f351b.appspot.com/o/masjid.jpg?alt=media&token=96a32e83-39f7-43d3-b1c0-f13632c1303b',
            imageType:null,
            randID:null,
            chosenDate:new Date(),
            date:"",
            speakerName:null,
            speakerProfile:null,
            summary:null
        };

        this.pickImage = this.pickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.setDate = this.setDate.bind(this);

        //Convert chosen date to string datatype to store in Database
        this.state.date = this.state.chosenDate.toString().substr(4,12);
        //Generate random 6 number as ID for the event
        this.state.randID = Math.floor(100000 + Math.random() * 900000);
        
    }

    componentDidMount(){
        const { currentUser } = app.auth();
        this.setState({currentUser});
        this.state.userID = currentUser.uid;
    }

    setName = (value) =>{
        this.setState({ name: value});
    }

    setDate = (newDate) =>{
        this.setState({ chosenDate: newDate});
    }

    setUserID = (value) =>{
        this.setState({userID: value});

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

    //Pick Image from camera or library

    pickImage (){
        ImagePicker.openPicker({
          width:300,
          height:180,
          cropping:true
        }).then(image=>{
          this.setState({
            url : image.path,
            imageType : image.mime
          })
        }).catch((error)=>{
            console.log(error)
        })
    }

    //Upload image to Firebase storage
    uploadImage () {
    
        return new Promise((resolve,reject)=> {
            let uploadBlob = null;
            const appendIDToImage = new Date().getTime();
            const imageRef = storage.ref('thumbnails').child(`${appendIDToImage}`);
        
            fs.readFile(this.state.url, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${this.state.imageType};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: this.state.imageType })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
                console.log(url)
                db.ref('/events').child(this.state.randID).update({
                    url:url
                })
                })
            .catch((error) => {
                db.ref('/events').child(this.state.randID).update({
                    url:this.state.url
                })
            })      
        })
    }
   


   //Empty fields check 
   saveData = ()=>{
    if(this.state.name && this.state.date && this.state.summary, 
        this.state.speakerName, this.state.speakerProfile){
        //Save input to database
        addEvent(this.state.name, this.state.randID, this.state.date, this.state.userID, 
            this.state.speakerName, this.state.speakerProfile, this.state.summary),
            this.uploadImage()
            
        }
        else {
            Alert.alert('Status', 'Empty Field(s)!')
        }
    }
 
    
    render(){
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
                    <Title style={{fontSize:16}}>Create New Event</Title>
                    </Body>
                    
                </Header>
                    <Content padder>
                        
                        <Form>
                        
                        <Image
                                source={{uri: this.state.url}}
                                style={{height: 150, width: null, flex: 1,
                                    borderTopLeftRadius:10,borderTopRightRadius:10}}
                            />

                            <Button 
                                style= {{backgroundColor:'#1B6951'}}
                                block iconLeft onPress={this.pickImage}>
                                <Icon name="md-image" />
                                <Text style={{textAlign:'center'}}>Choose Thumbnail</Text>
                            </Button>

                        <Card style={{padding:15, borderRadius:10}}>
                                
                                <Item style={{paddingBottom:5, paddingTop:5}}>
                                <Label style={{color:'#17206e', textAlign:'center'}}>Event Name</Label><Input style={{fontSize:14}}
                                        placeholder='Enter name of event'
                                        maxLength={25}
                                        onChangeText={this.setName}></Input>
                                </Item>
                                <Item style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>About Event</Label>
                                <Input style={{fontSize:14, paddingTop:20}}
                                        multiline numberOfLines={2}
                                        placeholder='Enter event summary'
                                        onChangeText={this.setSummary}></Input>
                                </Item>            

                                <Item style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Event Date</Label>
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

                                    <Text style={{fontSize:14}}>{this.state.date}</Text>

                                </Item>
                                <Item style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Speaker</Label>
                                <Input style={{fontSize:14, paddingTop:20}}
                                        placeholder="Enter speaker's name"
                                        onChangeText={this.setSpeakerName}></Input>
                                </Item>
                                <Item style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Social Media</Label>
                                <Input style={{fontSize:14, paddingTop:20}}
                                        placeholder="Enter social media link"
                                        onChangeText={this.setSpeakerProfile}></Input>
                                </Item>
                                
    
                            </Card>

                        </Form>

                            <Button iconLeft block last style={{marginTop: 20, backgroundColor:'green'}} onPress={this.saveData} >
                            <Icon name="md-save" />
                            <Text style={{fontWeight: "bold"}}>Save</Text>

                            </Button>

                    </Content>
                </Container>
        )
    }
}

