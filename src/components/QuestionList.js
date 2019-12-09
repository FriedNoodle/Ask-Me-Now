import React, {Component} from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { Text, ListItem, Left, Right, Icon, Card, CardItem, Thumbnail, Button, Body, Label} from 'native-base';
import PropTypes from 'prop-types';
import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';

let questRef = db.ref('questions');

export default class QuestionList extends Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            questions:[],
            deleted:0
            
        }
    }
    static propTypes = {
        questions: PropTypes.array.isRequired
    };

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    onPress = (questID)=>{
        this.props.onPress(questID);
    }

    deleteQuestion(value){
        
        Alert.alert('Warning',
            'Delete Question?',[
            {text: 'Yes', onPress: ()=> 
            setTimeout(()=>{
                let query = questRef.child(value)
                query.remove();
                this.setState({
                    deleted:1
                })
            },1000)
                
            },
            {text:'No', style: 'cancel'},
        ],
        {
            cancelable:false
        }),
        ()=> Actions.refresh();
        
    }

    render(){
        return(
            this.props.questions.map((data, index )=>{
                return(

                        <Card key={index} style={{padding:5, borderRadius:10}}>

                        <CardItem>
                            <Text>{data.ques} </Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text note>Answer : {data.answer}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent onPress={()=> this.onPress(data.questID)}>
                                    <Icon active name="chatbubbles"></Icon>
                                    <Text>Reply</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent onPress={()=> this.deleteQuestion(data.questID)}>
                                    <Icon style={{color:'red'}}
                                    type="MaterialIcons" name="delete-forever"></Icon>
                                    <Text style={{color:'red'}}>Delete</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
             
                    
                )
            })
        )
    }
}