import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProfile} from '../services/profile';

export const useAuthStore = create(
	persist(
		(set, get) => ({
			auth_token: null,
			user: null,
			profile: null,
			isLoading: true,
			isLoggedIn: false,

			LoadAuthStateFromStore: async () => {
				try {
					const state = get();
					if (!state.auth_token) return;

					const profileData = await getProfile(state.auth_token);
					const {role, email, profile} = profileData.data;
					set({
						user: {role, email},
						profile,
						isLoggedIn: true,
						isLoading: false,
					});
				} catch (error) {
					console.error('Error loading profile data', error);
					set({isLoading: false});
				}
			},

			SaveSignInDataInStore: async (auth_token, user) => {
				set({auth_token, user, isLoggedIn: true});
				const state = get();
				await state.LoadAuthStateFromStore();
			},

			SaveSignOutDataInStore: () => {
				set({
					auth_token: null,
					user: null,
					profile: null,
					isLoggedIn: false,
				});
			},
		}),
		{
			name: 'auth_store',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
