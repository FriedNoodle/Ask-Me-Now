import React, { Component } from 'react';
import { Alert , View, StyleSheet, PermissionsAndroid, Image} from 'react-native';
import { Container, Header, Content, Body, Text, Left, Right,
        Card, CardItem, Title, Grid, Row, Col,Form, Label, Item, Input, Icon, Button, ActionSheet, Root} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';
import MapView, { Marker, Callout, Overlay } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

let eventRef = db.ref('/events');
let markerRef = db.ref('/users');

//Var for ActionSheets
var BUTTONS = ["Admin Login","Cancel"];
var CANCEL_INDEX = 1;

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Ask Me Now Location Permission',
        message:
        'Ask Me Now needs access to your device location' +
        'so you can find nearby mosques.',
        buttonNegative:'Cancel',
        buttonPositive: 'OK'
      },      
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED){
      console.log('You can use the device location');
    }
    else {
      console.log('Device location permission denied');
    }
  }
  catch (err){
    console.warn(err);
  }
}
export default class JoinEventScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: [],
      name:null,
      randID:null,
      joinID:null,
      mapRegion:null,
      initialLocation:null,
      gpsAccuracy:null,
      tracksViewChanges:false,
      markers:[],
    };
    
    
    this.joinEvent = this.joinEvent.bind(this);
  }
  
  async componentDidMount(){
    
    await requestLocationPermission();
    this.watchID = Geolocation.getCurrentPosition((position)=>{
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }

      this.onRegionChange(region,position.coords.accuracy)
      this.setInitialLocation(region);
      
    },
    (error)=>{
      console.log(error);
      Alert.alert('Warning!','Please enable location services!')
    }),
    markerRef.on('value', (snapshot) => {
      let data = snapshot.val();
      if(data){
          let firebaseData = Object.values(data);
          this.setState({markers: firebaseData});
      }
  });
  }

  setInitialLocation(region){
    this.setState({
      initialLocation:region
    })
  }

  componentWillUnmount(){
    Geolocation.clearWatch(this.watchID);
  }

  //Map Marker Optimization. (Track changes to marker pins)
  componentDidUpdate(prevProps) {
    if (prevProps.coordinate !== this.props.coordinate // set true only when props changed
        || prevProps.value !== this.props.value 
        || prevProps.level !== this.props.level) {
        this.setState({tracksViewChanges: true})
    } else if (this.state.tracksViewChanges) {
       // set to false immediately after rendering with tracksViewChanges is true
        this.setState({tracksViewChanges: false})
    }
}

  onRegionChange = (region, gpsAccuracy)=>{
    this.setState({
      mapRegion: region,
      gpsAccuracy: gpsAccuracy
    });
  }

  joinEvent(){

    if(this.state.joinID){
      let query = eventRef.orderByChild("randID").equalTo(parseInt(this.state.joinID))
      query.once('value', (snapshot)=>{
      if(snapshot.exists()){
        let userData = snapshot.val();
        let firebaseData = Object.values(userData);
        this.setState({events:firebaseData},()=>{
          this.state.events.map((element)=>{
            this.setState({
              name:element.name,
              randID:element.randID
            })
          })
        });
        //Redirect to GuestScreen with props(randID,eventName)
        Actions.GuestScreen({randID:this.state.randID,eventName:this.state.name});

        console.log(this.state.randID)
      }
      else {
        Alert.alert('Sorry!', 'There is no such active event right now')
        
      }
    })
    }
    else {
      Alert.alert('Error!','Please enter a valid 6 digit event ID')
    }
    
  }

  setRandID = (value) =>{
    this.setState({joinID:value,randID:value});
    
  }

  render() {

    return (
      <Root>
        <Container>
        <Header androidStatusBarColor="#A026B5"
          style= {{backgroundColor:'#a438b6'}}>
        <Left />
        <Body>
          <Title style={{fontSize:16}}>Mosque near Me</Title>
        </Body>
        <Right>
          <Button transparent onPress={()=> ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              title:"Select an option",
            },
          
            (buttonIndex)=>{
              if(buttonIndex === 0){
                Actions.LoginScreen();
              }
            }
          )}>
            <Icon name='md-person'></Icon>
          </Button>
        </Right>
        </Header>
        
        
        
           
            <View style={styles.container}>
            <MapView.Animated
              
              style={styles.map}
              initialRegion={this.state.mapRegion}
              onRegionChange={this.onRegionChange.bind(this)}
              loadingEnabled = {true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              moveOnMarkerPress = {false}
              showsUserLocation={true}
              showsCompass={true}
              followsUserLocation={true}
              showsMyLocationButton={true}
              toolbarEnabled={true}
              showsPointsOfInterest = {false}
            >
              {this.state.markers.map((marker,index)=>{
                
                if(marker.latitude){
                  return (<MapView.Marker key={index}
                  coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
                  tracksViewChanges={this.state.tracksViewChanges}
                  >
                    <MapView.Callout
                      onPress={()=>Actions.MosqueTab({userID:marker.userID,mosqueName:marker.name})}>
                      <Card style={{width:200}}>
                        <CardItem header style={{paddingBottom:-20}}><Text style={{fontSize:11, color:'blue'}}>{marker.name}</Text></CardItem>
                        <CardItem><Text style={{fontSize:11}}>Press to view events.</Text></CardItem>
                      </Card>
                    </MapView.Callout>
                  
                  
                </MapView.Marker>
                )
                }
                
              })}
                
            
            </MapView.Animated>
          </View>
     
            <Overlay
              style={{position:'absolute',bottom:10, width:'100%'}}>
                
                <Content padder>
              <Card transparent style={{borderRadius:15,
                    marginBottom:-10,
                    paddingTop:-15}}>
                
                <CardItem style={{borderTopLeftRadius:15,
                                  borderTopRightRadius:15,
                                  borderBottomLeftRadius:15,
                                  borderBottomRightRadius:15,
                                  }}>
                <Form>
                  <Grid>
                    <Col size={10}></Col>
                    <Col size={80}>
                    <CardItem><Text style={{color:'green',textAlign:'center'}}>Want to join an event?</Text></CardItem>
                    </Col>
                    <Col size={10}></Col>
                  </Grid>
                  
                  <CardItem style={{borderBottomLeftRadius:15,
                                    borderBottomRightRadius:15,
                                    paddingTop:-15,
                                    paddingBottom:-15}}>
                    <Item rounded style={{backgroundColor:'white'}}>
                    <Icon name='md-finger-print' /><Input placeholder='enter event ID here'
                          keyboardType='numeric'
                          maxLength={6}
                          onChangeText={this.setRandID}></Input>
                          <Item style={{borderColor:'transparent'}}>
                            <Button icon
                                    transparent
                                    onPress={this.joinEvent}>
                              <Icon name='md-arrow-round-forward'/>
                            </Button>
                          </Item>
                          </Item> 
                  </CardItem>
              </Form>
                </CardItem>
              </Card>

              </Content>
              </Overlay>
            
              
            
       
          
       
      </Container>
      </Root>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    
    ...StyleSheet.absoluteFillObject,
  },
 });