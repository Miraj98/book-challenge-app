import React from 'react';
import {View} from 'react-native';
import firebase from '../../firestore/firestore';
import {syncAppStateWithCloudRealTime} from '../../syncAppStateWithCloud';
import store from '../../redux/store';
import {updateUserUid, addDisplayName} from '../../redux/actions';

export default class StartScreen extends React.Component {
    componentDidMount() {
        console.log("StartScreen mounted successfully :) ")
        console.log("checking auth state...")
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log("User previously logged in. Using data stored in aysnc storage to authenticate user...")
                console.log(user)
                store.dispatch(updateUserUid(user.uid))
                store.dispatch(addDisplayName(user.displayName))
                console.log("Dispatched actions: Updated user uid and display name")
                var db = firebase.firestore()
                var challengeRef = db.collection('challenges').doc('meraki-01')
                challengeRef.get().then(doc => {
                    console.log("Starting sync with firestore...")
                    syncAppStateWithCloudRealTime(doc.data())
                    console.log("Sync complete !")
                })
                this.props.navigation.navigate('Tabs')
            } else { 
                console.log("User data not available to authenticate directly. Redirecting to 'Log In' page")
                this.props.navigation.navigate('SignIn')
            }
        })
    }

    componentWillUnmount() {
        console.log("StartScreen unmounting...")
    }

    render() {
        return (
            <View/>
        )
    }
} 