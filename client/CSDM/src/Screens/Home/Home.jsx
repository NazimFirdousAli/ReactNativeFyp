import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FUNDRAISING} from '../../Config/paths';
import {BLACK, HEIGHT, LIGHT_BLUE, WHITE} from '../../Utils/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation}) => {
  return (
    <View style={loginStyle.main}>
      <View style={{width: '80%'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Shelter');
          }}
          style={loginStyle.btn}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name={'night-shelter'}
              size={30}
              style={{alignSelf: 'center', color: 'red'}}
            />

            <Text style={loginStyle.buttonText}>Shelter</Text>
          </View>
        </TouchableOpacity>
        <Text>{'\n'}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(FUNDRAISING);
          }}
          style={loginStyle.btn}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'cash-refund'}
              size={30}
              style={{alignSelf: 'center', color: 'red'}}
            />
            <Text style={loginStyle.buttonText}>Fund Raising</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text>{'\n'}</Text>
      <View style={{width: '80%'}}>
        <TouchableOpacity
          style={loginStyle.btn}
          onPress={() => {
            navigation.navigate('Missing Person');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name={'person-pin'}
              size={30}
              style={{alignSelf: 'center', color: 'red'}}
            />
            <Text style={loginStyle.buttonText}>Missing Person</Text>
          </View>
        </TouchableOpacity>
        <Text>{'\n'}</Text>

        <TouchableOpacity
          style={loginStyle.btn}
          onPress={() => {
            navigation.navigate('Volunteer');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name={'volunteer-activism'}
              size={30}
              style={{alignSelf: 'center', color: 'red'}}
            />
            <Text style={loginStyle.buttonText}>Volunteer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const loginStyle = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: HEIGHT,
    backgroundColor: '#0077b6',
  },

  btn: {
    width: '100%',
    backgroundColor: '#caf0f8',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: BLACK,
    fontSize: 16,
    marginLeft: 10,
    width: 120,
    // width:'100%',
  },
});
