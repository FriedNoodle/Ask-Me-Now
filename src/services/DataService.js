/**
 * Handle CRUD operations
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

/**Function to add new event to database */
export const addEvent = (name, randID, date, userID,speakerName,speakerProfile, summary) =>{
    db.ref('/events').child(randID).set({
        name:name,
        randID:randID,
        date:date,
        userID:userID,
        speakerName:speakerName,
        speakerProfile:speakerProfile,
        summary:summary
    }, ()=>
    setTimeout(()=>(Actions.EventScreen(),Alert.alert('Success!','You have created an event.')),1500) );
}

//**Function to update event details */
export const updateEvent = (name, randID, date,location,speakerName,speakerProfile, summary) => {
    db.ref('/events').child(randID).update({
        name:name,
        date:date,
        location:location,
        speakerName:speakerName,
        speakerProfile:speakerProfile,
        summary:summary
    }, ()=> Actions.EventScreen());
}

//**Function to post answers by admin */
export const addAnswer = (questID,answer,eventUID,name) => {
    db.ref('/questions').child(questID).update({
        answer:answer
    }, ()=> Actions.EventDetails({randID:eventUID,eventName:name}));
}

//**Function to update profile by admin */
export const updateProfile = (userID,name,address,lat,long) => {
    db.ref('/users').child(userID).update({
        name:name,
        address:address,
        latitude:lat,
        longitude:long
    }, ()=> Alert.alert('Success!','Profile Updated.'));
}
