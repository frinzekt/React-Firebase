import React, { useState, useEffect } from 'react';
import firebase from './Firebase';

// MY COMPONENTS
import AttendeeList from './AttendeeList';

const Attendees = ({ attendees, userID, meetingID, adminUser }) => {
	const [state, setState] = useState({
		displayAttendees: [],
	});

	useEffect(() => {
		const ref = firebase.database().ref(`meetings/${userID}/${meetingID}/attendees`);
		ref.on('value', (snap) => {
			const attendees = snap.val();
			const attendeesList = [];

			// CONVERSION OF WHAT IS OBTAINED IN THE ID TO AN OBJECT WITH ID
			try {
				Object.keys(attendees).forEach((attendeeId) => {
					const { attendeeName, attendeeEmail } = attendees[attendeeId];
					attendeesList.push({
						attendeeId,
						attendeeName,
						attendeeEmail,
					});
				});
			} catch (err) {} //SILENT ERROR: HAPPENS ONLY WHEN THERE IS NO ATTENDEES

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
			<AttendeeList attendees={state.displayAttendees} userID={userID} meetingID={meetingID} adminUser={adminUser}></AttendeeList>
		</div>
	);
};

export default Attendees;
