import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBONURCUm43d39tCl4VjLNU0t7YtxdOaVc',
	authDomain: 'react-spas-frinze.firebaseapp.com',
	databaseURL: 'https://react-spas-frinze.firebaseio.com',
	projectId: 'react-spas-frinze',
	storageBucket: 'react-spas-frinze.appspot.com',
	messagingSenderId: '346722736851',
	appId: '1:346722736851:web:f6df5c7e776d8b5dacd226',
	measurementId: 'G-1E1TEYMNTT',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
