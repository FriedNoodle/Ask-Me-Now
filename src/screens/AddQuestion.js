import React ,{ Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Header, Text, Body, Title, Card, CardItem, Form, Textarea, Left, Button, Icon, Toast, Root } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';

let questRef = db.ref('questions');
//const eventID = this.props.randID;

export default class AddQuestion extends Component{

    constructor(props){
        super(props);
        this.state = {
            question:null,
            questID:null,
            eventUID:this.props.eventID,
            answer:'',
            name:null,
            showToast:false
        }

        
    }

    setQuestion = (value) => {
        this.setState({
            question: value
        })
    }

    createQuestion(){
        if(this.state.question){
            var uniqueID = db.ref().push().getKey();
            questRef.child(uniqueID).set({
            eventUID:this.state.eventUID,
            ques:this.state.question,
            answer: this.state.answer,
            questID: uniqueID
        }),Toast.show({
            text:"Question posted!",
            buttonText:"Okay",
            type:"success"
        }),
        setTimeout(()=>Actions.pop(),2500)
        }
        else{
            Alert.alert('Alert!','No question posted.')
        }
        


    }

    render(){
       

        
        return(
            <Root>
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
                        <Title>Ask a Question</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Card style={{padding:5, borderRadius:10}}>
                        <CardItem>
                            <Body>
                                <Form>
                                    <Textarea rowSpan={8} 
                                            placeholder="Type your question"
                                             onChangeText={this.setQuestion}></Textarea>

                                </Form>
                                <Button iconLeft block onPress={this.createQuestion.bind(this)}>
                                        <Icon name="md-send"></Icon>
                                        <Text>Send</Text></Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
            </Root>
            
        )
    }
}