import React, { Component } from 'react';
import { Alert, Image} from 'react-native';
import { Container, Content, Button, Icon, Text, Form, Item, Label, Input, DatePicker, Thumbnail, Left, Right, Card, CardItem, Body, Grid, Col} from 'native-base';
import { updateEvent } from '../services/DataService';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { db,storage } from '../config/db';
import { Actions } from 'react-native-router-flux';

let eventRef = db.ref('/events');
let questRef = db.ref('questions');

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

export default class Profile extends Component {
    
    constructor(){
        super();
        this._isMounted = false;
        this.pickImage = this.pickImage.bind(this);
        this.state = {
            events: [],
            name:null,
            photo:null,
            url:null,
            imageType: null,
            randID:null,
            chosenDate:new Date(),
            date:"",
            location:null,
            speakerName:null,
            speakerProfile:null,
            summary:null
        };

        this.pickImage = this.pickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.setDate = this.setDate.bind(this);

        //Convert chosen date to string datatype to store in Database
        this.state.date = this.state.chosenDate.toString().substr(4,12);
    }

    componentDidMount(){
        this._isMounted = true;
        let query = eventRef.orderByChild("randID").equalTo(this.props.eventID);
        query.once('value', (snapshot) => {
            let data = snapshot.val();
            if(data){
                let firebaseData = Object.values(data);
                if(this._isMounted){
                    this.setState({events: firebaseData},()=>{
                        this.state.events.map((element)=>{
                            this.setState({
                                name: element.name,
                                url: element.url,
                                summary:element.summary,
                                randID: element.randID,
                                date: element.date,
                                speakerName:element.speakerName,
                                speakerProfile:element.speakerProfile,
                            });
                        });
                    });
                }
                
            }
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setName = (value) =>{
        this.setState({ name: value});
    }

    setDate = (newDate) =>{
        this.setState({ date: newDate.toString().substr(4,12)});
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
            eventRef.child(this.state.randID).update({
                url:url
            })
            })
        .catch((error) => {
            reject(error)
        })      
        })
    }

   //Will check for Empty fields. If true save to database 
   updateData = ()=>{
    if(this.state.name && this.state.date 
        && this.state.summary && this.state.speakerName
        && this.state.speakerProfile && this.state.url){
        //Save input to database
        updateEvent(this.state.name, this.state.randID, this.state.date, this.state.location,
            this.state.speakerName, this.state.speakerProfile, this.state.summary),
            this.uploadImage();
            
        }
        else {
            Alert.alert('Status', 'Empty Field(s)!')
        }
    }

    deleteEvent = () => {
        Alert.alert('Warning',
            'Delete Event?',[
            {text: 'Yes', onPress: ()=> 
            setTimeout(()=>{

                questRef.orderByChild('eventUID').equalTo(this.props.eventID)
                .on('child_added', (snapshot)=>{
                    snapshot.ref.remove();
                })
                let eventQuery = eventRef.child(this.props.eventID)
   
                eventQuery.remove()

                Actions.EventScreen();
                    
                   
                
                Alert.alert('Alert','Event Deleted.')
            },1000)
                
            },
            {text:'No', style: 'cancel'},
        ],
        {
            cancelable:false
        })
        
    }

    render(){
        
        return(
            <Container>  
                    <Content padder>
                        <Card>
                            <CardItem style={{ backgroundColor:'#e6e6e6'}}>
                                <Body>
                                    <Item style={{borderColor:'transparent'}}fixedLabel last>
                                        <Icon name="md-finger-print" />
                                            <Label>Event ID</Label>
                                        <Text>{this.state.randID}</Text>
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                            <Image
                                source={{uri: this.state.url}}
                                style={{height: 150, width: null, flex: 1,
                                    borderTopLeftRadius:10,borderTopRightRadius:10}}
                            />

                            <Button block iconLeft onPress={this.pickImage}>
                                <Icon name="md-image" />
                                <Text style={{textAlign:'center'}}>Change Thumbnail</Text>
                            </Button>

                            <Card style={{padding:15, borderRadius:10}}>
                                
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                <Label style={{color:'#17206e', textAlign:'center'}}>Event Name</Label><Input style={{fontSize:14, textAlign:'center'}}
                                        placeholder='Update event Name'
                                        placeholderTextColor = 'rgb(229, 231, 233)' maxLength={25}
                                        onChangeText={this.setName}
                                        value={this.state.name}></Input>
                                </Item>
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>About Event</Label>
                                <Input style={{fontSize:14, paddingTop:20, textAlign:'justify'}}
                                        value={this.state.summary}
                                        multiline numberOfLines={2}
                                        placeholder='Update event summary'
                                        placeholderTextColor = 'rgb(229, 231, 233)'
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
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Speaker</Label>
                                <Input style={{fontSize:14, paddingTop:20, textAlign:'center'}}
                                        value={this.state.speakerName}
                                        onChangeText={this.setSpeakerName}></Input>
                                </Item>
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Social Media Profile</Label>
                                <Input style={{fontSize:14, paddingTop:20, textAlign:'center'}}
                                        value={this.state.speakerProfile}
                                        onChangeText={this.setSpeakerProfile}></Input>
                                </Item>
                                
    
                            </Card>

                            <Grid>
                                <Col style={{padding:5}}>
                                    <Button iconLeft block last style={{marginTop: 10,backgroundColor:'green'}} onPress={this.updateData} >
                                    <Icon name="md-create" />

                                <Text style={{fontWeight: "bold"}}>Update</Text>

                                </Button>
                                </Col>
                                <Col style={{padding:5}}>
                                    <Button iconLeft block last style={{marginTop: 10,backgroundColor:'red'}} onPress={this.deleteEvent} >
                                        <Icon
                                            type="MaterialIcons" name="delete-forever"/>

                                    <Text style={{fontWeight: "bold"}}>Delete</Text>

                                    </Button>
                                </Col>
                            </Grid>

                            
                            

        </Content>

                </Container>
        )
    }
}

