import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyAx4ZGUFhbx29nTNqFDCLVvFN8-M09AHYA",
    authDomain: "guidara-75318.firebaseapp.com",
    projectId: "guidara-75318",
    storageBucket: "guidara-75318.appspot.com",
    messagingSenderId: "1022315407819",
    appId: "1:1022315407819:web:a67e2748c8cfe483842e4e",
    measurementId: "G-5QKJKZ97MM"
}
!firebase.apps.length ? firebase.initializeApp(config):''
export const auth = firebase.auth()
export const firestore = firebase.firestore()