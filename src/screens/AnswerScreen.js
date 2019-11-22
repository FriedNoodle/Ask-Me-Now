import React, {Component} from 'react';
import { Text,Form, Item, Input, Label, Container, Content, Header, Left, Body, Right, Title, Textarea, Card, CardItem, Icon, Button, Grid, Col, Row} from 'native-base';
import {db} from '../config/db';
import {addAnswer} from '../services/DataService';
import { Actions } from 'react-native-router-flux';

let ansRef = db.ref('questions');

export default class AnswerScreen extends Component{

    constructor(){
        super();
        this.state = {
            questions:[],
            questID:null,
            eventUID:null,
            question:null,
            answer:null,
            name:null
        };        
    }

    //Setter Functions
    setAnswer = (value) =>{
        this.setState({ answer: value});
    }

    saveAnswer = ()=>{
       
        if(this.state.answer){
            //Save input to database
            addAnswer(this.state.questID,this.state.answer, this.state.eventUID,this.props.eventName)
                
            }
            else {
                Alert.alert('Status', 'Empty Field(s)!')
            }
        }
        
    //Sync with database on Question node
    componentDidMount(){
        let query = ansRef.orderByChild('questID').equalTo(this.props.questID);
        query.on('value', (snapshot) => {
            let data = snapshot.val();
            if(data){
                let firebaseData = Object.values(data);
                this.setState({questions: firebaseData},()=>{
                    this.state.questions.map((element)=>{
                        this.setState({
                            questID: element.questID,
                            eventUID: element.eventUID,
                            question: element.ques,
                            qtext: element.qtext,
                            answer: element.answer,
                        });
                    });
                });
            }
        });
    }

    render(){

        const name = this.props.eventName;
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
                    <Title>Reply</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card style={{padding:5, borderRadius:10}}>
                        <CardItem>
                        <Left>
                            <Icon active name="chatbubbles"></Icon>
                            <Text note style={{fontSize:14}} >{this.state.question}</Text>
                        </Left></CardItem>
                    </Card>
                   
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Type your answer"
                            value={this.state.answer}
                            onChangeText={this.setAnswer}
                            style={{fontSize:14, borderRadius:10}} />
                    </Form>
                    <Grid>
                        <Col size={40} style={{padding:5}}>
                            <Button style={{marginTop: 10,justifyContent:"center",backgroundColor:'green'}} onPress={this.saveAnswer}>
                                <Text style={{fontWeight: "bold"}}>Post</Text>
                            </Button>
                        </Col>
                        <Col size={40} style={{padding:5}}>
                            <Button style={{marginTop: 10,justifyContent:"center",backgroundColor:'red'}} onPress={()=> Actions.pop()}>
                                <Text style={{fontWeight: "bold"}}>Cancel</Text>
                            </Button>
                        </Col>
                    </Grid>
                    
                            
                </Content>
            </Container>
        )
    }
}