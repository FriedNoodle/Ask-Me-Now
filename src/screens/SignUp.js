import React, { Component } from 'react';
import { ImageBackground, Alert, StatusBar } from 'react-native';
import { Container, Header, Content, Label, Text, Left, Right, Title, Grid, Col, Row, Form, Item, Input, Button, Icon, Card } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { app, db } from '../config/db';
import Geocoder from 'react-native-geocoder-reborn';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            userID:null,
            mName:null,
            mAdd:null,
            latitude:null,
            longitude:null,
            errorMessage:null
        }
        this.getLatLong = this.getLatLong.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this)
    }

    //Return lat and long from address and set profile
    getLatLong = () => {

        
        if(this.state.email && this.state.password &&
            this.state.mName && this.state.mAdd){
                Geocoder.geocodeAddress(this.state.mAdd).then(res => {
                    res.map((element)=>{
                      this.setState({
                        latitude:element.position.lat,
                        longitude:element.position.lng
                      },
                      this.handleSignUp)
                    })
                })
                .catch(err=>console.log(err))
             }

             else {
                 Alert.alert('Status','Empty Field(s)!')
             }
    }

   

    handleSignUp = () => {
            
        app.auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
                .then((res)=>{
                    db.ref('users/' + res.user.uid).set({
                        userID:res.user.uid,
                        name:this.state.mName,
                        address:this.state.mAdd,
                        latitude:this.state.latitude,
                        longitude:this.state.longitude
                        
                    })
                })
                .catch(error =>this.setState({errorMessage:error.message}))
        const { email,password } = this.state;
            
            }
            
         
        
    
    render() {
        return (
        <Container style={{backgroundColor:'#a438b6'}}>
            
            <ImageBackground source={require('../../images/Abstract-bg.jpg')} style={{width:'100%', height:'100%'}}>
            <StatusBar hidden={true}/>
            <Content padder>
                
                <Card transparent style={{padding:15}}>
                <Text style={{textAlign:'center',
                    color:'white', fontSize:20,
                    fontWeight:'bold', marginTop:20,
                    textShadowColor:'black', textShadowRadius:5}}>Create an Account</Text>
                </Card>
                
                <Card style={{padding:15, borderRadius:10}}>
                <Grid>
                
                <Row size={40}>
                    <Col size={10}></Col>
                    <Col size={80}><Form>
                    
                    <Item><Text>{this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}</Text></Item>
                    
                    <Item last>
                        <Icon name="md-mail" />
                        <Input style={{paddingLeft:15}} placeholder="Email" onChangeText={email=>this.setState({email})} />
                    </Item>
                    <Item last>
                        <Icon name="md-lock" />
                        <Input style={{paddingLeft:20}} placeholder="Password" secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
                    </Item>
                    <Item last>
                        <Icon type="FontAwesome5" name="mosque" />
                        <Input placeholder="Name of Mosque" onChangeText={(mName)=>this.setState({mName})} />
                    </Item>
                    <Item last>
                        <Icon type="Entypo" name="location" />
                        <Input style={{paddingLeft:10}} placeholder="Address of Mosque" 
                                 multiline numberOfLines={4}
                                 onChangeText={(mAdd)=>this.setState({mAdd})} />
                    </Item>
                    <Button rounded style={{marginTop: 10,
                            backgroundColor:'#1B6951', alignSelf:'center'}} onPress={this.getLatLong} >

                            <Text style={{fontWeight: "bold"}}>Sign Up</Text>
                            </Button>
                            
                            <Item style={{borderColor:'transparent'}}><Label style={{marginTop:10, fontSize:13}}>Already have an account?</Label>
                          <Button transparent style={{paddingTop:15}} onPress={()=>Actions.LoginScreen()}>
                            <Text style={{fontSize:15, paddingLeft:10}} uppercase={false}>Log In</Text></Button>
                          </Item>

                          
                    </Form>
                    </Col>
                    <Col size={10}></Col>
                    
                    </Row>
                <Row size={20}>
                  
                </Row>
                
                
                </Grid>
                </Card>
            
            </Content>
            </ImageBackground>  
            
            
        </Container>
    );
  }
}