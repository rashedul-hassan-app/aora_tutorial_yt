import axios from 'axios';
import {serverDetails} from '../../constants';

export const getProfile = async () => {
	setSubmitting(true);

	try {
		const response = await axios.post(
			`${serverDetails.apiEndpoint}/signin`,
			form,
			{
				headers: {'Content-Type': 'application/json'},
			},
		);

		if (response.status === 200) {
			const {token} = response.data;
			saveSignInDataInStore(token, form.email);
			Alert.alert('Success', 'User signed in successfully');
			router.replace('/home');
		} else {
			Alert.alert('Error!', 'Email/Password is wrong');
		}
	} catch (error) {
		console.error('Error during signing in: ', error.message);
		Alert.alert(
			'Error',
			'Unable to sign in. Please check email and password and Try again!',
		);
	} finally {
		setSubmitting(false);
	}
};
