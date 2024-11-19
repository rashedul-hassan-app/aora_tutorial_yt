import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';

export const useUserStore = create(
	persist(
		(set) => ({
			hasFinishedOnboarding: false,
			toggleHasOnboarded: () => {
				set((state) => {
					return {
						...state,
						hasFinishedOnboarding: !state.hasFinishedOnboarding,
					};
				});
			},
		}),
		{
			name: 'quran_tutor_user_store',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
