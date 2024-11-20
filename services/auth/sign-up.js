import axios from 'axios';
import {Alert} from 'react-native';
import {router} from 'expo-router';
import {serverDetails} from '../../constants';
import {useAuthStore} from '../../store/authStore';

export const handleSignUp = async (
	form,
	setSubmitting,
	saveSignInDataInStore,
) => {
	if (
		form.email === '' ||
		form.password === '' ||
		form.languages.length === 0
	) {
		Alert.alert('Sorry!', 'Please fill in all the fields');
		return;
	}

	setSubmitting(true);

	try {
		const response = await axios.post(
			`${serverDetails.apiEndpoint}/signup`,
			form,
			{
				headers: {'Content-Type': 'application/json'},
			},
		);

		if (response.status === 200) {
			Alert.alert('Success', 'Account created successfully');
			if (response.data.token) {
				console.log(response.data.token);

				await saveSignInDataInStore(response.data.token, form.email);
				router.replace('/home');
			}
		} else {
			Alert.alert('Error', 'Unable to create account');
		}
	} catch (error) {
		console.error('Error during sign-up: ', error.message);
		Alert.alert('Error', 'Unable to sign up. Please try again!');
	} finally {
		setSubmitting(false);
	}
};
