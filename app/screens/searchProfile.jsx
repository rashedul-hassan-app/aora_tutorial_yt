import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
	YStack,
	XStack,
	Button,
	Text,
	Card,
	Image,
	H2,
	H3,
	H4,
	H5,
	Avatar,
	Paragraph,
	Separator,
} from "tamagui";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useSearchStore } from "../../store/useSearchStore";
import { getPlaceholderImage } from "../../lib/getPlaceholderImage";
import { languageOptions } from "../../constants/languageOptions";

const SearchProfile = () => {
	const router = useRouter();
	const tutor = useSearchStore((state) => state.selectedTutor);

	console.log(tutor);
	if (!tutor) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>No tutor selected</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
			<ScrollView>
				<YStack padding="$4">
					<YStack
						justifyContent="center"
						alignItems="center"
						margin="$3"
					>
						<Avatar circular size="$10">
							<Avatar.Image
								accessibilityLabel="UserPhoto"
								src={getPlaceholderImage(tutor.sex)}
							/>
						</Avatar>
						<Text padding="$3">Salam!</Text>
						<H4>{tutor.profile.bio}</H4>
					</YStack>
					<Separator />

					{/* Languages & Location */}
					<XStack justifyContent="center" gap="$5">
						<YStack  alignItems="center" paddingTop="$3" color="black">
							<H5>Languages</H5>
							<YStack padding="$3">
								{tutor.profile.languages.map((item, index) => {
									// Find the matching language option
									const matchedOption = languageOptions.find(
										(option) => option.value === item
									);

									// If a match is found, render the icon and label
									return matchedOption ? (
										<XStack
											key={index}
											alignItems="center"
											marginBottom="$2"
											style={{
												display: "flex",
												flexDirection: "row",
												gap: 8,
											}}
										>
											{matchedOption.icon}
											<Text>{matchedOption.label}</Text>
											{/* Render the language name */}
										</XStack>
									) : null;
								})}
							</YStack>
						</YStack>
                        <YStack  alignItems="center"  padding="$3" >
                        
                        {tutor.profile?.location && (
                            <>
                                <H5>Location</H5>
                                <YStack padding="$3"><Text>{tutor.profile.location}</Text></YStack>
                            </>
                        )}
                        </YStack>
					</XStack>
				</YStack>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SearchProfile;
