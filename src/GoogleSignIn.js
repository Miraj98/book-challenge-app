import firebase from './firestore/firestore';
import * as Expo from 'expo';
import store from './redux/store';
import {updateUserUid, addDisplayName} from './redux/actions'
import syncAppStateWithCloud from './syncAppStateWithCloud';
import googleLoginConfig from './googleLoginConfig';

const googleLogin = async () => {

    try {

        //attempting to authenticate a user using GoogleAuthProvider and retreiving firebase credentials to update the app state
        console.log("Trying to re-authenticating a user.")
        const loginTokens = await Expo.Google.logInAsync(googleLoginConfig)
        const credentials = (loginTokens.type === 'success') ? (firebase.auth.GoogleAuthProvider.credential(loginTokens.idToken, loginTokens.accessToken)) : console.error('Failed retreiving Google login tokens')
        console.log("Got Auth Tokens...")
        const firebaseCredentials = await firebase.auth().signInAndRetrieveDataWithCredential(credentials)
        console.log("Authenticated on firebase successfully!")
        const firebaseUser = firebaseCredentials.user

        //dispatching actions to update app state
        store.dispatch(addDisplayName(firebaseUser.displayName))
        store.dispatch(updateUserUid(firebaseUser.uid))
        console.log("Dispatched actions: ", store.getState())

        //adding user to a challenge and initializing his/her score
        const docReference = firebase.firestore().doc('challenges/meraki-01')
        const doc = await docReference.get()
        console.log("Got document reference")
        let dailyProgress = doc.data().dailyProgress
        let totalPagesRead = doc.data().totalPagesRead
        let users = doc.data().users

        let userUid = store.getState().userUid
        let displayName = store.getState().displayName

        if(!(userUid in dailyProgress)) {
            const updates = await docReference.update({
                dailyProgress: {...dailyProgress, [userUid]: 0},
                users: [...users, { name: displayName, uid: userUid }],
                totalPagesRead: {...totalPagesRead, [userUid]: 0}
            })
            console.log("firestore updated with the user's data")

        }

    } catch(error) {

        console.error(error)

    }

}

// const googleLogin = async () => {
//     try {

//         var db = firebase.firestore()
//         var myChallengeRef = db.collection("challenges").doc("meraki-01")

//         const result = await Expo.Google.logInAsync({
//             behavior: __DEV__?'web':'system',
//             androidClientId: '421651532715-ko49v4dcdn57p2373f5fud57o750aok2.apps.googleusercontent.com',
//             iosClientId: '421651532715-r9csul8p0319gjl3ps67q2toi4gkae5j.apps.googleusercontent.com',
//             webClientId: '421651532715-oaqjb1jl4du2iec7lqr3ibih3eg50oc9.apps.googleusercontent.com',
//             scopes: ['profile','email'],
//         })

//         if(result.type === "success") {
//             const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
//             firebase.auth()
//             .signInAndRetrieveDataWithCredential(credential)
//             .then(res => {
//                 userUid = res.user.uid
//                 console.log(res.user.displayName)
//                 store.dispatch(addDisplayName(res.user.displayName))
//                 store.dispatch(updateUserUid(userUid))
//                 myChallengeRef.get().then(doc => {
//                     let dailyProgress = doc.data().dailyProgress
//                     let totalPagesRead = doc.data().totalPagesRead
//                     let users = doc.data().users
//                     console.log("Hey: " + dailyProgress)
//                     let userUid = store.getState().userUid
//                     let displayName = store.getState().displayName
//                     if(!(userUid in dailyProgress)) {
//                         myChallengeRef.update({
//                             dailyProgress: {
//                                 ...dailyProgress,
//                                 [userUid]: 0
//                             },
//                             users: [
//                                 ...users,
//                                 {name: displayName, uid: userUid}
//                             ],
//                             totalPagesRead: {
//                                 ...totalPagesRead,
//                                 [userUid]: 0
//                             }
//                         })
//                     }
//                     return syncAppStateWithCloud(doc.data())
//                 })
//             })
//         } else {
//             console.log('cancelled')
//         }

//     } catch (err) {
//         console.error(err)
//     }
// }

export default googleLogin