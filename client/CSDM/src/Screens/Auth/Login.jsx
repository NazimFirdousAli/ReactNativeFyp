import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Loading} from '../../Components';
import {
  BLACK,
  DARK_GREEN,
  EmailChecker,
  FONT_SIZE,
  HEIGHT,
  INPUT_BORDER_COLOR,
  PLACEHOLDER_COLOR,
  TEXT_GRAY,
  WIDTH,
  WIDTH_AVG,
} from '../../Utils/constant';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {ADMIN, BOTTOMNAV, LOGIN, SIGNUP} from '../../Config/paths';
import {Home} from '../../Screens';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {AUTH} from '../../Utils/api';
import {errorMessage, LoginMessage} from '../../Utils/helpers';
import AsyncStorage from '@react-native-community/async-storage';
import {loginUser} from '../../Redux/actions/authActions';
import {useDispatch} from 'react-redux';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [isVisibale, setIsVisibale] = useState(true);
  let [isAccept, setIsAccept] = useState(false);
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const visible = () => {
    isVisibale ? setIsVisibale(false) : setIsVisibale(true);
  };

  const signin = () => {
    setLoading(true);
    if (!email || !password) {
      errorMessage('Please fill all field!');
      setLoading(false);
    } else if (!EmailChecker.test(email)) {
      errorMessage('Enter valid email!');
      setLoading(false);
    } else {
      let data = {
        email: email,
        password: password,
      };

      if (email === 'admin123@gmail.com' && password === 'admin123!') {
        navigation?.navigate(ADMIN, {
          isAdmin: true,
        });
      } else {
        axios
          ?.post(AUTH.LOGIN, data)
          .then(async res => {
            const {data} = res;
            if (data?.success) {
              dispatch(loginUser(data?.user));
              LoginMessage(data?.message);
              navigation?.navigate(Home, {
                isAdmin: false,
              });
              setLoading(false);
            } else {
              errorMessage("Invalid Credentials");
              console.log('runing');
              setLoading(false);
            }
          })
          .catch(e => {
            console.log('err', e);
            setLoading(false);
            errorMessage('Oops Something Went Wrong!');
          });
      }
    }
  };

  return (
    <ScrollView>
      <View style={loginStyle.main}>
        <View style={loginStyle.menuContainer}>
          <Text style={[loginStyle.login, {textAlign: 'center'}]}>
            Crowd Sourcing for {'\n'} Disaster Management{' '}
          </Text>

          <Text style={[loginStyle.login, {fontSize: 18}]}>Login</Text>
          <View style={loginStyle.avatar}>
            <Icon color={BLACK} name="user" size={140} />
          </View>
          <View style={loginStyle.inputContainer}>
            <TextInput
              style={loginStyle.input}
              placeholder="Email"
              autoComplete="email"
              keyboardType="email-address"
              value={email}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <View>
              <TextInput
                secureTextEntry={isVisibale}
                style={loginStyle.input}
                value={password}
                placeholder="Password"
                placeholderTextColor={TEXT_GRAY}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
              <TouchableOpacity
                onPress={visible}
                style={{
                  position: 'absolute',
                  right: 10,
                  width: 35,
                  height: 40,
                  bottom: 5,
                  justifyContent: 'center',
                }}>
                <Icons
                  name={!isVisibale ? 'eye' : 'eye-with-line'}
                  size={20}
                  style={{alignSelf: 'center', color: PLACEHOLDER_COLOR}}
                />
              </TouchableOpacity>
            </View>

            <Button fun={signin} tittle="Sign in" />

            <View style={{...loginStyle.notAccount}}>
              <Text style={{color: TEXT_GRAY}}>Create an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate(SIGNUP);
                }}>
                <Text style={{fontWeight: 'bold', color: BLACK}}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {loading ? <Loading /> : null}
    </ScrollView>
  );
};

export default Login;

const loginStyle = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: HEIGHT,
    backgroundColor: '#0077b6',
  },

  inputContainer: {
    paddingTop: 30,
    position: 'relative',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f6fff8',
  },
  FindIDText: {
    color: TEXT_GRAY,
    fontSize: FONT_SIZE,
  },
  input: {
    width: '100%',
    height: 51,
    borderWidth: 1,
    borderColor: INPUT_BORDER_COLOR,
    borderRadius: 5,
    alignSelf: 'center',
    paddingLeft: 20,
    marginTop: 10,
    color: BLACK,
    fontSize: FONT_SIZE,
  },
  guidance: {
    color: DARK_GREEN,
    fontSize: FONT_SIZE,
  },
  menuContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#f6fff8',

    elevation: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT - 200,
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 75,
    width: 75,
    borderRadius: 40,
  },
  profileImg: {
    height: 75,
    width: 75,
    borderRadius: 40,
  },
  notAccount: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 10,
  },
  avatar: {
    top: 5,
  },
  login: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BLACK,
  },
});
