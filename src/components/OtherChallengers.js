import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import store from '../redux/store';

class OtherChallengers extends React.Component {

    textStyle = () => (this.props.challenger.progress > store.getState().dailyTarget)

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>
                    {this.props.challenger.name}
                </Text>
                <Text style={[styles.score, {color: `${this.textStyle()?'green':'red'}`}]}>
                    read {this.props.challenger.progress} pages today 
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 4,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 2,
        marginBottom: 2
    },
    label: {
        margin: 12,
        marginBottom: 6,
        fontSize: 16,
        fontFamily: 'poppins-bold'
    },
    score: {
        margin: 12,
        marginTop: 6,
        fontSize: 12,
        fontFamily: 'poppins-regular'
    }
})

export default OtherChallengers