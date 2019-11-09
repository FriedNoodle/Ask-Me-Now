import React ,{ Component } from 'react';
import { Container, Content, Header, Text, Body, Title, Card, CardItem, Form, Textarea, Left, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AddQuestion extends Component{

    constructor(props){
        super(props);
        this.state = {
            question:null,
        }
    }

    render(){
        return(
            <Container>
                <Header 
                    androidStatusBarColor="#2f8c9c"
                    style= {{backgroundColor:'#3297a8'}}>
                    <Left>
                        <Button transparent onPress={()=> Actions.pop()}>
                            <Icon name='arrow-back' />
                        </Button> 
                    </Left>
                    <Body>
                        <Title>Ask a Question</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                <Form>
                                    <Textarea rowSpan={8} placeholder="Type your question"></Textarea>
                                    <Button block><Text>Send</Text></Button>
                                </Form>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}