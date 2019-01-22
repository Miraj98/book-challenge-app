import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Linking } from 'react-native';
import googleSignIn from '../../GoogleSignIn';
import {connect} from 'react-redux';

class SignIn extends React.Component {

    static navigationOptions = {
        header: null,
    }

    componentDidUpdate(prevProps) {
        if(this.props.isSyncComplete) this.props.navigation.navigate('Progress')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.child}
                onPress={() => {
                    googleSignIn()
                }}
                >
                    <Text style={styles.label} >
                        LOG IN WITH BITS MAIL
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isSyncComplete: state.isSyncComplete
})

export default connect(mapStateToProps)(SignIn)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    child: {
        backgroundColor: '#ff7043',
        padding: 24,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
})