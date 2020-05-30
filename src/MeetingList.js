import React, { Fragment } from 'react';
import firebase from './Firebase';
import { GoTrashcan } from 'react-icons/go';
import { navigate } from '@reach/router';

const MeetingList = ({ meetings, userID }) => {
	const deleteMeeting = (meetingID) => (e) => {
		e.preventDefault();
		const ref = firebase.database().ref(`meetings/${userID}/${meetingID}`);
		ref.remove();
	};
	return (
		<Fragment>
			{meetings.map(({ meetingName, meetingID }) => (
				<div className='list-group-item d-flex' key={meetingID}>
					<section className='btn-group align-self-center'>
						<button className='btn btn-sm btn-outline-secondary' title='Delete Meeting' onClick={deleteMeeting(meetingID)}>
							<GoTrashcan></GoTrashcan>
						</button>
					</section>
					<section className='pl-3 text-left align-self-center'>{meetingName}</section>
				</div>
			))}
		</Fragment>
	);
};

export default MeetingList;
