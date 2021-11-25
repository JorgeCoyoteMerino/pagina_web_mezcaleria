// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDej200iTiDD3Pqt-whKVpiUyXNnstJUjs",
  authDomain: "customers-b55b4.firebaseapp.com",
  databaseURL: "https://customers-b55b4-default-rtdb.firebaseio.com",
  projectId: "customers-b55b4",
  storageBucket: "customers-b55b4.appspot.com",
  messagingSenderId: "240247602394",
  appId: "1:240247602394:web:277e95110772d08a7fb9e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };
