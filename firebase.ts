import {initializeApp, getApp, getApps} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVrsSBLqB3pMSLg6Al4-Y4_R8aXd0zSoc",
    authDomain: "notion-clone-c74f6.firebaseapp.com",
    projectId: "notion-clone-c74f6",
    storageBucket: "notion-clone-c74f6.firebasestorage.app",
    messagingSenderId: "317202795444",
    appId: "1:317202795444:web:f5c009b21193f2427a80e1",
    measurementId: "G-J412FF14XC"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app);

export {db}