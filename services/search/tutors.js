import axios from 'axios';
import {serverDetails} from '../../constants';

export const fetchTutorProfiles = async (token, searchParams) => {
	try {
		// Initialize URLSearchParams
		const params = new URLSearchParams();

		// We have to use URLSearch params because our languages are of array type
		// we cannot just send array over, we need to serialise it with URLSearchparams
		Object.entries(searchParams).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				// Append array values with the same key (e.g., languages[]=value)
				value.forEach((item) => params.append(`${key}[]`, item));
			} else {
				// Append single key-value pairs
				params.append(key, value);
			}
			console.log(params);
			console.log(searchParams);
		});

		const response = await axios.get(
			`${serverDetails.apiEndpoint}/api/search-profile`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				params,
			},
		);

		if (response.status === 200) {
			console.log('Fetch Tutors sent 200');
			return response.data; // Return the profile data
		} else {
			throw new Error('Failed to fetch Tutor search profile');
		}
	} catch (error) {
		console.error('Error fetching profile:', error.message);
		return null; // Return null or handle the error appropriately
	}
};
