import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, Image, Linking } from 'react-native';
import { Container, Content, Button, Icon, Text, Form, Item, Label, Input, DatePicker, Thumbnail, Left, Right, Card, CardItem, Body} from 'native-base';
import { updateEvent } from '../services/DataService';
import RNFetchBlob from 'rn-fetch-blob';
import { db,storage } from '../config/db';

let eventRef = db.ref('/events');


export default class ViewDetails extends Component {
    
    constructor(){
        super();
        this._isMounted = false;
        this.state = {
            events: [],
            name:null,
            photo:null,
            url:null,
            randID:null,
            date:"",
            location:null,
            speakerName:null,
            speakerProfile:null,
            summary:null
        };
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
                                summary: element.summary,
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

    render(){
        
        return(
            <Container>  
                <Content padder>
                <Form>
                <Image source={{uri: this.state.url}} style={{height: 180, width: null, flex:1,
                        borderTopLeftRadius:10,borderTopRightRadius:10,
                        borderBottomLeftRadius:10, borderBottomRightRadius:10}}/>

                        <Card style={{padding:15, borderRadius:10}}>
                                 <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                <Label style={{color:'#17206e', textAlign:'center'}}>Event Name</Label><Input disabled style={{fontSize:14, textAlign:'center'}}
                                        value={this.state.name}></Input>
                                </Item>
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>About Event</Label>
                                <Input style={{fontSize:14, paddingTop:20, textAlign:'justify'}} disabled
                                        value={this.state.summary}
                                        multiline numberOfLines={2}></Input>
                                </Item>            

                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Event Date</Label>
                                <Input style={{fontSize:14, paddingTop:20, textAlign:'center'}} disabled
                                        value={this.state.date}></Input>
                                </Item>
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Speaker</Label>
                                <Input style={{fontSize:14, paddingTop:20, textAlign:'center'}} disabled
                                        value={this.state.speakerName}></Input>
                                </Item>
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}} 
                                onPress={()=>
                                    {Linking.openURL(this.state.speakerProfile)
                                    .catch(()=> Alert.alert('Error!','Link to website does not exist.'))}}>
                                    <Label style={{color:'#17206e',paddingTop:10, textAlign:'center'}}>Social Media Profile</Label>
                                <Input style={{fontSize:14, paddingTop:20, textAlign:'center',color:'blue'}} disabled
                                        value={this.state.speakerProfile}
                                        underlineColorAndroid="blue"></Input>
                                </Item>
                                
    
                            </Card>

                        </Form>
                </Content>
            </Container>
        )
    }
}

