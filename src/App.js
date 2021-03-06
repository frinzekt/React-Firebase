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
import CheckIn from './CheckIn';
import Attendees from './Attendees';

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

				const meetingsRef = firebase.database().ref(`meetings/${user.uid}`);
				meetingsRef.on('value', (snap) => {
					const meetings = snap.val();
					const meetingsList = [];
					for (let item in meetings) {
						meetingsList.push({
							meetingID: item,
							meetingName: meetings[item].meetingName,
						});
					}

					this.setState({
						meetings: meetingsList,
						howManyMeetings: meetingsList.length,
					});
				});
			} else {
				this.setState({
					user: null,
				});
			}
		});
	}

	logOut = async (e) => {
		e.preventDefault();
		this.setState({ user: null, displayName: null, userId: null });
		await firebase.auth().signOut();
		navigate('/login');
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

	addMeeting = (meetingName) => {
		const ref = firebase.database().ref(`meetings/${this.state.userId}`);
		ref.push({ meetingName });
	};

	render() {
		return (
			<div>
				<Navigation user={this.state.user} logOut={this.logOut} />
				{this.state.user && <Welcome username={this.state.displayName} />}
				<Router>
					<Home user={this.state.user} path='/' />
					<Login path='/login'></Login>
					<Meetings path='/meetings' addMeeting={this.addMeeting} meetings={this.state.meetings} userID={this.state.userId}></Meetings>
					<Attendees path='/attendees/:userID/:meetingID' adminUser={this.state.userId}></Attendees>
					<CheckIn path='/checkin/:userID/:meetingID'></CheckIn>
					<Register path='/register' registerUser={this.registerUser}></Register>
				</Router>
			</div>
		);
	}
}

export default App;
