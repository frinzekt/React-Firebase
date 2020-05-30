import React, { Component } from 'react';
import firebase from './Firebase';
import FormError from './FormError';
import { navigate } from '@reach/router';

class Welcome extends Component {
	state = {
		email: '',
		password: '',
		errorMessage: null,
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		const registrationInfo = {
			email,
			password,
		};
		try {
			await firebase.auth().signInWithEmailAndPassword(registrationInfo.email, registrationInfo.password);
			navigate('/meetings');
		} catch (error) {
			if (error.message !== null) {
				this.setState({ errorMessage: error.message });
			} else {
				this.setState({ errorMessage: null });
			}
		}
	};

	render() {
		const { user } = this.props;

		return (
			<form className='mt-3' onSubmit={this.handleSubmit}>
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-lg-6'>
							<div className='card bg-light'>
								<div className='card-body'>
									<h3 className='font-weight-light mb-3'>Log in</h3>
									<section className='form-group'>
										{this.state.errorMessage && <FormError message={this.state.errorMessage}></FormError>}
										<label className='form-control-label sr-only' htmlFor='Email'>
											Email
										</label>
										<input
											required
											className='form-control'
											type='email'
											id='email'
											name='email'
											placeholder='Email'
											value={this.state.email}
											onChange={this.handleChange}
										/>
									</section>
									<section className='form-group'>
										<input
											required
											className='form-control'
											type='password'
											name='password'
											placeholder='Password'
											value={this.state.password}
											onChange={this.handleChange}
										/>
									</section>
									<div className='form-group text-right mb-0'>
										<button className='btn btn-primary' type='submit'>
											Log in
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default Welcome;
