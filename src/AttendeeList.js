import React from 'react';

const AttendeeList = ({ attendees }) => {
	console.log(attendees);
	return (
		<div className='row justify-content-center'>
			{attendees.map((attendee) => (
				<div className='col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1' key={attendee.attendeeId}>
					<div className='card '>
						<div className='card-body px-3 py-2 d-flex align-items-center justify-content-center'>
							<div>{attendee.attendeeName}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AttendeeList;
