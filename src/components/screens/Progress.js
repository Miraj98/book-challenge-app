import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import TodayProgress from '../TodayProgress';
import Challenges from './Challenges';
import {Constants} from 'expo';
import {connect} from 'react-redux';

class Progress extends React.Component {
    static navigationOptions = {
          header: null,
    }

    handleAddEntryPress = () => {
        this.props.navigation.navigate('AddEntry')
    }

    render() {
          return(
              <ScrollView style={styles.container}>
              <View style={{backgroundColor: 'white', paddingTop: Constants.statusBarHeight + 40,}}>
                    <Image
                    source={require('../../../assets/iron-man.jpg')}
                    style={styles.imageStyling} />
                    <Text style={styles.nameStyling}>{this.props.displayName}</Text>
                    <Text style={styles.profileDescription}>Novice reader</Text>
                    <TodayProgress/>
                    <View style={styles.addEntryView}>
                        <TouchableOpacity
                            style={styles.addEntryButton}
                            onPress={() => this.handleAddEntryPress()}>
                            <Text style={styles.addEntryButtonText} >
                                + NEW ENTRY
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Challenges />
              </ScrollView>
          )
      }
}

const mapStateToProps = state => ({
    displayName: state.displayName
})

export default connect(mapStateToProps)(Progress)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    imageStyling: {
        height: 80,
        width: 80,
        margin: 12,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
    },
    nameStyling: {
        fontSize: 28,
        fontFamily: 'poppins-bold',
        marginLeft: 12,
        paddingBottom: -2,
    },
    profileDescription: {
        color: '#9e9e9e',
        fontFamily: 'poppins-regular',
        fontSize: 12,
        marginLeft: 12,
    },
    addEntryView: {
        marginRight: 12,
        marginLeft: 12,
    },
    addEntryButton: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 24,
    },
    addEntryButtonText: {
        color: '#0277bd',
        fontSize: 12,
    },
});