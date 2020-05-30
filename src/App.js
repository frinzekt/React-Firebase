// Import React
import React, { Component } from 'react';
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
