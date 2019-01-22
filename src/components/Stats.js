import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class Stats extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style ={styles.valueStyle}>
                        {this.props.pagesReadToday}
                    </Text>
                    <Text style={styles.captionStyle} >
                        pages read today
                    </Text>
                </View> 
                <View>
                    <Text style={styles.valueStyle} >
                        {this.props.dailyTarget}
                    </Text>
                    <Text style={styles.captionStyle} >
                        daily target
                    </Text>
                </View>
                <View>
                    <Text style={styles.valueStyle} >
                        {this.props.totalPagesRead}
                    </Text>
                    <Text style={styles.captionStyle} >
                        total pages read
                    </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
    },
    valueStyle: {
        fontSize: 22,
        fontFamily: 'poppins-bold',
    },
    captionStyle: {
        color: 'black',
        fontSize: 12,
        fontFamily: 'poppins-regular',
        color: '#9e9e9e'
    }
})

const mapStateToProps = (state) => ({
    pagesReadToday: state.pagesReadToday,
    dailyTarget: state.dailyTarget,
    totalPagesRead: state.totalPagesRead
})

export default connect(mapStateToProps)(Stats)