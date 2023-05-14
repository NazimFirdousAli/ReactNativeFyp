import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Header, Loading} from '../../Components';
import {
  BLACK,
  BORDER_COLOR,
  DARK_GREEN,
  EmailChecker,
  FONT_SIZE,
  HEIGHT,
  INPUT_BORDER_COLOR,
  PhoneNumberRegex,
  PLACEHOLDER_COLOR,
  TEXT_GRAY,
  WHITE,
  WIDTH,
  WIDTH_AVG,
} from '../../Utils/constant';

import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import {errorMessage, successMessage} from '../../Utils/helpers';
import SelectDropdown from 'react-native-select-dropdown';
import {POST} from '../../Utils/api';
import {useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';

import {uploadImage} from '../../Utils/firebaseUpload';

const countries = ['Poor', 'Orphan'];

const Add = () => {
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');
  let [lastName, setLastName] = useState('');
  let [address, setAddress] = useState('');
  let [number, setNumber] = useState(null);
  let [isAccept, setIsAccept] = useState(false);
  let [shelter, setShelter] = useState(false);
  let [days, setDays] = useState('');
  const [loading, setLoading] = useState('');
  const [imagePath, setImagePath] = useState('');
  const states = useSelector(state => state);
  let userId = states?.authReducer?.user?._id;

  const resetFeild = () => {
    setLastName('');
    setEmail('');
    setAddress('');
    setNumber(null);
    setShelter('');
    setImagePath('');
  };

  const OpenDocumentPicker = async () => {
    try {
      launchImageLibrary({}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          Alert.alert('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {
            uri: response?.assets[0]?.uri,
            filename: response?.assets[0]?.fileName,
          };
          uploadImage({source, ref: 'shelter'});
          setImagePath(source?.filename);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const termCond = () => {
    if (isAccept === true) {
      setIsAccept(false);
    } else {
      setIsAccept(true);
    }
  };

  const registration = () => {
    setLoading(true);
    if (
      !email ||
      !address ||
      !number ||
      !lastName ||
      !shelter ||
      !days ||
      !imagePath
    ) {
      errorMessage('Please fill all field!');
      setLoading(false);
    } else if (!EmailChecker.test(email)) {
      setLoading(false);

      errorMessage('Enter a valid email!');
    } else if (!PhoneNumberRegex.test(number)) {
      setLoading(false);
      errorMessage('Please Provide Correct Phone Number!');
    } else if (!isAccept) {
      setLoading(false);

      errorMessage('Term and Condition required!');
    } else {
      axios
        .post(POST.SHELTER, {
          email: email,
          fullName: name + lastName,
          address: address,
          telNo: number,
          shelter: shelter,
          userId: userId,
          days,
          image: imagePath,
        })
        .then(res => {
          if (res?.data?.success) {
            successMessage(res?.data?.message);
            setLoading(false);
            alert('Shelter Added Succesfully');
          } else {
            setLoading(false);
            console.log('runing');
          }
          resetFeild();
        })
        .catch(err => {
          alert('err', err);
          errorMessage('Oops Something Went Wrong!');
          setLoading(false);
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
              placeholder="Name"
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
              placeholder="Shelter Address"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setAddress(text);
              }}
            />
            <TextInput
              style={loginStyle.input}
              value={shelter}
              placeholder="No Of Shelter"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setShelter(text);
              }}
              keyboardType="numeric"
            />
            <TextInput
              style={loginStyle.input}
              value={days}
              placeholder="Days"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setDays(text);
              }}
              keyboardType="numeric"
            />
            {/* <SelectDropdown
              defaultButtonText="Which people for donation"
              style={{width: '100%'}}
              dropdownIconPosition="right"
              buttonTextStyle={{fontSize: WIDTH * 0.03}}
              rowTextStyle={{fontSize: WIDTH * 0.03}}
              rowStyle={{
                borderBottomColor: WHITE,
                justifyContent: 'flex-start',
                marginTop: 20,
                color: TEXT_GRAY,
              }}
              dropdownBackgroundColor={WHITE}
              buttonStyle={{...loginStyle.input, backgroundColor: WHITE}}
              data={countries}
              onSelect={(selectedItem, index) => {
                setShelterCat(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            /> */}
            <TouchableOpacity
              onPress={OpenDocumentPicker}
              style={[
                loginStyle.input,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Text style={{color: TEXT_GRAY, fontSize: WIDTH * 0.03}}>
                <AntDesignIcon name="arrowdown" size={20} />
              </Text>
            </TouchableOpacity>
            {imagePath ? (
              <Text
                style={{
                  color: TEXT_GRAY,
                  fontSize: WIDTH * 0.025,
                  marginTop: 20,
                }}>
                {imagePath}
              </Text>
            ) : (
              <></>
            )}
            <View
              style={{marginTop: 20, display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: TEXT_GRAY}}>
                Term and Condition Applied :
              </Text>
              <TouchableOpacity style={{marginLeft: 10}} onPress={termCond}>
                <Fontisto
                  name={isAccept ? 'checkbox-active' : 'checkbox-passive'}
                  size={20}
                  style={{alignSelf: 'center', color: PLACEHOLDER_COLOR}}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <Button
                style={{marginTop: 100}}
                fun={registration}
                tittle="Add shelter"
              />
            </View>
          </View>
        </View>
      </View>
      {loading ? <Loading /> : null}
    </ScrollView>
  );
};

export default Add;

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
    // paddingTop: 30,
    position: 'relative',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 20,
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
    paddingTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    height: 'auto',
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
