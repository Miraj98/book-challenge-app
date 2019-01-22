import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const resetDailyProgress = functions.https.onRequest((request, response) => {
    const docRef = admin.firestore().doc('challenges/meraki-01').get()
    let dailyProgress
    const isSnapshot = docRef.then(snapshot => {
        dailyProgress = snapshot.data().dailyProgress
        Object.keys(dailyProgress).forEach(key => {
            dailyProgress[key] = 0
        })

        const forUpdateRef = admin.firestore().doc('challenges/meraki-01').update({
            dailyProgress: dailyProgress
        })

        forUpdateRef.catch(error => {
            response.send("Error updating firestore: " + error)
        })

        const newDocRef = admin.firestore().doc('challenges/meraki-01').get()
        const ifPromiseResolved = newDocRef.then(doc => {
            const newDailyProgress = doc.data().dailyProgress
            response.send("Updated firestore data: " + newDailyProgress)
        })
        ifPromiseResolved.catch(error => {
            response.send("Unable to fetch firestore data after a probable succesful update firestore data")
        })

    })
    isSnapshot.catch(error => {
        response.status(500).send(error)
    })


})
