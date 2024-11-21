import axios from 'axios';
import {Alert} from 'react-native';
import {router} from 'expo-router';
import {serverDetails} from '../../constants';

export const handleSignIn = async (
	form,
	saveSignInDataInStore,
	setSubmitting,
) => {
	if (form.email === '' || form.password === '') {
		Alert.alert('Error', 'Please fill in all fields');
		return;
	}

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
			await saveSignInDataInStore(token, form.email);
			Alert.alert('Success', 'User signed in successfully');
			setTimeout(() => {
				router.replace('/home');
			}, 100);
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
