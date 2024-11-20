import {Alert} from 'react-native';
import {router} from 'expo-router';
import {useAuthStore} from '../../store/authStore';

export const handleSignOut = async () => {
	console.log('Triggered log out func');
	const saveSignOutDataInStore =
		useAuthStore.getState().SaveSignOutDataInStore;
	console.log('Retrieved signOutFn:', saveSignOutDataInStore);

	try {
		await saveSignOutDataInStore();
		router.replace('/sign-in');
	} catch (error) {
		console.error('Error during logout:', error);
		Alert.alert('Error', 'Something went wrong while logging out.');
	}
};
