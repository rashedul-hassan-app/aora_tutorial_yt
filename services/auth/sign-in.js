import axios from 'axios';
import {Alert} from 'react-native';
import {router} from 'expo-router';
import {serverDetails} from '../../constants';

export const handleSignIn = async (form, signInFn, setSubmitting) => {
	if (form.username === '' || form.password === '') {
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
			signInFn(token, form.username);
			Alert.alert('Success', 'User signed in successfully');
			router.replace('/home');
		} else {
			Alert.alert('Error!', 'Email/Password is wrong');
		}
	} catch (error) {
		console.error('Error during signing in: ', error.message);
		Alert.alert(
			'Error',
			'Unable to sign in. Please check username and password and Try again!',
		);
	} finally {
		setSubmitting(false);
	}
};
