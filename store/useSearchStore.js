import {create} from 'zustand';

export const useSearchStore = create((set) => ({
	searchResults: [],
	setSearchResults: (results) => set({searchResults: results}),
	selectedTutor: null,
	setSelectedTutor: (tutor) => set({selectedTutor: tutor}),
}));
