import axios from 'axios';
import {serverDetails} from '../../constants';

export const updateProfile = async (auth_token, editableFields) => {
	try {
		console.log('Updating Profile with Token:', auth_token);
		const response = await axios.put(
			`${serverDetails.apiEndpoint}/api/profile`,
			editableFields,
			{
				headers: {
					Authorization: `Bearer ${auth_token}`,
					'Content-Type': 'application/json',
				},
			},
		);

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('Failed to update profile');
		}
	} catch (error) {
		console.error(
			'Error updating profile:',
			error.response?.data || error.message,
		);
		return null;
	}
};
