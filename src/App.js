// Import Libraries
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
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
		displayName: null,
		userId: null,
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				this.setState({
					user: user,
					displayName: user.displayName,
					userId: user.uid,
				});
			}
		});
	}

	logOut = (e) => {
		e.preventDefault();
		this.setState({ user: '' });
	};

	registerUser = async (displayName) => {
		//WHENEVER SOMETHING CHANGES IN THE REGISTRATION, THIS IS CALLED

		await firebase.auth().onAuthStateChanged(async (user) => {
			await user.updateProfile({
				displayName,
			});
			this.setState({
				user: user,
				displayName: user.displayName,
				userId: user.uid,
			});
		});

		navigate('/meetings');
	};

	render() {
		return (
			<div>
				<Navigation user={this.state.user} logOut={this.logOut} />
				{this.state.user && <Welcome username={this.state.displayName} />}
				<Router>
					<Home user={this.state.user} path='/' />
					<Login path='/login'></Login>
					<Meetings path='/meetings'></Meetings>
					<Register path='/register' registerUser={this.registerUser}></Register>
				</Router>
			</div>
		);
	}
}

export default App;
