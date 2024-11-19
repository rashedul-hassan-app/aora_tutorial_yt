import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';

const useAuthStore = create(
	persist(
		(set, get) => ({
			token: null,
			user: null,

			signIn: (token, user) => {
				set({token, user});
			},

			signOut: () => {
				console.log('Zustand: Sign out function executed');
				set({token: null, user: null});
				// await AsyncStorage.removeItem('auth_token');
			},

			refreshToken: (newToken) => {
				set({token: newToken});
			},
		}),
		{
			name: 'auth_token',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

export default useAuthStore;
