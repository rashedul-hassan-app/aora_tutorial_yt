import {StyleSheet} from 'react-native';
import React from 'react';
import {YStack, XStack, Text, Card, Image} from 'tamagui';
import placeholderMaleImg from '../../../assets/images/placeholders/male-placeholder.png';
import placeholderFemaleImg from '../../../assets/images/placeholders/female-placeholder.png';
import genericPlaceholderImg from '../../../assets/images/placeholders/placeholder-250.png';
import {ChevronRight} from '@tamagui/lucide-icons';
import {router} from 'expo-router';
import {useSearchStore} from '../../../store/useSearchStore';

const MediumCard = ({item}) => {
	const setSelectedTutor = useSearchStore((state) => state.setSelectedTutor);

	const getPlaceholderImage = (item) => {
		if (item && item.sex) {
			console.log(item.sex);
			if (item.sex.toLowerCase() === 'male') {
				return placeholderMaleImg;
			} else if (item.sex.toLowerCase() === 'female') {
				return placeholderFemaleImg;
			}
		}
		return genericPlaceholderImg;
	};

	const handleCardPress = (tutor) => {
		setSelectedTutor(tutor);
		router.push('/screens/searchProfile');
	};

	return (
		<Card
			padding="$4"
			marginBottom="$3"
			backgroundColor="white"
			borderRadius="$6"
			borderStyle="solid"
			borderWidth={1}
			borderColor={'orange'}
			onPress={() => handleCardPress(item)}
		>
			<XStack gap="$3" alignItems="center" justifyContent="space-between">
				<XStack gap="$5" alignItems="center">
					<Image
						source={{
							uri: item.photoUrl || getPlaceholderImage(item),
						}}
						style={{
							width: 50,
							height: 50,
							borderRadius: 25,
						}}
					/>
					<YStack>
						<Text fontWeight="bold">
							{item.name ? item.name : 'Your Name'}
						</Text>
						<Text>{item.profile.location}</Text>
						<Text>{item.sex}</Text>
						<Text>
							Languages:{' '}
							{item.profile.languages
								? item.profile.languages.join(', ')
								: ''}
						</Text>
						<Text>Rating: {item.profile.rating}</Text>
					</YStack>
				</XStack>
				<ChevronRight size={24} color="black" />
			</XStack>
		</Card>
	);
};

export default MediumCard;

const styles = StyleSheet.create({});
