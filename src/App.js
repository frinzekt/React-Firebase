// Import Libraries
import React, { Component } from 'react';
import { Router } from '@reach/router';
import firebase from './Firebase';

// Import Components
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Meetings from './Meetings';

class App extends Component {
	state = {
		user: '',
	};

	componentDidMount() {
		// REFERENCE TO THE USER UNDER THE ROOT
		const ref = firebase.database().ref('user');
		// OTHER WAYS TO DO IT IS TO GET THE REFERENCE FROM THE ROOT THE MANUEVER IN THE CHILD
		// const rootRef = firebase.database().ref();
		// const speedRef = rootRef.child('speed');
		// everytime ethe reference to the speeed changes
		// call this callback function
		// speedRef.on('value', (snap) => {
		// 	this.setState({
		// 		speed: snap.val(),
		// 	});
		// });

		// GRABS A SNAPSHOT OF WHAT THE DATA LOOKS
		ref.on('value', (snap) => {
			this.setState({
				user: snap.val(),
			});
		});
	}

	logOut = (e) => {
		e.preventDefault();
		this.setState({ user: '' });
	};

	render() {
		return (
			<div>
				<Navigation user={this.state.user} logOut={this.logOut} />
				{this.state.user && <Welcome user={this.state.user} />}
				<Router>
					<Home user={this.state.user} path='/' />
					<Login path='/login' user={this.state.user}></Login>
					<Meetings path='/meetings' user={this.state.user}></Meetings>
					<Register path='/register' user={this.state.user}></Register>
				</Router>
			</div>
		);
	}
}

export default App;
