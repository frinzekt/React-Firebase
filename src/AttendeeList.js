import React from 'react';
import firebase from './Firebase';

// ICONS
import { GoTrashcan } from 'react-icons/go';

const AttendeeList = ({ attendees, adminUser, userID, meetingID }) => {
	const isAdmin = adminUser === userID;

	const deleteAttendee = (meetingID, attendeeID) => (e) => {
		e.preventDefault();
		const ref = firebase.database().ref(`meetings/${adminUser}/${meetingID}/attendees/${attendeeID}`);
		ref.remove();
	};

	return (
		<div className='row justify-content-center'>
			{attendees.map(({ attendeeId, attendeeName }) => (
				<div className='col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1' key={attendeeId}>
					<div className='card '>
						<div className={`card-body px-3 py-2 d-flex align-items-center ${isAdmin ? '' : 'justify-content-center'}`}>
							{isAdmin && (
								<div className='btn-group pr-2'>
									<button
										className='btn btn-sm btn-outline-secondary'
										title='Delete Attendee'
										onClick={deleteAttendee(meetingID, attendeeId)}
									>
										<GoTrashcan></GoTrashcan>
									</button>
								</div>
							)}
							<div>{attendeeName}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AttendeeList;
