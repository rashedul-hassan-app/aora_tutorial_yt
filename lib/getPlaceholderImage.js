import placeholderMaleImg from '../assets/images/placeholders/male-placeholder.png';
import placeholderFemaleImg from '../assets/images/placeholders/female-placeholder.png';
import genericPlaceholderImg from '../assets/images/placeholders/placeholder-250.png';

export const getPlaceholderImage = (item) => {
	if (item) {
		console.log(item);
		if (item.toLowerCase() === 'male') {
			return placeholderMaleImg;
		} else if (item.toLowerCase() === 'female') {
			return placeholderFemaleImg;
		}
	}
	return genericPlaceholderImg;
};
