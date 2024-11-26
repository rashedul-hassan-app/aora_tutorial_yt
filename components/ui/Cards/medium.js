import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {YStack, XStack, Text, Card, Image} from 'tamagui';
import placeholderMaleImg from '../../../assets/images/placeholders/male-placeholder.png';
import placeholderFemaleImg from '../../../assets/images/placeholders/female-placeholder.png';

const MediumCard = ({item}) => {
	const getPlaceholderImage = (item) => {
		if (
			item.profile &&
			item.profile.sex &&
			item.profile.sex.toLowerCase() === 'male'
		) {
			return placeholderMaleImg;
		}
		return placeholderFemaleImg;
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
		>
			<XStack gap="$3" alignItems="center">
				<Image
					source={{uri: item.photoUrl || getPlaceholderImage(item)}}
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
		</Card>
	);
};

export default MediumCard;

const styles = StyleSheet.create({});
