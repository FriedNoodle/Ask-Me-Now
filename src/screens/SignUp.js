import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Content, Label, Text, Left, Right, Title, Grid, Col, Row, Form, Item, Input, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { app } from '../config/db';


export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            errorMessage:null
        }
    }
        
    handleSignUp = () => {
            const { email,password } = this.state;
            app
            .auth()
            .createUserWithEmailAndPassword(email,password)
                .then(()=>Actions.LoginScreen())
                .catch(error =>this.setState({errorMessage:error.message}))
        }
         
        
    
    render() {
        return (
        <Container>
            <Grid>
                <Row size={40}><ImageBackground source={require('../../images/sidebar-bg.jpg')} style={{width:'100%', height:'100%'}}></ImageBackground></Row>
                <Row size={40}>
                    <Col size={10}></Col>
                    <Col size={80}><Form>
                    
                    <Item><Text>{this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}</Text></Item>
                    
                    <Item last>
                        <Icon name="md-mail" />
                        <Input placeholder="Email" onChangeText={email=>this.setState({email})} />
                    </Item>
                    <Item last>
                        <Icon name="md-lock" />
                        <Input placeholder="Password" secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
                    </Item>
                    <Button transparent style={{marginTop: 10, alignSelf:'center'}} onPress={this.handleSignUp} >

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
        </Container>
    );
  }
}