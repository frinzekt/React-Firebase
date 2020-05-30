import React, { Fragment } from 'react';

const MeetingList = ({ meetings }) => {
	console.log(meetings);
	return (
		<Fragment>
			{meetings.map(({ meetingName, meetingID }) => (
				<div className='list-group-item d-flex' key={meetingID}>
					<section className='pl-3 text-left align-self-center'>{meetingName}</section>
				</div>
			))}
		</Fragment>
	);
};

export default MeetingList;
