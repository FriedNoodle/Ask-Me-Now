import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Right, Title, Grid, Col, Row, Form, Item, Input, Button, Icon, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { app } from '.././config/db';

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      email:'',
      password:'',
      errorMessage:'',
    }
  }

  componentDidMount(){
    this._isMounted = true;
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }
  handleLogin = ()=>{
    const { email,password } = this.state;
    app
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then(()=> Actions.EventScreen())
    .catch(error => this.setState({errorMessage:error.message}))
  }
  render() {
    return (
      <Container>
    
            <Grid>
                <Row size={40}><ImageBackground source={require('../../images/sidebar-bg.jpg')} style={{width:'100%', height:'100%'}}></ImageBackground></Row>
                <Row size={50}>
                    <Col size={10}></Col>
                    <Col size={80}><Form>
                    
                    <Item><Text>{this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}</Text></Item>
                    <Item last>
                        <Icon name="md-mail" />
                        <Input placeholder="Email" onChangeText={email=>this.setState({email})} />
                    </Item>
                    <Item last>
                        <Icon name="md-lock" />
                        <Input placeholder="Password" secureTextEntry={true} onChangeText={password=> this.setState({password})}/>
                    </Item>
                    <Button transparent style={{marginTop: 10, alignSelf:'center'}} onPress={this.handleLogin} >

                            <Text style={{fontWeight: "bold"}}>Login</Text>

                            </Button>
                          <Item style={{borderColor:'transparent'}}><Label style={{marginTop:10, fontSize:13}}>Don't have an account?</Label>
                          <Button transparent style={{paddingTop:15}} onPress={()=>Actions.SignUp()}>
                            <Text style={{fontSize:15, paddingLeft:10}} uppercase={false}>Sign Up</Text></Button>
                          </Item>
                          
                          <Item style={{borderColor:'transparent', paddingTop:20}}><Button bordered success onPress={()=>Actions.JoinEventScreen()}><Text style={{fontSize:13}} uppercase={false}>Login as Guest</Text></Button></Item>
                            </Form>
                    </Col>
                    <Col size={10}></Col>
                    
                    </Row>
                <Row size={10}>

                </Row>
            </Grid>

         
       
      </Container>
    );
  }
}