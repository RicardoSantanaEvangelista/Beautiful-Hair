import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBGMq6L3UZYZm429DdDuLX6JNhedG_dCls",
  authDomain: "ttcc-f2e2f.firebaseapp.com",
  projectId: "ttcc-f2e2f",
  storageBucket: "ttcc-f2e2f.appspot.com",
  messagingSenderId: "1036560455743",
  appId: "1:1036560455743:web:6b77017f8468fcab6cc08a"
};
// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export default firebase;