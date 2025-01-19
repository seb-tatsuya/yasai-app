//import firebase from 'firebase/app' // firebase V8 指定方法
// ↓firebase V9以降 指定方法
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions} from 'firebase/functions'
import { firebaseConfig } from './config'

// V9以降
// reactアプリの中でfirebaseのサービスが使える
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export const FirebaseTimestamp = app.firestore.Timestamp;

// V8
// export const auth = firebase.auth(); 
// export const db = firebase.firestore();
// export const storage = firebase.storage();
// export const functions = firebase.functions();
// export const FirebaseTimestamp = firebase.firestore.Timestamp;

