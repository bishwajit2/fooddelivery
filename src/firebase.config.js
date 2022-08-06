import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBGGRSDpqRo2DjJzwyadRK5qhU3_g67Y_A",
  authDomain: "restaurantapp-ac57e.firebaseapp.com",
  databaseURL: "https://restaurantapp-ac57e-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-ac57e",
  storageBucket: "restaurantapp-ac57e.appspot.com",
  messagingSenderId: "728821184939",
  appId: "1:728821184939:web:16a76ade32ffe707a97aee"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};