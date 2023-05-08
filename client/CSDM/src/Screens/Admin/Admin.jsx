import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header, Loading} from '../../Components';
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

const Admin = () => {
  const [datas, setData] = useState([]);
  const [fund, setFund] = useState([]);

  const [loading, setLoading] = useState(false);

  let getShelter = () => {
    axios
      .get(GET.ALL_SHELTER)
      .then(res => {
        const {data} = res;
        if (data.success) {
          setData(data.data);
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
        if (data.success) {
          setFund(data.data);
        } else {
          console.log('runing');
        }
      })
      .catch(e => {});
  };

  useEffect(() => {
    getShelter();
    getFund();
  }, []);

  const deleteShelter = id => {
    setLoading(true);
    axios
      .post(POST.SHELTER_BY_ADMIN, {_id: id})
      .then(res => {
        const {data} = res;
        if (data.success) {
          getShelter();
          setLoading(false);
          successMessage(data.message);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        console.log('e', e);
        setLoading(false);
        errorMessage('Oops someting went wrong!');
      });
  };

  const deleteFund = id => {
    setLoading(true);
    axios
      .post(POST.FUND_BY_ADMIN, {_id: id})
      .then(res => {
        const {data} = res;
        if (data.success) {
          setLoading(false);
          getFund();
          successMessage(data.message);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
        errorMessage('Oops someting went wrong!');
      });
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
          console.log('data--->by_ID', data);
          setMissingData(data?.data);
        } else {
          console.log('runing');
        }
      })
      .catch(e => {});

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
  }, []);

  const deleteMissingPerson = id => {
    setLoading(true);
    let obj = {
      _id: id,
    };
    axios
      .post(POST.MISSING_PERSON_BY_ADMIN, obj)
      .then(res => {
        const {data} = res;
        if (data?.success) {
          setLoading(false);
          getMissingPerson();
          successMessage(data?.message);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);

        errorMessage('Oops someting went wrong!');
      });
  };

  const deleteVolunteer = id => {
    setLoading(true);
    let obj = {
      _id: id,
    };
    axios
      .post(POST.VOLUNTEER_BY_ADMIN, obj)
      .then(res => {
        const {data} = res;
        if (data?.success) {
          setLoading(false);
          getMissingPerson();
          successMessage(data?.message);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);

        errorMessage('Oops someting went wrong!');
      });
  };
  return (
    <ScrollView>
      <View style={loginStyle.main}>
        <View style={{...loginStyle.cardsContainer}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              padding: 10,
            }}>
            Shelter
          </Text>

          {datas && datas?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 5,
              }}
              horizontal>
              <>
                {datas?.map(v => {
                  return (
                    <View style={{...loginStyle.card}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        <Image
                          source={{
                            uri: `https://firebasestorage.googleapis.com/v0/b/ggi-web.appspot.com/o/shelter%2F${v?.image}?alt=media&token=4d4135b6-b08b-46d0-8117-b3702a824947`,
                          }}
                          style={{
                            alignSelf: 'center',
                            width: '100%',
                            height: '65%',
                            resizeMode: 'stretch',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: -60,
                          padding: 10,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 14, color: BLACK}}>
                          {v && new Date(v?.createdAt).toDateString()}
                        </Text>
                        <TouchableOpacity onPress={() => deleteShelter(v?._id)}>
                          <Feather
                            name={'delete'}
                            size={20}
                            style={{alignSelf: 'center', color: 'red'}}
                          />
                        </TouchableOpacity>
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
              <Text
                style={{color: TEXT_GRAY, alignSelf: 'center', paddingTop: 20}}>
                No Shelter Found!
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
              color: WHITE,
              padding: 10,
            }}>
            Fundraising
          </Text>

          {fund && fund?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              // style={{
              //   paddingHorizontal: 5,
              // marginBottom: 50,
              // }}
              horizontal>
              <>
                {fund?.map((v, index) => {
                  return (
                    <View style={{...loginStyle.card1}}>
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
                        <TouchableOpacity onPress={() => deleteFund(v?._id)}>
                          <Feather
                            name={'delete'}
                            size={20}
                            style={{alignSelf: 'center', color: 'red'}}
                          />
                        </TouchableOpacity>
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
              <Text
                style={{color: TEXT_GRAY, alignSelf: 'center', paddingTop: 20}}>
                No Fund Found!
              </Text>
            </View>
          )}

          {loading ? <Loading /> : null}
        </View>
      </View>
      <View style={loginStyle.main}>
        <View style={{...loginStyle.cardsContainer}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: WHITE,
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
                  return (
                    <View style={{...loginStyle.card}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        <Image
                          source={{
                            uri: `https://firebasestorage.googleapis.com/v0/b/ggi-web.appspot.com/o/missing_person%2F${v?.image}?alt=media&token=4d4135b6-b08b-46d0-8117-b3702a824947`,
                          }}
                          style={{
                            alignSelf: 'center',
                            width: '100%',
                            height: '65%',
                            resizeMode: 'stretch',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: -70,
                          padding: 10,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 14, color: BLACK}}>
                          {v && new Date(v?.createdAt).toDateString()}
                        </Text>
                        <TouchableOpacity
                          onPress={() => deleteMissingPerson(v?._id)}>
                          <Feather
                            name={'delete'}
                            size={20}
                            style={{alignSelf: 'center', color: 'red'}}
                          />
                        </TouchableOpacity>
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
                          <Text style={{color: TEXT_GRAY}}>{v && v?.name}</Text>
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
                          Identification Symbol: {`${v?.Identification_Symbol}`}
                        </Text>
                        <Text style={{color: TEXT_GRAY}}>
                          Cell: {`${v && v?.phoneNo}`}
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
              <Text
                style={{color: TEXT_GRAY, alignSelf: 'center', paddingTop: 20}}>
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
              color: WHITE,
              padding: 10,
            }}>
            Volunteer
          </Text>

          {VolunteerData && VolunteerData?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 5,
              }}
              horizontal>
              <>
                {VolunteerData?.map(v => {
                  return (
                    <View style={{...loginStyle.card}}>
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
                            width: '100%',
                            height: '65%',
                            resizeMode: 'stretch',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: -60,
                          padding: 10,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 14, color: BLACK}}>
                          {v && new Date(v?.created_at).toDateString()}
                        </Text>
                        <TouchableOpacity
                          onPress={() => deleteVolunteer(v?._id)}>
                          <Feather
                            name={'delete'}
                            size={20}
                            style={{alignSelf: 'center', color: 'red'}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          padding: 10,
                          display: 'flex',
                          flexDirection: 'row',
                        }}>
                        <View style={{marginLeft: 10}}>
                          <Text style={{color: TEXT_GRAY}}>{v && v?.name}</Text>
                          <Text style={{color: TEXT_GRAY}}>{v && v?.CNIC}</Text>
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
              <Text
                style={{color: TEXT_GRAY, alignSelf: 'center', paddingTop: 20}}>
                No Volunteer Person Found!
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Admin;

const loginStyle = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#0077b6',
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
    // height: HEIGHT,
  },

  login: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BLACK,
  },
  cardsContainer: {
    width: '100%',
    paddingBottom: '1%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  card: {
    height: 500,
    width: 300,
    alignSelf: 'center',
    backgroundColor: WHITE,
    shadowColor: '#000',
    // marginBottom: 20,
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

  card1: {
    height: 200,
    width: 300,
    alignSelf: 'center',
    backgroundColor: WHITE,
    shadowColor: '#000',
    // marginBottom: 20,
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
});
