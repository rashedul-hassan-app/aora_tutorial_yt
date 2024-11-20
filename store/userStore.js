import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {saveData, readData, removeData} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(
	persist(
		(set) => ({
			hasFinishedOnboarding: false,

			toggleHasOnboarded: async () => {
				set((state) => {
					const updatedState = {
						...state,
						hasFinishedOnboarding: !state.hasFinishedOnboarding,
					};
					saveData('quran_tutor_user_store', updatedState); // Save manually if needed
					return updatedState;
				});
			},

			loadOnboardingState: async () => {
				const data = await readData('quran_tutor_user_store');
				if (data?.hasFinishedOnboarding !== undefined) {
					set({hasFinishedOnboarding: data.hasFinishedOnboarding});
				}
			},
		}),
		{
			name: 'quran_tutor_user_store',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
