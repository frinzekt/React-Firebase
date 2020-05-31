import React, { useState, useEffect } from 'react';
import firebase from './Firebase';

//ICONS
import { FaUndo, FaRandom } from 'react-icons/fa';

// MY COMPONENTS
import AttendeeList from './AttendeeList';

const Attendees = ({ attendees, userID, meetingID, adminUser }) => {
	const [state, setState] = useState({
		displayAttendees: [],
		allAttendees: [],
		searchQuery: '',
	});

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const chooseRandom = () => {
		const randomAttendeeIndex = Math.floor(Math.random() * state.allAttendees.length);
		resetQuery();
		//ALL ATTENDEES IS THE EXACT COPY OF THE DISPLAY ATTENDEES EXCEPT ALLATTENDEES HAS ALL
		// WHILE DISPLAY ATTENDEES IS ONLY CONCERNED ABOUT THE ACTUAL ATTENDEES
		setState({ ...state, displayAttendees: [state.allAttendees[randomAttendeeIndex]] });
	};

	const resetQuery = () => {
		setState({ ...state, searchQuery: '', displayAttendees: state.allAttendees });
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

			setState({ ...state, displayAttendees: attendeesList, allAttendees: attendeesList });
		});
	}, []);

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
							<div className='input-group input-group-lg'>
								<input
									type='text'
									name='searchQuery'
									value={state.searchQuery}
									placeholder='Search Attendees'
									className='form-control'
									onChange={handleChange}
								/>
								<div className='input-group-append'>
									<button className='btn btn-sm btn-outline-info' title='Reset Search' onClick={resetQuery}>
										<FaUndo></FaUndo>
									</button>
									<button className='btn btn-sm btn-outline-info' title='Pick a Random Attendee' onClick={chooseRandom}>
										<FaRandom></FaRandom>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AttendeeList attendees={filteredAttendees} userID={userID} meetingID={meetingID} adminUser={adminUser}></AttendeeList>
		</div>
	);
};

export default Attendees;
