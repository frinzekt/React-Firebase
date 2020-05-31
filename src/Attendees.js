import React, { useState, useEffect } from 'react';
import firebase from './Firebase';

// MY COMPONENTS
import AttendeeList from './AttendeeList';

const Attendees = ({ attendees, userID, meetingID, adminUser }) => {
	const [state, setState] = useState({
		displayAttendees: [],
		searchQuery: '',
	});

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	useEffect(() => {
		const ref = firebase.database().ref(`meetings/${userID}/${meetingID}/attendees`);
		ref.on('value', (snap) => {
			const attendees = snap.val();
			const attendeesList = [];

			// CONVERSION OF WHAT IS OBTAINED IN THE ID TO AN OBJECT WITH ID
			try {
				Object.keys(attendees).forEach((attendeeId) => {
					const { attendeeName, attendeeEmail, star } = attendees[attendeeId];
					attendeesList.push({
						attendeeId,
						attendeeName,
						attendeeEmail,
						star,
					});
				});
			} catch (err) {} //SILENT ERROR: HAPPENS ONLY WHEN THERE IS NO ATTENDEES

			setState({ ...state, displayAttendees: attendeesList });
		});
	}, []);

	console.log(state.displayAttendees);
	const filteredAttendees = state.displayAttendees.filter(({ attendeeName }) => {
		return attendeeName.toLowerCase().match(state.searchQuery.toLowerCase());
	});

	return (
		<div className='container mt-4'>
			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<h1 className='font-weight-light text-center'>Attendees</h1>
					<div className='card bg-light mb-4'>
						<div className='card-body text-center'>
							<input
								type='text'
								name='searchQuery'
								value={state.searchQuery}
								placeholder='Search Attendees'
								className='form-control'
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
			</div>
			<AttendeeList attendees={filteredAttendees} userID={userID} meetingID={meetingID} adminUser={adminUser}></AttendeeList>
		</div>
	);
};

export default Attendees;
