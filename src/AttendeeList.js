import React from 'react';
import firebase from './Firebase';

// ICONS
import { GoTrashcan, GoStar } from 'react-icons/go';

const AttendeeList = ({ attendees, adminUser, userID, meetingID }) => {
	const isAdmin = adminUser === userID;

	const deleteAttendee = (meetingID, attendeeID) => (e) => {
		e.preventDefault();
		const ref = firebase.database().ref(`meetings/${adminUser}/${meetingID}/attendees/${attendeeID}`);
		ref.remove();
	};

	const toggleStar = (star, meetingID, attendeeID) => (e) => {
		e.preventDefault();
		const ref = firebase.database().ref(`meetings/${adminUser}/${meetingID}/attendees/${attendeeID}/star`);

		// NOT ALL ATTENDEES HAVE STAR
		if (star === undefined) {
			ref.set(true);
		} else {
			ref.set(!star);
		}
	};

	return (
		<div className='row justify-content-center'>
			{attendees.map(({ attendeeId, attendeeName, star }) => (
				<div className='col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1' key={attendeeId}>
					<div className='card '>
						<div className={`card-body px-3 py-2 d-flex align-items-center ${isAdmin ? '' : 'justify-content-center'}`}>
							{isAdmin && (
								<div className='btn-group pr-2'>
									<button
										className={`btn btn-sm btn-outline-secondary ${star ? 'btn-info' : 'btn-outline-secondary'}`}
										title='Give User A Star'
										onClick={toggleStar(star, meetingID, attendeeId)}
									>
										<GoStar></GoStar>
									</button>

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
