import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header} from '../../Components';
import {
  BLACK,
  DARK_GREEN,
  FONT_SIZE,
  HEIGHT,
  INPUT_BORDER_COLOR,
  TEXT_GRAY,
  WHITE,
} from '../../Utils/constant';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {errorMessage, successMessage} from '../../Utils/helpers';
import {GET, POST} from '../../Utils/api';
import Feather from 'react-native-vector-icons/Feather';

const AllData = () => {
  const [datas, setData] = useState([]);
  const [fund, setFund] = useState([]);

  const [loading, setLoading] = useState(false);

  let getShelter = () => {
    axios
      .get(GET.ALL_SHELTER)
      .then(res => {
        const {data} = res;
        if (data?.success) {
          setData(data?.data);
        } else {
          console.log('runing');
        }
      })
      .catch(e => {});
  };

  let getFund = () => {
    axios
      .get(GET.ALL_FUND)
      .then(res => {
        const {data} = res;
        if (data?.success) {
          setFund(data?.data);
        } else {
          console.log('runing');
        }
      })
      .catch(e => {});
  };

  // Missing Person

  const [missingData, setMissingData] = useState([]);
  const [VolunteerData, setVolunteerData] = useState([]);

  let getMissingPerson = () => {
    axios
      .get(`${GET.ALL_MISSING_PERSON}`)
      .then(res => {
        const {data} = res;
        if (data?.success) {
          console.log('Missing Person', data);
          setMissingData(data?.data);
        } else {
          console.log('runing');
        }
      })
      .catch(e => {});
  };

  let getVolunteer = () => {
    axios
      .get(`${GET.ALL_VOLUNTEER}`)
      .then(res => {
        const {data} = res;
        if (data?.success) {
          setVolunteerData(data?.data);
        } else {
          console.log('runing');
        }
      })
      .catch(e => {});
  };

  useEffect(() => {
    getMissingPerson();
    getVolunteer();
  }, []);

  useEffect(() => {
    getShelter();
    getFund();
  }, []);

  return (
    <ScrollView style={{height: '100%', width: '100%'}}>
      <View style={loginStyle.main}>
        <View style={loginStyle.menuContainer}>
          <View style={{...loginStyle.cardsContainer}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: BLACK,
                padding: 10,
              }}>
              Sheleter
            </Text>

            {datas && datas?.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  paddingHorizontal: 5,
                  height: '50%',
                }}
                horizontal>
                <>
                  {datas?.map(v => {
                    return (
                      <View
                        style={{
                          ...loginStyle.card,
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        <View>
                          <Image
                            source={{
                              uri: `https://firebasestorage.googleapis.com/v0/b/ggi-web.appspot.com/o/shelter%2F${v?.image}?alt=media`,
                            }}
                            style={{
                              alignSelf: 'center',
                              color: 'grey',
                              marginLeft: 3,
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        </View>

                        <View style={{...loginStyle.card}}>
                          <View
                            style={{
                              padding: 10,
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={{fontSize: 14, color: BLACK}}>
                              {v && new Date(v?.createdAt).toDateString()}
                            </Text>
                          </View>
                          <View
                            style={{
                              padding: 10,
                              display: 'flex',
                              flexDirection: 'row',
                            }}>
                            <View style={{marginLeft: 10}}>
                              <Text style={{color: TEXT_GRAY}}>
                                {v && v?.fullName}
                              </Text>
                              <Text style={{color: TEXT_GRAY}}>
                                {v && v?.email}
                              </Text>
                            </View>
                          </View>
                          <View style={{padding: 10, marginLeft: 10}}>
                            <Text style={{color: TEXT_GRAY}}>
                              People for: {`${v?.shelterCat}`}{' '}
                            </Text>
                            <Text style={{color: TEXT_GRAY}}>
                              Days: {`${v?.days}`}{' '}
                            </Text>
                            <Text style={{color: TEXT_GRAY}}>
                              No of Shelter: {`${v?.shelter}`}
                            </Text>
                            <Text style={{color: TEXT_GRAY}}>
                              Cell: {`${v && v?.telNo}`}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </>
              </ScrollView>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  flex: 1,
                }}>
                <Text style={{color: TEXT_GRAY, alignSelf: 'center'}}>
                  No Shelter Found!
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={loginStyle.main}>
        <View style={loginStyle.menuContainer}>
          <View style={{...loginStyle.cardsContainer}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: BLACK,
                padding: 10,
              }}>
              Fund Raising
            </Text>

            {fund && fund?.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  paddingHorizontal: 5,
                  marginBottom: 50,
                }}
                horizontal>
                <>
                  {fund?.map((v, index) => {
                    console.log(v, 'v');
                    return (
                      <View style={{...loginStyle.card}}>
                        <View
                          style={{
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{fontSize: 14, color: BLACK}}>
                            {v && new Date(v?.createdAt).toDateString()}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <View style={{marginLeft: 10}}>
                            <Text style={{color: TEXT_GRAY}}>
                              {v && v?.fullName}
                            </Text>
                            <Text style={{color: TEXT_GRAY}}>
                              {v && v?.email}
                            </Text>
                          </View>
                        </View>
                        <View style={{padding: 10, marginLeft: 10}}>
                          <Text style={{color: TEXT_GRAY}}>
                            Purpose: {`${v?.pruposeForFunds}`}{' '}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Account Details: {`${v?.accountDetails}`}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Amount required: {`${v?.amountRequired}`}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Cell: {`${v && v?.telNo}`}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </>
              </ScrollView>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  flex: 1,
                }}>
                <Text style={{color: TEXT_GRAY, alignSelf: 'center'}}>
                  No Fund Found!
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={loginStyle.main}>
        <View style={{...loginStyle.cardsContainer}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: BLACK,
              padding: 10,
            }}>
            Missing Person
          </Text>
          {missingData && missingData?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 5,
              }}
              horizontal>
              <>
                {missingData?.map(v => {
                  // alert(JSON.stringify(v))
                  return (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <View
                        style={{
                          ...loginStyle.card,
                        }}>
                        <Image
                          source={{
                            uri: `https://firebasestorage.googleapis.com/v0/b/ggi-web.appspot.com/o/missing_person%2F${v?.image}?alt=media&token=4d4135b6-b08b-46d0-8117-b3702a824947`,
                          }}
                          style={{
                            alignSelf: 'center',
                            color: 'grey',
                            marginLeft: 3,
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </View>

                      <View
                        style={{
                          ...loginStyle.card,
                          height: '100%',
                          overflow: 'scroll',
                        }}>
                        <View
                          style={{
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{fontSize: 14, color: BLACK}}>
                            {v && new Date(v?.created_at).toDateString()}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <View style={{marginLeft: 10}}>
                            <Text style={{color: TEXT_GRAY}}>
                              {v && v?.fullName}
                            </Text>
                            <Text style={{color: TEXT_GRAY}}>
                              {v && v?.name}
                            </Text>
                          </View>
                        </View>
                        <View style={{padding: 10, marginLeft: 10}}>
                          <Text style={{color: TEXT_GRAY}}>
                            Dress Description: {`${v?.DressDescription}`}{' '}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Missing Date: {`${v?.Missing_Date}`}{' '}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Missing Place: {`${v?.Missing_Place}`}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Identification Symbol:{' '}
                            {`${v?.Identification_Symbol}`}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Cell: {`${v && v?.phoneNo}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </>
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1,
              }}>
              <Text style={{color: TEXT_GRAY, alignSelf: 'center'}}>
                No Missing Person Found!
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={loginStyle.main}>
        <View style={{...loginStyle.cardsContainer}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: BLACK,
              padding: 10,
            }}>
            Volunteer
          </Text>

          {VolunteerData && VolunteerData?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 5,
                marginBottom: 50,
              }}
              horizontal>
              <>
                {VolunteerData?.map((v, index) => {
                  console.log(v, 'v');
                  return (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <Image
                        source={{
                          uri: `https://firebasestorage.googleapis.com/v0/b/ggi-web.appspot.com/o/volunteer%2F${v?.image}?alt=media&token=4d4135b6-b08b-46d0-8117-b3702a824947`,
                        }}
                        style={{
                          alignSelf: 'center',
                          color: 'grey',
                          marginLeft: 3,
                          width: '100%',
                          height: '50%',
                        }}
                      />

                      <View
                        style={{
                          ...loginStyle.card,
                          height: '100%',
                          overflow: 'scroll',
                        }}>
                        <View
                          style={{
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{fontSize: 14, color: BLACK}}>
                            {v && new Date(v?.created_at).toDateString()}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <View>
                            <Image
                              source={{
                                uri: `https://firebasestorage.googleapis.com/v0/b/ggi-web.appspot.com/o/volunteer%2F${v?.image}?alt=media&token=4d4135b6-b08b-46d0-8117-b3702a824947`,
                              }}
                              style={{
                                alignSelf: 'center',
                                color: 'grey',
                                marginLeft: 3,
                              }}
                            />
                          </View>
                          <View style={{marginLeft: 10}}>
                            <Text style={{color: TEXT_GRAY}}>
                              {v && v?.name}
                            </Text>
                            <Text style={{color: TEXT_GRAY}}>
                              {v && v?.CNIC}
                            </Text>
                          </View>
                        </View>
                        <View style={{padding: 10, marginLeft: 10}}>
                          <Text style={{color: TEXT_GRAY}}>
                            Area Of Intrest: {`${v?.AreaOfIntrest}`}{' '}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Avaliblity: {`${v?.Avaliblity}`}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Address: {`${v?.Address}`}
                          </Text>
                          <Text style={{color: TEXT_GRAY}}>
                            Cell: {`${v && v?.Contact_Info}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </>
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1,
              }}>
              <Text style={{color: TEXT_GRAY, alignSelf: 'center'}}>
                No Volunteer Found!
              </Text>
            </View>
          )}

          {loading ? <Loading /> : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default AllData;

const loginStyle = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: HEIGHT,
    backgroundColor: WHITE,
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT,
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
  cardsContainer: {
    height: '100%',
    width: '100%',
    paddingBottom: '18%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  card: {
    height: 200,
    width: 300,
    alignSelf: 'center',
    backgroundColor: WHITE,
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    backgroundColor: '#ffff',
    elevation: 5,
    borderRadius: 10,
    margin: 5,
  },
  alertText: {
    color: BLACK,
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
  },
  alertBtnDiv: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: 'black',
    borderTopWidth: 1,
    marginTop: 10,
    backgroundColor: WHITE,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  btnVeiw: {
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    borderRightWidth: 0.4,
    borderRightColor: 'black',
  },
  btnVeiw1: {
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  btnText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#1890ff',
  },
});
