import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {saveData, readData, removeData} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
	persist(
		(set) => ({
			auth_token: null,
			user: null,
			isLoading: true,
			isLoggedIn: false,

			SaveSignInDataInStore: async (auth_token, user) => {
				set({auth_token, user, isLoggedIn: true});
				await saveData('auth_token', {auth_token, user});
				console.log('data saved upon signing in');
				const confirm = await readData('auth_token');
				console.log('confirming saved data', confirm);
			},

			SaveSignOutDataInStore: async () => {
				set({auth_token: null, user: null, isLoggedIn: false});
				await removeData('auth_token');
				console.log('Zustand: Sign out function executed');
			},

			RefreshTokenDataInStore: async (newToken) => {
				set((state) => ({...state, auth_token: newToken}));
				const currentState = await readData('auth_token');
				if (currentState) {
					await saveData('auth_token', {
						...currentState,
						auth_token: newToken,
					});
				}
			},

			LoadAuthStateFromStore: async () => {
				const authData = await AsyncStorage.getItem('auth_token');
				if (authData) {
					const parsedData = JSON.parse(authData);
					set({
						auth_token: parsedData.auth_token,
						user: parsedData.user,
						isLoading: false,
					});

					if (parsedData.auth_token && parsedData.user) {
						set({isLoggedIn: true});
					}
				} else {
					set({auth_token: null, user: null, isLoading: false});
				}
			},
		}),
		{
			name: 'auth_token',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
