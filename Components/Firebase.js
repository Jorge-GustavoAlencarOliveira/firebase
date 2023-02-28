import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage'
 
const firebaseConfig = {
  apiKey: "AIzaSyDNVXfoqL78uw9xcA9m_r0E8C9Z0mVuH28",
  authDomain: "cursoapp-7c1eb.firebaseapp.com",
  projectId: "cursoapp-7c1eb",
  storageBucket: "cursoapp-7c1eb.appspot.com",
  messagingSenderId: "80863632583",
  appId: "1:80863632583:web:d556808ab92f05375332e2",
  measurementId: "G-CYKQXX2Q80"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp)

export {db, auth, storage};
