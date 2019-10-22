import React, {Component} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, ListItem, Left, Right, Icon, Card, CardItem, Thumbnail, Button, Body, Label} from 'native-base';
import PropTypes from 'prop-types';


export default class QuestionList extends Component {
    constructor(props){
        super(props);
    }
    static propTypes = {
        questions: PropTypes.array.isRequired
    };

    onPress = (questID)=>{
        this.props.onPress(questID);
    }

    render(){
        return(
            this.props.questions.map((data, index )=>{
                return(

              
                        <Card key={index}>

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
                        </CardItem>
                    </Card>
             
                    
                )
            })
        )
    }
}