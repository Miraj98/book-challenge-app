import firebase from './firestore/firestore';
import store from './redux/store';
import {syncUserHistory} from './redux/actions';

const syncReadHistory = () => {
    var userHistoryRef = firebase.firestore().collection('challenges').doc('meraki-01').collection(store.getState().userUid)
    console.log('Im Here!')
    var readingHistory = []
    userHistoryRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            readingHistory = [doc.data(), ...readingHistory]
        })
        readingHistory.sort((a,b) => (a.timestamp < b.timestamp))
        store.dispatch(syncUserHistory(readingHistory))
        console.log(store.getState().userHistory)
    })
}


export default syncReadHistory
