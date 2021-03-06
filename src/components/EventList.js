import React, {Component} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, ListItem, Left, Right, Icon, Card, CardItem, Thumbnail, Button, Body} from 'native-base';
import PropTypes from 'prop-types';


export default class EventList extends Component {
    constructor(props){
        super(props);
    }
    static propTypes = {
        events: PropTypes.array.isRequired
    };

    onPress = (randID,name)=>{
        this.props.onPress(randID,name)
    }

    render(){
        return(
            this.props.events.map((data, index )=>{
                return(
                    <TouchableOpacity key={index}
                     onPress={()=> this.onPress(data.randID,data.name)}
                     activeOpacity={.7}>
                        <Card style={{borderRadius:10}}>
                        <CardItem cardBody style={{borderTopLeftRadius:10,borderTopRightRadius:10}}>
                            <Image source={{uri:data.url}} style={{height: 180, width: null, flex:1, borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                        </CardItem>
                        <CardItem style={{borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                        <Left>
                            <Thumbnail source={require('../../images/event-icon.png')} />
                            <Body>
                            <Text>{data.name}</Text>
                            <Text note>{data.date}</Text>
                            <Text note>Speaker: {data.speakerName}</Text>
                            </Body>
                        </Left>
                        </CardItem>
                    </Card>
                    </TouchableOpacity>
                    
                )
            })
        )
    }
}