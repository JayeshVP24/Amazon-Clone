// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { firebaseConfig } from "./firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
