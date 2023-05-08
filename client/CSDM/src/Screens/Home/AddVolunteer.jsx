import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView} from 'react-native';
import {Button, Loading} from '../../Components';
import {
  BLACK,
  DARK_GREEN,
  CNICChecker,
  FONT_SIZE,
  HEIGHT,
  INPUT_BORDER_COLOR,
  PhoneContact_InfoRegex,
  TEXT_GRAY,
  WHITE,
  WIDTH,
  PhoneNumberRegex,
} from '../../Utils/constant';
import axios from 'axios';
import {errorMessage, successMessage} from '../../Utils/helpers';
import {POST} from '../../Utils/api';
import {useSelector} from 'react-redux';
import {uploadImage} from '../../Utils/firebaseUpload';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const FundRaising = () => {
  let [CNIC, setCNIC] = useState('');
  let [Name, setName] = useState('');
  let [Address, setAddress] = useState('');
  let [Contact_Info, setContact_Info] = useState(null);
  let [Availibility, setAvailibility] = useState(null);
  let [Age, setAge] = useState(null);
  const [loading, setLoading] = useState('');
  const [AreaOfIntrest, setAreaOfIntrest] = useState('');
  const [imagePath, setImagePath] = useState('');

  const resetFeild = () => {
    setName('');
    setCNIC('');
    setAddress('');
    setContact_Info(null);
    setAreaOfIntrest('');
    setImagePath('');
    setAvailibility(null);
    setAge(null);
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
          uploadImage({source, ref: 'volunteer'});
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
      !Availibility ||
      !CNIC ||
      !Name ||
      !Address ||
      !Contact_Info ||
      !AreaOfIntrest ||
      !Age ||
      !imagePath
    ) {
      errorMessage('Please fill all field!');
      setLoading(false);
    } else if (!PhoneNumberRegex.test(Contact_Info)) {
      setLoading(false);
      errorMessage('Please Provide Correct Phone Contact_Info!');
    } else {
      let data = {
        name: Name,
        age: Age,
        CNIC: CNIC,
        AreaOfIntrest: AreaOfIntrest,
        Availibility,
        Contact_Info: Contact_Info,
        Address: Address,
        image: imagePath,
      };

      axios
        .post(POST.VOLUNTEER, data)
        .then(res => {
          const {data} = res;
          if (data.success) {
            successMessage(data?.message);
            setLoading(false);
            alert('Succesfully Added Volunteer');
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
              placeholder="Name of Fund Raiser"
              autoComplete="name"
              keyboardType="name"
              value={Name}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setName(text);
              }}
            />
            <TextInput
              style={loginStyle.input}
              placeholder="CNIC"
              keyboardType="numeric"
              value={CNIC}
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setCNIC(text);
              }}
            />
            <TextInput
              style={loginStyle.input}
              value={Contact_Info}
              placeholder="Phone Contact Info"
              keyboardType="numeric"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setContact_Info(text);
              }}
            />

            <TextInput
              style={loginStyle.input}
              value={Address}
              placeholder="Address"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setAddress(text);
              }}
            />
            <TextInput
              style={loginStyle.input}
              value={AreaOfIntrest}
              placeholder="Area Of Intrest For Funds"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setAreaOfIntrest(text);
              }}
            />
            <TextInput
              style={loginStyle.input}
              value={Availibility}
              placeholder="Availibility"
              keyboardType="numeric"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setAvailibility(text);
              }}
            />

            <TextInput
              style={loginStyle.input}
              value={Age}
              placeholder="Age"
              keyboardType="numeric"
              placeholderTextColor={TEXT_GRAY}
              onChangeText={text => {
                setAge(text);
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
                fontSize: WIDTH * 0.02,
                marginTop: 20,
              }}>
              {imagePath}
            </Text>
              <Button
                style={{marginTop: 100}}
                fun={registration}
                tittle="Add Volunteer"
              />
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
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT - 180,
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
