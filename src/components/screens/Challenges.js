import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../../firestore/firestore';
import {syncAppStateWithCloudRealTime} from '../../syncAppStateWithCloud';
import OtherChallengers from '../OtherChallengers.js';

class Challenges extends React.Component {

    componentDidMount() {
        var db = firebase.firestore().collection("challenges").doc("meraki-01")
        db.onSnapshot(doc => {
            syncAppStateWithCloudRealTime(doc.data())
        })
    }

    render() {
        return(
            <View style={styles.container} >
                <Text style={styles.header} >
                    OTHER'S PROGRESS:
                </Text>
                <View style={{paddingBottom: 16}}>
                {this.props.challengers.map((challenger, index) => (<OtherChallengers key={index} challenger={challenger} />))}
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    dailyTarget: state.dailyTarget,
    challengers: state.challengers
})

export default connect(mapStateToProps)(Challenges)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    header: {
        fontSize: 20,
        padding: 8,
        fontFamily: 'poppins-bold',
    }
})