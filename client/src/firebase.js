import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuCsPdc1Fv-iodpE1PKUIcjDfLVxBhT-s",
    authDomain: "video-sharing-83825.firebaseapp.com",
    projectId: "video-sharing-83825",
    storageBucket: "video-sharing-83825.appspot.com",
    messagingSenderId: "1047924242040",
    appId: "1:1047924242040:web:1da90971580b253da79f8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;