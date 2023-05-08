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
  AgeChecker,
  FONT_SIZE,
  HEIGHT,
  INPUT_BORDER_COLOR,
  PhonePhoneNoRegex,
  PLACEHOLDER_COLOR,
  TEXT_GRAY,
  WHITE,
  WIDTH,
  WIDTH_AVG,
  PhoneNumberRegex,
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
import DatePicker from 'react-native-date-picker';

const Add = () => {
  const [Age, setAge] = useState('');
  const [name, setname] = useState('');
  const [Missing_Place, setMissing_Place] = useState('');
  const [PhoneNo, setPhoneNo] = useState(null);
  const [Missing_Date, setMissing_Date] = useState(new Date());
  const [DressDescription, setDressDescription] = useState('');
  const [Identification_Symbol, setIdentification_Symbol] = useState('');
  const [loading, setLoading] = useState('');
  const [imagePath, setImagePath] = useState('');

  const resetFeild = () => {
    setname('');
    setAge('');
    setMissing_Place('');
    setPhoneNo(null);
    setMissing_Date(new Date());
    setDressDescription('');
    setIdentification_Symbol('');
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
          uploadImage({source, ref: 'missing_person'});
          setImagePath(source?.filename);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const registration = () => {
    setLoading(true);
    if (
      !Age ||
      !Missing_Place ||
      !PhoneNo ||
      !name ||
      !Missing_Place ||
      !Missing_Date ||
      !DressDescription ||
      !Identification_Symbol ||
      !imagePath
    ) {
      errorMessage('Please fill all field!');
      setLoading(false);
    } else if (!PhoneNumberRegex.test(PhoneNo)) {
      setLoading(false);
      errorMessage('Please Provide Correct Phone PhoneNo!');
    } else {
      let data = {
        name: name,
        age: Age,
        phoneNo: PhoneNo,
        Missing_Place: Missing_Place,
        Missing_Date,
        DressDescription: DressDescription,
        Identification_Symbol: Identification_Symbol,
        image: imagePath,
      };

      axios
        .post(POST.MISSING_PERSON, data)
        .then(res => {
          const {data} = res;
          if (data.success) {
            successMessage(data?.message);
            setLoading(false);
            resetFeild();
          } else {
            setLoading(false);

            console.log('runing');
          }
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
              placeholder="Name"
              autoComplete="name"
              keyboardType="name"
              value={name}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setname(text);
              }}
            />
            <TextInput
              style={loginStyle.input}
              placeholder="Age"
              keyboardType="numeric"
              value={Age}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setAge(text);
              }}
            />
            <TextInput
              style={loginStyle.input}
              value={PhoneNo}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setPhoneNo(text);
              }}
            />

            <TextInput
              style={loginStyle.input}
              value={Missing_Place}
              placeholder="Missing Place"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setMissing_Place(text);
              }}
            />
            <Text
              style={{color: TEXT_GRAY, fontSize: WIDTH * 0.03, marginTop: 20}}>
              Select Date
            </Text>
            <DatePicker
              date={Missing_Date}
              onConfirm={date => {
                setMissing_Date(date);
              }}
              mode="date"
              textColor="black"
              dividerHeight={10}
              style={{height: 100}}
            />

            <TextInput
              style={loginStyle.input}
              value={DressDescription}
              placeholder="Dress Description"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setDressDescription(text);
              }}
            />

            <TextInput
              style={loginStyle.input}
              value={Identification_Symbol}
              placeholder="Identification Symbol"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setIdentification_Symbol(text);
              }}
            />
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
              <Text
                style={{
                  color: TEXT_GRAY,
                  fontSize: WIDTH * 0.025,
                  marginTop: 20,
                }}>
                {imagePath}
              </Text>

            <View style={{marginTop: 20}}>
              <Button
                style={{marginTop: 100}}
                fun={registration}
                tittle="Add Missing Person"
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
