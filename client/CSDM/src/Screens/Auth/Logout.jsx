import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Loading} from '../../Components';
import {LOGIN} from '../../Config/paths';
import {loginUser} from '../../Redux/actions/authActions';

const Logout = ({navigation}) => {
  let [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const logout = () => {
    setLoading(true);
    dispatch(loginUser({}));
    setTimeout(() => {
      setLoading(false);
      navigation.navigate(LOGIN);
    }, 5000);
    
  };
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#0077b6',
      }}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Button tittle="Log out " fun={logout} />
        {loading ? <Loading /> : null}
      </View>
    </View>
  );
};

export default Logout;
