/**
 * Handle CRUD operations
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';


/**Function to add new event to database */
export const addEvent = (name, randID, date, userID, location,speakerName,speakerProfile, summary) =>{
    db.ref('/events').child(randID).set({
        name:name,
        randID:randID,
        date:date,
        userID:userID,
        location:location,
        speakerName:speakerName,
        speakerProfile:speakerProfile,
        summary:summary
    }, ()=> Actions.EventScreen());
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
