import axios from 'axios';
import {serverDetails} from '../../constants';

export const getProfile = async (token) => {
	try {
		const response = await axios.get(
			`${serverDetails.apiEndpoint}/api/profile`,
			{
				headers: {Authorization: `Bearer ${token}`},
			},
		);

		if (response.status === 200) {
			return response.data; // Return the profile data
		} else {
			throw new Error('Failed to fetch profile');
		}
	} catch (error) {
		console.error('Error fetching profile:', error.message);
		return null; // Return null or handle the error appropriately
	}
};
