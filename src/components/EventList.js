import React, {Component} from 'react';
import { Image } from 'react-native';
import { Text, ListItem, Left, Right, Icon, Card, CardItem, Thumbnail, Button, Body} from 'native-base';
import PropTypes from 'prop-types';

export default class EventList extends Component {
    static propTypes = {
        events: PropTypes.array.isRequired
    };

    render(){
        return(
            this.props.events.map((data, index )=>{
                return(
                    <Card key={index}>
                        <CardItem cardBody>
                            <Image source={require('../../images/masjid.jpg')} style={{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem button onPress={()=> alert("This is card")}>
                            <Left>
                                <Thumbnail source={require('../../images/event-icon.png')} />
                                <Body>
                                <Text>{data.name}</Text>
                                <Text note>{data.date}</Text>
                                <Text>Speaker: {data.speakerName}</Text>
                                </Body>
                            </Left>
                    </CardItem>
                    </Card>
                )
            })
        )
    }
}