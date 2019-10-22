import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, Image,View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Text, Form, Item, Label, Input, DatePicker, Footer, FooterTab, Thumbnail, Left, Right } from 'native-base';
import { addEvent } from '../services/DataService';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { db,storage } from '../config/db';

var options = {
    title: 'Select Thumbnail',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };


  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob;


//Upload image to Firebase storage
  function uploadImage (uri, mime = 'image/jpeg') {
    
    return new Promise((resolve,reject)=> {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const appendIDToImage = new Date().getTime();
  
      const imageRef = storage.ref('thumbnails').child(`${appendIDToImage}`);
  
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
        //storeReference(url, appendIDToImage)
        })
      .catch((error) => {
        reject(error)
      })      
    })
}

export default class AddEventScreen extends Component {
    constructor(){
        super();
        this.pickImage = this.pickImage.bind(this);
        this.state = {
            name:null,
            photo:null,
            url:'https://firebasestorage.googleapis.com/v0/b/dummy-db-f351b.appspot.com/o/masjid.jpg?alt=media&token=96a32e83-39f7-43d3-b1c0-f13632c1303b',
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

    //Pick Image from camera or library

    pickImage(){
        
        ImagePicker.showImagePicker(options, (response) => {
            if(response.uri){
                this.setState({ url: response.uri });
                
            }
        });
    };

    

   

    //Store image url to firebase database
    /**  storeReference = (downloadUrl,appendedID)=>{
        let image = {
            randID:appendedID,
            url:downloadUrl
        }

        db.ref('/events')
        .child(appendedID)
        .push(image);
    }*/
   

    // && this.state.location
   // && this.state.speakerName && this.state.speakerProfile && this.state.summary
   //Empty fields check 
   saveData = ()=>{
    if(this.state.name && this.state.date){
        //Save input to database
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
                        <Item bordered last style={{padding:5}}>
                            <Label>Event Name</Label>
                            
                                <Input placeholder='Event name here'
                                    placeholderTextColor = 'rgb(229, 231, 233)' maxLength={25} onChangeText={this.setName} />
                            
                        </Item>
                        <Item bordered last style={{padding:5}}>
                            <Label>Thumbnail</Label>
                            <Left />
                            <Button onPress={this.pickImage}>
                                <Text>Choose Image</Text>
                            </Button>
                        
                        </Item>

                        <Image
                            source={{uri: this.state.url}}
                            style={{height: 150, width: null, flex: 1}}
                        />
                       
                        
                        
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

                        
                        <Item fixedLabel last style={{padding:5}}>

                            <Label>Speaker's Name</Label>
                            <Input onChangeText={this.setSpeakerName} />
                                            

                        </Item>

                        <Item fixedLabel last>

                            <Label>Speaker's Profile</Label>
                            <Input onChangeText={this.setSpeakerProfile} />     
                        </Item>

                        </Form>

                            <Button block last style={{marginTop: 50}} onPress={this.saveData} >

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

