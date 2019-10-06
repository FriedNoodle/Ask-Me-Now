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
export const addEvent = (name, randID, date,location,speakerName,speakerProfile, summary) =>{
    db.ref('/events').child(randID).set({
        name:name,
        randID:randID,
        date:date,
        location:location,
        speakerName:speakerName,
        speakerProfile:speakerProfile,
        summary:summary
    }, ()=> Actions.EventScreen());
}
