import React from 'react';

const FormError = ({ message }) => {
	return <div className='col-12 alert alert-danger px-3'>{message}</div>;
};

export default FormError;
