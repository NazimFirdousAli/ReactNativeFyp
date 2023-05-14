import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Add,
  AddMissingPerson,
  AddVolunteer,
  AllData,
  Home,
  Setting,
} from '../../Screens/index';
import Logout from '../../Screens/Auth/Logout';
import FundRaising from '../../Screens/Home/FundRaising';
import {View} from 'react-native';

const BottomNav = ({route}) => {
  const {Navigator, Screen} = createDrawerNavigator();
  const [isAdmin, setisAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = route?.params?.isAdmin;
    if (data !== undefined) {
      setisAdmin(data);
    }
  }, []);

  return (
    <Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#90e0ef',
          width: 240,
        },
        drawerActiveBackgroundColor: '#caf0f8',
        drawerActiveTintColor: 'grey',
        drawerContentContainerStyle: {marginTop: 100},
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="Shelter" component={Add} />
      <Screen name="Volunteer" component={AddVolunteer} />
      <Screen name="Missing Person" component={AddMissingPerson} />
      <Screen name="Fund Raising" component={FundRaising} />
      <Screen name="All Data" component={AllData} />
      <Screen name="My Cards" component={Setting} />
      <Screen name="Log out" component={Logout} />
    </Navigator>
  );
};

export default BottomNav;
