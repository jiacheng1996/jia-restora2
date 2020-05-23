import firebase from "firebase";
//import 'firebase/firestore'
//import 'firebase/storage'


// Initialize Firebase
 var config = {
  apiKey: "AIzaSyAeMmLpaS0iIapB75OBn5d-Elovb3dOyFI",
  authDomain: "jia-restora.firebaseapp.com",
  databaseURL: "https://jia-restora.firebaseio.com",
  projectId: "jia-restora",
  storageBucket: "jia-restora.appspot.com",
  messagingSenderId: "9667247705",
  appId: "1:9667247705:web:be886842cc6c8b6fcabb48"
 };

 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({ timestampsInSnapshots:true})

 export default firebaseApp.firestore()
 export var functions = firebaseApp.functions()
