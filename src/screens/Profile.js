import { Container, Content, Card, CardItem, Body, Text, Grid, Row, Header, Left, Right, Title, Form, Label, Input, Item, Button, Icon } from 'native-base';
import React, { Component } from 'react';
import { ImageBackground, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { updateProfile } from '.././services/DataService';
import { db } from '../config/db';
import firebase from 'firebase';
import Geocoder from 'react-native-geocoder-reborn';


let userRef = db.ref('/users')

export default class UserProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:[],
            userID:null,
            mName:null,
            mAdd:null,
            authUser:null,
            lat:null,
            long:null
            
        }

        this.getLatLong = this.getLatLong.bind(this);
    }

    //Return lat and long from address and update profile
    getLatLong(){
        Geocoder.geocodeAddress(this.state.mAdd).then(res => {
          res.map((element)=>{
            this.setState({
              lat:element.position.lat,
              long:element.position.lng
            },
            this.saveProfile)
          })
          console.log(this.state.lat);
      })
      .catch(err=>console.log(err))
    }

    componentDidMount(){
        
        const authUser = (firebase.auth().currentUser.uid);
        let query = userRef.orderByChild('userID').equalTo(authUser);
        query.on('value',(snapshot)=> {
            let data = snapshot.val();
            if(data){
              let firebaseData = Object.values(data);
              this.setState({user: firebaseData},()=>{
                  this.state.user.map((element)=>{
                      this.setState({
                          userID: element.userID,
                          mName: element.name,
                          mAdd: element.address
                      })
                  })
              })
              
            }
            
          });
    }

    setName = (value) => {
        this.setState({
            mName:value
        })
    }

    setAddress = (value) => {
        this.setState({
            mAdd: value
        })
    }

    saveProfile = () => {

   
        if(this.state.mName && this.state.mAdd){
                updateProfile(this.state.userID,this.state.mName,this.state.mAdd,this.state.lat,this.state.long)
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
                    <Title style={{fontSize:14}}>User Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Grid>
                    <Row size={40}>
                        <ImageBackground source={require('../../images/sidebar-bg.jpg')} style={{width:'100%', height:'100%'}}></ImageBackground>
                    </Row>
                    
                        
                        <Form style={{padding:10}}>
                        <Card style={{padding:15, borderRadius:10}}>
                                <Item floatingLabel style={{paddingBottom:5, paddingTop:5}}>
                                <Label style={{color:'#17206e'}}>Mosque Name</Label><Input style={{fontSize:14}}
                                        value={this.state.mName}
                                        onChangeText={this.setName}></Input>
                                </Item>            
                                    
                                
                                <Item floatingLabel>
                                    <Label style={{color:'#17206e',paddingTop:10}}>Mosque Address</Label>
                                <Input style={{fontSize:14, paddingTop:20}} multiline numberOfLines={4}
                                        value={this.state.mAdd}
                                        onChangeText={this.setAddress}></Input>
                                </Item>
                                    
                                
                            </Card>

                            <Button iconLeft block last style={{marginTop: 20,backgroundColor:'green'}} onPress={this.getLatLong}>
                                <Icon name="md-create" />

                            <Text style={{fontWeight: "bold"}}>Update</Text>

                            </Button>
                        </Form>
                            
                       
                   
                </Grid>       
            </Container>
        )
    }

}