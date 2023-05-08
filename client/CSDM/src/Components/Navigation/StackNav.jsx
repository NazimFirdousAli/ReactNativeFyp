// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGIN, SIGNUP, BOTTOMNAV, ADMIN, FUNDRAISING } from '../../Config/paths';
import { Admin, Login, SignUp } from '../../Screens'
import BottomNav from './BottomNav';
import { useSelector } from 'react-redux';
import FundRaising from '../../Screens/Home/FundRaising';
import BottomNavAdmin from './BottomNavAdmin';
const { Navigator, Screen } = createNativeStackNavigator();



const StackNav = () => {
    const states = useSelector(state => state)
    let userId = states?.authReducer?.user?._id;

    let obj = {
        headerShown: false,
        presentation: 'modal',
    };

    return (
        <NavigationContainer>
            <Navigator initialRouteName={userId ? BOTTOMNAV : LOGIN} screenOptions={obj}>
                <Screen name={ADMIN} component={BottomNavAdmin} />
                <Screen name={BOTTOMNAV} component={BottomNav} />
                <Screen name={LOGIN} component={Login} />
                <Screen name={SIGNUP} component={SignUp} />
            </Navigator>
        </NavigationContainer >
    );
}

export default StackNav;