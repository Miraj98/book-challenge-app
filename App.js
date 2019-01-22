import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import {Font} from 'expo';
import store from './src/redux/store';
import SwitchRoutes from './src/navigations/SwitchNavigation';


const AppNavigator = createSwitchNavigator(SwitchRoutes, {initialRouteName: 'StartScreen'})

const App = createAppContainer(AppNavigator)

export default class Meraki extends React.Component {

    async componentDidMount() {
        await Font.loadAsync({
            'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
            'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
            'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf')
        })

        console.log('Font loaded!')
    }

    render() {
        return (
            <Provider store={store} >
                <App />
            </Provider>
        )
    }
}


