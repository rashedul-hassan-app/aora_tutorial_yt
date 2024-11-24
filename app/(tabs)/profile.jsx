import React, { useState, useEffect } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	YStack,
	XStack,
	H4,
	Input,
	Button,
	Card,
	Paragraph,
	Separator,
	Text,
} from "tamagui";
import { useAuthStore } from "../../store/authStore";
import { updateProfile } from "../../services/profile";
import { MultiSelectComponent } from "../../components/ui/Dropdown";
import { router } from "expo-router";

const Profile = () => {
	const auth_token = useAuthStore((state) => state.auth_token);
	const profileData = useAuthStore((state) => state.profile);
	const user = useAuthStore((state) => state.user);
	const SaveSignOutDataInStore = useAuthStore(
		(state) => state.SaveSignOutDataInStore
	);

	const [editableFields, setEditableFields] = useState({
		role: "",
		email: "",
		bio: "",
		location: "",
		languages: [],
		feedback: [],
		notes: "",
	});
	const [editing, setEditing] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (profileData) {
			setEditableFields({
        sex: user?.sex || "sir/madam",
				role: user?.role || "gg role",
				email: user?.email || "",
				bio: profileData.bio || "",
				location: profileData.location || "",
				languages: profileData.languages || [],
				feedback: profileData.feedback || [],
				notes: profileData.notes || "",
			});
		}
	}, [profileData]);

	const handleSave = async () => {
		if (!auth_token) {
			Alert.alert(
				"Error",
				"Authorization token is missing. Please log in again."
			);
			return;
		}

		setLoading(true);

		try {
			const updatedData = { ...editableFields };
			const updatedProfile = await updateProfile(auth_token, updatedData);

			if (updatedProfile) {
				Alert.alert("Success", "Profile updated successfully!");
				setEditing(false);
			} else {
				throw new Error("Failed to update profile. Please try again.");
			}
		} catch (error) {
			Alert.alert(
				"Error",
				error.response?.data?.message || "Failed to update profile."
			);
			console.error("Profile update error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSignOut = () => {
		SaveSignOutDataInStore();
		Alert.alert("Success", "You have been signed out.");
    router.replace('/');
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
			{/* Custom Header */}
			<YStack
				padding="$4"
				backgroundColor="#161622"
				borderBottomWidth={1}
				borderColor="#444"
			>
				<Text fontSize="$6" color="white" fontWeight="bold">
					Salam {profileData.sex === 'Male' ? ' brother' : ' sister'}
				</Text>
        	{/* Actions */}
          <XStack
									justifyContent="space-between"
									marginTop="$4"
								>
									{editing ? (
										<Button
											theme="primary"
											size="$4"
											onPress={handleSave}
											disabled={loading}
										>
											{loading
												? "Saving..."
												: "Save Changes"}
										</Button>
									) : (
										<Button
											theme="blue"
											size="$4"
											onPress={() => setEditing(true)}
										>
											Edit Profile
										</Button>
									)}
									<Button
										theme="red"
										size="$4"
										onPress={handleSignOut}
									>
										Sign Out
									</Button>
								</XStack>
			</YStack>

			<ScrollView>
				<YStack gap="$4" padding="$4">
					{profileData ? (
						<Card
							bordered
							elevate
							theme="dark"
							backgroundColor="#161622"
						>
							<YStack padding="$4" gap="$4">
								{/* Role */}
								<YStack>
									<H4 color="white">Role</H4>
									<Paragraph theme="alt2">
										{editableFields.role}
									</Paragraph>
								</YStack>
								{/* Role */}
								<YStack>
									<H4 color="white">Email</H4>
									<Paragraph theme="alt2">
										{editableFields.email}
									</Paragraph>
								</YStack>
								<Separator />

								{/* Bio */}
								<YStack>
									<H4 color="white">Bio</H4>
									<Input
										value={editableFields.bio}
										editable={editing}
										onChangeText={(text) =>
											setEditableFields((prev) => ({
												...prev,
												bio: text,
											}))
										}
										placeholder="Tell us about yourself"
										backgroundColor="#222"
										borderColor="#444"
										color="white"
									/>
								</YStack>
                {/* Bio */}
								<YStack>
									<H4 color="white">Location</H4>
									<Input
										value={editableFields.location}
										editable={editing}
										onChangeText={(text) =>
											setEditableFields((prev) => ({
												...prev,
												location: text,
											}))
										}
										placeholder="Where are you"
										backgroundColor="#222"
										borderColor="#444"
										color="white"
									/>
								</YStack>

             

								<Separator />

							

								{/* Languages */}
								<YStack>
									<H4 color="white">Languages</H4>
									<MultiSelectComponent
										selectedLanguages={
											editableFields.languages
										}
										onLanguageChange={(selected) =>
											setEditableFields((prev) => ({
												...prev,
												languages: selected,
											}))
										}
										editable={editing}
									/>
								</YStack>

								<Separator />

								{/* Feedback */}
								<YStack>
									<H4 color="white">Feedback</H4>
									{editableFields.feedback.length > 0 ? (
										editableFields.feedback.map(
											(feedback, index) => (
												<Paragraph
													key={index}
													theme="alt2"
												>
													- {feedback}
												</Paragraph>
											)
										)
									) : (
										<Paragraph theme="alt2">
											No feedback available
										</Paragraph>
									)}
								</YStack>

								<Separator />

								{/* Notes */}
								<YStack>
									<H4 color="white">Notes</H4>
									<Input
										value={editableFields.notes}
										editable={editing}
										onChangeText={(text) =>
											setEditableFields((prev) => ({
												...prev,
												notes: text,
											}))
										}
										placeholder="Add notes"
										backgroundColor="#222"
										borderColor="#444"
										color="white"
									/>
								</YStack>

							
							</YStack>
						</Card>
					) : (
						<Text color="white">Loading profile...</Text>
					)}
				</YStack>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
