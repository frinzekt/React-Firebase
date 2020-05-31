import React, { useState, useEffect } from 'react';
import firebase from './Firebase';

const Attendees = ({ attendees, userID, meetingID }) => {
	const [state, setState] = useState({
		displayAttendees: [],
	});

	useEffect(() => {
		const ref = firebase.database().ref(`meetings/${userID}/${meetingID}/attendees`);
		ref.on('value', (snap) => {
			const attendees = snap.val();
			console.log(attendees);
			const attendeesList = [];

			// CONVERSION OF WHAT IS OBTAINED IN THE ID TO AN OBJECT WITH ID
			Object.keys(attendees).forEach((attendeeId) => {
				const { attendeeName, attendeeEmail } = attendees[attendeeId];
				attendeesList.push({
					attendeeId,
					attendeeName,
					attendeeEmail,
				});
			});

			setState({ displayAttendees: attendeesList });
		});
	}, []);

	return (
		<div className='container mt-4'>
			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<h1 className='font-weight-light text-center'>Attendees</h1>
				</div>
			</div>
			List Goes Here
		</div>
	);
};

export default Attendees;
