import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Fab, Title,List } from 'native-base';
import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';
import GuestQuestionList from '../components/GuestQuestionList';

let questRef = db.ref('questions');


export default class GuestQuestScreen extends Component {
    constructor(){
        super();
        this._isMounted = false;
        this.state = {
            questions:[],
            questID:null,
            question:null,
            answer:null,
            eventUID:null
        };
    }
    componentDidMount(){
        this._isMounted = true;
        let query = questRef.orderByChild('eventUID').equalTo(this.props.eventID);
        query.on('value', (snapshot) => {
            let data = snapshot.val();
            if(data){
                let firebaseData = Object.values(data);
                if(this._isMounted){
                    this.setState({questions: firebaseData},()=>{
                        this.state.questions.map((element)=>{
                            this.setState({
                                questID: element.questID,
                                question: element.ques,
                                eventUID: element.eventUID,
                                answer: element.answer,
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
                <GuestQuestionList questions={this.state.questions} onPress={(questID)=> {Actions.AnswerScreen({questID:questID,eventName:this.props.eventName})}} />

                </Content>
   
            </Container>
        )
    }
}