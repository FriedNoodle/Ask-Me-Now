import { Container, Content, Card, CardItem, Body, Text, Grid, Row, Col } from 'native-base';
import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

export default class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userID:null
        }
    }

    render(){
        return(
            <Container>
                <Grid>
                    <Row size={40}>
                        <ImageBackground source={require('../../images/sidebar-bg.jpg')} style={{width:'100%', height:'100%'}}></ImageBackground>
                    </Row>
                    <Row size={50}>
                        <Col>
                            <Card>
                                <CardItem>
                                <Body>
                                    <Text>Profile Here</Text>
                                </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                    <Row size={10}></Row>
                </Grid>
                    
                
            </Container>
        )
    }

}