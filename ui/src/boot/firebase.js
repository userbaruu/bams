import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// leave the export, even if you don't use it
export default async ({ Vue }) => {
  const config = {
    apiKey: "AIzaSyBJW3gLlgY1GgEohTAosj52Pc5OawFbBoM",
    authDomain: "bbta3-bppt.firebaseapp.com",
    databaseURL: "https://bbta3-bppt.firebaseio.com",
    projectId: "bbta3-bppt",
    storageBucket: "bbta3-bppt.appspot.com",
    messagingSenderId: "246187970753"
  };
  
  !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

  Vue.prototype.$firebase = firebase
}
