import React, { Component } from 'react';

class Welcome extends Component {
	render() {
		const { user } = this.props;

		return (
			<div className='text-center mt-4'>
				<h1 className='text-primary'>Register</h1>
			</div>
		);
	}
}

export default Welcome;
