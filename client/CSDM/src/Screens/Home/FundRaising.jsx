import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView} from 'react-native';
import {Button, Loading} from '../../Components';
import {
  BLACK,
  DARK_GREEN,
  EmailChecker,
  FONT_SIZE,
  HEIGHT,
  INPUT_BORDER_COLOR,
  PhoneNumberRegex,
  TEXT_GRAY,
  WHITE,
} from '../../Utils/constant';
import axios from 'axios';
import {errorMessage, successMessage} from '../../Utils/helpers';
import {POST} from '../../Utils/api';
import {useSelector} from 'react-redux';

const FundRaising = () => {
  let [email, setEmail] = useState('');
  let [lastName, setLastName] = useState('');
  let [address, setAddress] = useState('');
  let [number, setNumber] = useState(null);
  let [shelter, setShelter] = useState(false);
  let [shelterCat, setShelterCat] = useState(false);
  const [loading, setLoading] = useState('');
  const [purpose, setPurspose] = useState('');
  const states = useSelector(state => state);
  let userId = states?.authReducer?.user?._id;

  const resetFeild = () => {
    setLastName('');
    setEmail('');
    setAddress('');
    setNumber(null);
    setShelter('');
    setShelterCat('');
    setPurspose('');
  };

  const registration = () => {
    setLoading(true);
    if (
      !userId ||
      !email ||
      !lastName ||
      !address ||
      !number ||
      !shelter ||
      !shelterCat ||
      !purpose
    ) {
      errorMessage('Please fill all field!');
      setLoading(false);
    } else if (!EmailChecker.test(email)) {
      setLoading(false);
      errorMessage('Enter a valid email!');
    } else if (!PhoneNumberRegex.test(number)) {
      setLoading(false);
      errorMessage('Please Provide Correct Phone Number!');
    } else {
      let data = {
        userId: userId,
        email: email,
        fullName: lastName,
        address: address,
        telNo: number,
        accountDetails: shelter,
        pruposeForFunds: purpose,
        amountRequired: shelterCat,
      };

      axios
        .post(POST.FUND_RASING, data)
        .then(res => {
          const {data} = res;
          if (data.success) {
            successMessage(data?.message);
            setLoading(false);
            alert('Succesfully Added Fund');
          } else {
            setLoading(false);
            console.log('runing');
          }
          resetFeild();
        })
        .catch(e => {
          setLoading(false);
          console.log('err', e);
          errorMessage('Oops Something Went Wrong!');
        });
    }
  };

  return (
    <ScrollView>
      <View style={loginStyle.main}>
        <View style={loginStyle.menuContainer}>
          <View style={loginStyle.inputContainer}>
            <TextInput
              style={loginStyle.input}
              placeholder="Name Of Fund Raiser"
              autoComplete="name"
              keyboardType="name"
              value={lastName}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setLastName(text);
              }}
            />
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
            <TextInput
              style={loginStyle.input}
              value={shelter}
              placeholder="Account Details"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setShelter(text);
              }}
              keyboardType="numeric"
            />

            <TextInput
              style={loginStyle.input}
              value={shelterCat}
              placeholder="Amount Required"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setShelterCat(text);
              }}
              keyboardType="numeric"
            />

            <TextInput
              style={loginStyle.input}
              value={purpose}
              placeholder="Purpose for funds"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setPurspose(text);
              }}
            />

            <View style={{marginTop: 20}}>
              <Button
                style={{marginTop: 100}}
                fun={registration}
                tittle="Fund Raising"
              />
            </View>
          </View>
        </View>
      </View>
      {loading ? <Loading /> : null}
    </ScrollView>
  );
};

export default FundRaising;

const loginStyle = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: HEIGHT - 55,
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
    backgroundColor: '#f6fff8',
    elevation: 5,
    width: '90%',
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT-200,
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
