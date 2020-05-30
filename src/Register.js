import React, { Component } from 'react';
import FormError from './FormError';
import firebase from './Firebase';
class Register extends Component {
	state = {
		displayName: '',
		email: '',
		passOne: '',
		passTwo: '',
		errorMessage: null,
	};

	handleChange = (e) => {
		const { name, value } = e.target;

		this.setState({ [name]: value }, () => {
			if (this.state.passOne !== this.state.passTwo) {
				this.setState({ errorMessage: 'Passwords do not match' });
			} else {
				this.setState({ errorMessage: '' });
			}
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { displayName, email, passOne } = this.state;
		const registrationInfo = {
			displayName,
			email,
			password: passOne,
		};
		try {
			await firebase.auth().createUserWithEmailAndPassword(registrationInfo.email, registrationInfo.password);
			this.props.registerUser(registrationInfo.displayName);
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
						<div className='col-lg-8'>
							<div className='card bg-light'>
								<div className='card-body'>
									<h3 className='font-weight-light mb-3'>Register</h3>
									<div className='form-row'>
										{this.state.errorMessage && <FormError message={this.state.errorMessage}></FormError>}
										<section className='col-sm-12 form-group'>
											<label className='form-control-label sr-only' htmlFor='displayName'>
												Display Name
											</label>
											<input
												className='form-control'
												type='text'
												id='displayName'
												placeholder='Display Name'
												name='displayName'
												required
												value={this.state.displayName}
												onChange={this.handleChange}
											/>
										</section>
									</div>
									<section className='form-group'>
										<label className='form-control-label sr-only' htmlFor='email'>
											Email
										</label>
										<input
											className='form-control'
											type='email'
											id='email'
											placeholder='Email Address'
											required
											name='email'
											value={this.state.email}
											onChange={this.handleChange}
										/>
									</section>
									<div className='form-row'>
										<section className='col-sm-6 form-group'>
											<input
												className='form-control'
												type='password'
												name='passOne'
												placeholder='Password'
												value={this.state.passOne}
												onChange={this.handleChange}
											/>
										</section>
										<section className='col-sm-6 form-group'>
											<input
												className='form-control'
												type='password'
												required
												name='passTwo'
												placeholder='Repeat Password'
												value={this.state.passTwo}
												onChange={this.handleChange}
											/>
										</section>
									</div>
									<div className='form-group text-right mb-0'>
										<button className='btn btn-primary' type='submit'>
											Register
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

export default Register;
