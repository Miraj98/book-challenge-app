import React from 'react';
import { View, Button, StyleSheet, TextInput, Text } from 'react-native';
import store from '../../redux/store';
import {updatePagesReadToday, updateTotalPagesRead} from '../../redux/actions';
import firebase from '../../firestore/firestore';
import syncReadHistory from '../../syncReadHistory'

const MONTHS = ['January', 'February', 'March','April', 'May', 'June', 'July','August','September','October', 'November', 'December']

export default class AddEntry extends React.Component {
    state = {
        inputNumber: '',
        inputBookName: ''
    }

    static navigationOptions = {
        headerTitle: 'Add Entry',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#ff3d00',
        },
        headerTitleStyle: {
            color: 'white',
            fontFamily: 'poppins-bold',
        }
    }

    handleOnSubmit = () => {
        let date = new Date()
        let entryDate = `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
        let timestamp = date.getTime()
        console.log(entryDate)
        let bookName = this.state.inputBookName
        let IntPagesRead = parseInt(this.state.inputNumber)
        let pagesRead = (this.state.inputNumber !== '') ? IntPagesRead : 0
        store.dispatch(updatePagesReadToday(pagesRead))
        store.dispatch(updateTotalPagesRead(pagesRead))
        this.props.navigation.navigate('Progress')
        syncReadHistory()
        let challengeRef = firebase.firestore().collection('challenges').doc('meraki-01')
        challengeRef.get().then(doc => {
            if(doc.exists) {
                let totalPagesRead = doc.data().totalPagesRead
                challengeRef.update({
                    dailyProgress: {
                        ...doc.data().dailyProgress,
                        [store.getState().userUid]: store.getState().pagesReadToday 
                    },
                })
                challengeRef.collection(store.getState().userUid).add({
                    date: entryDate,
                    book: bookName,
                    pagesRead: pagesRead,
                    timestamp: timestamp
                })

                challengeRef.update({
                    totalPagesRead: {
                        ...totalPagesRead,
                        [store.getState().userUid]: store.getState().totalPagesRead
                    }
                })
            }
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.header}>
                   Add number of pages
                </Text>
                <TextInput
                    style={styles.inputBoxStyle}
                    keyboardType='numeric'
                    placeholder='Number of pages read'
                    value={this.state.inputNumber}
                    onChangeText={(inputNumber) => this.setState({inputNumber})} 
                />
                <TextInput
                    style={styles.inputBoxStyle}
                    placeholder="Book read"
                    value={this.state.inputBookName}
                    onChangeText={(inputBookName) => this.setState({inputBookName})} 
                />
                <Button
                title="SUBMIT"
                onPress={()=>this.handleOnSubmit()} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        fontSize: 24,
        fontFamily: 'poppins-bold',
    },
    inputBoxStyle: {
        backgroundColor: '#eeeeee',
        borderRadius: 4,
        marginTop: 24,
        marginBottom: 24,
        height: 50,
        padding: 12,
    }
})