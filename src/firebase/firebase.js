import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCxD_834JdgD0okVIukz8ws3y4q7J_YPJU",
    authDomain: "b-logs.firebaseapp.com",
    databaseURL: "https://b-logs.firebaseio.com",
    projectId: "b-logs",
    storageBucket: "b-logs.appspot.com",
    messagingSenderId: "2887922305",
    appId: "1:2887922305:web:15fb32851064c3928cd380",
    measurementId: "G-6DEF60PB0L"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
    db,
    auth,
    storage
}