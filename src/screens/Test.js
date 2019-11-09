import React, { Component } from 'react';
import { Container, Content, Body, Text, Button, Form, Item, Input } from 'native-base'
import { app } from '.././config/db';


export default class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
            joinID:null
        }
        
    }

    setJoinID = (value) =>{
        this.setState({joinID:value});
    }

    render(){
        return(
            <Container>
                <Content padder>
                    <Form>
                        <Item><Input placeholder='enter event ID here' onChangeText={this.setJoinID}></Input></Item>
                        <Item><Text>{this.state.joinID}</Text></Item>
                    </Form>
                </Content>
            </Container>
        )
    }
    /**
     * 
     * componentDidMount(){
        const { currentUser } = app.auth();
        this.setState({ currentUser })
    }

    render(){
        const { currentUser } = this.state;

        return (
            <Container>
                <Content padder>
                    <Body>
                        <Text>Hi</Text>
                        <Text>{currentUser && currentUser.email}!</Text>
                        <Button onPress={()=>app.auth().signOut()}><Text>Sign out!</Text></Button>

                    </Body>
                </Content>
            </Container>
        )
    }
     */
    
}

