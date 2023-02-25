import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBrbTW8FW0_TcioOVJFeKWRbyDFKBK-IRk",
    authDomain: "mila-b18d0.firebaseapp.com",
    projectId: "mila-b18d0",
    storageBucket: "mila-b18d0.appspot.com",
    messagingSenderId: "99810188757",
    appId: "1:99810188757:web:00b72c522c2afc5637f15c",
    measurementId: "G-5MPNBDE52Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;