import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBzHEVjbwTPzPOCaYVO81XZz4h2_DbEVA8",
    authDomain: "saas-a32ce.firebaseapp.com",
    databaseURL: "https://saas-a32ce-default-rtdb.firebaseio.com",
    projectId: "saas-a32ce",
    storageBucket: "saas-a32ce.appspot.com",
    messagingSenderId: "643777302268",
    appId: "1:643777302268:web:d18e9bbf4c9a8243255179",
    measurementId: "G-WVRCGFVE0K"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
