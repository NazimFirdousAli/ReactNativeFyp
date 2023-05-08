import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Logout from '../../Screens/Auth/Logout';
import { Admin } from '../../Screens';

const BottomNavAdmin = ({route}) => {
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
      <Screen name="All Data" component={Admin} />
      <Screen name="Log out" component={Logout} />
    </Navigator>
  );
};

export default BottomNavAdmin;
