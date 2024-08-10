import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDNKPk6Noo8Dj9bk-MiIrbdZAIZPQLXzKg",
    authDomain: "umrs-2024.firebaseapp.com",
    projectId: "umrs-2024",
    storageBucket: "umrs-2024.appspot.com",
    messagingSenderId: "221953064870",
    appId: "1:221953064870:web:a4c812cf7cf3e162c59967",
    measurementId: "G-0YPV9M1K8V"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
