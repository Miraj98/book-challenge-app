import {createBottomTabNavigator} from 'react-navigation';
import ProgressStack from './StackNavigation';
import HistoryScreen from '../components/screens/HistoryScreen';
import {Ionicons} from 'react-native-vector-icons'
import React from 'react';


const AppRoutes = {
    "Main": ProgressStack,
    "Reading History": HistoryScreen
}

const Tabs = createBottomTabNavigator(AppRoutes)

ProgressStack.navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
        <Ionicons 
            name={`ios-contact`}
            size={32}
            color={tintColor}
            style={{paddingTop: 4}}
        />
    )
}

HistoryScreen.navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
        <Ionicons
            name={`ios-options`}
            size={32}
            color={tintColor}
            style={{paddingTop: 4}}

        />
    )
}

export default Tabs