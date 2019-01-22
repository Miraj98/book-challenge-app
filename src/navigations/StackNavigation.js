import Progress from '../components/screens/Progress';
import AddEntry from '../components/screens/AddEntry';
import {createStackNavigator} from 'react-navigation';

const AppRoutes = {
    "Progress": Progress,
    "AddEntry": AddEntry,
}

export default createStackNavigator(AppRoutes)