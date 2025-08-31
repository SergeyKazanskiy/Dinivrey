import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAQL45ipC90ITlACpU9u3XjpDoIqbq2P00",
  authDomain: "dinivrey-4f22f.firebaseapp.com",
  projectId: "dinivrey-4f22f",
  storageBucket: "dinivrey-4f22f.firebasestorage.app",
  messagingSenderId: "473620400081",
  appId: "1:473620400081:web:3114bf11ed074e92f0c2f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };