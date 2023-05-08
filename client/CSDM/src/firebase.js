import firebase from '@react-native-firebase/app';

// Your secondary Firebase project credentials...
const credentials = {
  appId: '1:976138002438:android:34ddfe540db621389fe387',
  apiKey: 'AIzaSyAN2t-QxKDNIPqC_m_K66fGiZCuGtmmJBQ',
  storageBucket: 'gs://ggi-web.appspot.com',
  projectId: 'ggi-web',
};

const config = {
  name: 'com.csdm',
};

await firebase.initializeApp(credentials, config);

export default firebase;