import React, {Component} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, ListItem, Left, Right, Icon, Card, CardItem, Thumbnail, Button, Body, Label} from 'native-base';
import PropTypes from 'prop-types';


export default class GuestQuestionList extends Component {
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
                        </CardItem>
                    </Card>
             
                    
                )
            })
        )
    }
}