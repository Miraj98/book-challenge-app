import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {Constants} from 'expo';
import {connect} from 'react-redux';
import syncReadHistory from '../../syncReadHistory';


const EntryCard = (props) => (
    <View style={styles.card}>
        <Text style={styles.date}>
            {props.date}
        </Text>
        <Text style={styles.bookName}>
            {props.book}
        </Text>
        <Text style={styles.pagesRead}>
            {props.pagesRead} pages read
        </Text>
    </View>
)

class HistoryScreen extends React.Component {

    componentDidMount() {
        syncReadHistory()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Your reading history
                </Text>
                <FlatList
                    data={this.props.userHistory}
                    renderItem={({item}) => (<EntryCard {...item} key={item.id}/>)}
                    keyExtractor={ ( item, index ) => `${index}` }/>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    userHistory: state.userHistory
})

export default connect(mapStateToProps)(HistoryScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight+24,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#eee'
    },
    header: {
        fontSize: 24,
        fontFamily: 'poppins-bold',
    },
    card: {
        marginTop: 12,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    date: {
        margin: 12,
        marginBottom: 6,
        fontSize: 16,
        fontFamily: 'poppins-bold'
    },
    pagesRead: {
        margin: 12,
        marginTop: 2,
        fontSize: 10,
        fontFamily: 'poppins-regular'
    },
    bookName: {
        margin: 12,
        marginTop: 6,
        fontSize: 12,
        fontFamily: 'poppins-semibold'
    }
})