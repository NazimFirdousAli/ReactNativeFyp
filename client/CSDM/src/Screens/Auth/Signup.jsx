import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
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
  PhoneNumberRegex,
  PLACEHOLDER_COLOR,
  TEXT_GRAY,
  WIDTH,
  WIDTH_AVG,
} from '../../Utils/constant';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {errorMessage, successMessage} from '../../Utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../Config/paths';
import {AUTH} from '../../Utils/api';

const SignUp = () => {
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');
  let [lastName, setLastName] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [address, setAddress] = useState('');
  let [number, setNumber] = useState(null);
  let [isVisibale, setIsVisibale] = useState(true);
  let [isVisibale2, setIsVisibale2] = useState(true);
  let [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const resetFeild = () => {
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAddress('');
    setNumber(null);
  };

  const visible = () => {
    isVisibale ? setIsVisibale(false) : setIsVisibale(true);
  };
  const visible2 = () => {
    isVisibale2 ? setIsVisibale2(false) : setIsVisibale2(true);
  };

  const registration = () => {
    setLoading(true);
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !address ||
      !number ||
      !name ||
      !lastName
    ) {
      errorMessage('All Field Required!');
      setLoading(false);
    } else if (!EmailChecker.test(email)) {
      errorMessage('Enter a valid email!');
      setLoading(false);
    } else if (password != confirmPassword) {
      errorMessage('Both password are not same!');
      setLoading(false);
    } else if (!PhoneNumberRegex.test(number)) {
      errorMessage('Please Provide Correct Phone Number!');
      setLoading(false);
    } else {
      let data = {
        fullName: name + lastName,
        email: email,
        userType: 'Sheleter',
        telNo: number,
        password: password,
      };
      console.log(data);

      axios
        .post(AUTH.SIGNUP, data)
        .then(res => {
          const {data} = res;
          if (data.success) {
            navigation.navigate(LOGIN);
            successMessage(data?.message);
            setLoading(false);
            resetFeild();
          } else {
            errorMessage(data?.message);
            setLoading(false);
            resetFeild();

            console.log('runing');
          }
        })
        .catch(e => {
          console.log('err', e);
          errorMessage('Oops Something Went Wrong!');
          setLoading(false);
        });
    }
  };

  return (
    <ScrollView>
      <View style={loginStyle.main}>
        <View style={loginStyle.menuContainer}>
          <Text style={[loginStyle.login, {textAlign: 'center'}]}>
            Crowd Sourcing for {'\n'} Disaster Management{' '}
          </Text>
          <Text style={[loginStyle.login, {fontSize: 18}]}>Sign Up</Text>
          <View style={loginStyle.avatar}>
            <Icon color={BLACK} name="user" size={70} />
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              top: 20,
            }}>
            <TextInput
              style={{...loginStyle.input, width: '42%', padding: 0, margin: 0}}
              placeholder="First Name"
              value={name}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setName(text);
              }}
            />
            <TextInput
              style={{...loginStyle.input, width: '42%'}}
              placeholder="Last Name"
              value={lastName}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setLastName(text);
              }}
            />
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
            <View>
              <TextInput
                secureTextEntry={isVisibale2}
                style={loginStyle.input}
                value={confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor={TEXT_GRAY}
                onChangeText={text => {
                  setConfirmPassword(text);
                }}
              />
              <TouchableOpacity
                onPress={visible2}
                style={{
                  position: 'absolute',
                  right: 10,
                  width: 35,
                  height: 40,
                  bottom: 5,
                  justifyContent: 'center',
                }}>
                <Icons
                  name={!isVisibale2 ? 'eye' : 'eye-with-line'}
                  size={20}
                  style={{alignSelf: 'center', color: PLACEHOLDER_COLOR}}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              style={loginStyle.input}
              value={number}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setNumber(text);
              }}
            />

            <TextInput
              style={loginStyle.input}
              value={address}
              placeholder="Address"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setAddress(text);
              }}
            />
            {/* <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', }}>
                            <Text>Term and Condition Applied :</Text>
                            <TouchableOpacity style={{ marginLeft: 10 }}
                                onPress={termCond}
                            >
                                <Fontisto
                                    name={isAccept ? 'checkbox-active' : 'checkbox-passive'}
                                    size={20}
                                    style={{ alignSelf: 'center', color: PLACEHOLDER_COLOR }}
                                />
                            </TouchableOpacity>
                        </View> */}

            <Button fun={registration} tittle="Sign up" />

            <View style={{...loginStyle.notAccount}}>
              <Text style={{color: TEXT_GRAY}}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate(LOGIN);
                }}>
                <Text style={{fontWeight: 'bold', color: BLACK}}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {loading ? <Loading /> : null}
    </ScrollView>
  );
};

export default SignUp;

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
    backgroundColor: '#ffff',

    elevation: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT - 10,
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  notAccount: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 10,
  },
  avatar: {
    top: 10,
  },
  login: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BLACK,
  },
});
