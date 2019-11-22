/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';



//Geocoder.setApiKey("AIzaSyBhXCRfaBvE7k6_-Aw5Jh5t0X9anNJxSdE");

export default class Test extends Component {
  constructor(){
    super();
    this.state = {
        lat:null,
        long:null
    };        
}

  getLocation(){
    Geocoder.geocodeAddress('Masjid Sultan Haji Ahmad Shah, IIUM').then(res => {
      res.map((element)=>{
        this.setState({
          lat:element.position.lat,
          long:element.position.lng
        })
      })
      console.log(res);
      // res is an Array of geocoding object (see below)
  })
  }
  render(){
    return(
      <View>
        <Text>{this.state.lat}</Text>
        <Text>{this.state.long}</Text>
        <TouchableHighlight onPress={()=>this.getLocation()}><Text>testa</Text></TouchableHighlight>
       
      </View>
    )
  }
}

