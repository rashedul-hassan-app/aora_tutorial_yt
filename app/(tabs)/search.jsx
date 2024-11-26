import React, { useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import {
	YStack,
	XStack,
	Input,
	Button,
	Text,
	Separator,
  Spinner,
	Card,
	Image,
  H5,
} from "tamagui";
import { Search as SearchIcon } from "@tamagui/lucide-icons";
import { MultiSelectComponent } from "../../components/ui/Dropdown"; // Reuse your existing dropdown component
import { router } from "expo-router";
import { fetchTutorProfiles } from "../../services/search";
import { useAuthStore } from "../../store/authStore";
import { MediumCard } from "../../components/ui/Cards";

const Search = () => {
	const auth_token = useAuthStore((state) => state.auth_token);

	const [query, setQuery] = useState("");
	const [selectedLanguages, setSelectedLanguages] = useState([]);
	const [location, setLocation] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const handleSearch = async () => {
		if (!auth_token) {
			Alert.alert(
				"Error",
				"Authorization token is missing. Please log in again."
			);
			router.replace("/");

			return;
		}

		const paramsToSendToApi = {
			query,
			location,
			languages: selectedLanguages,
		};
		setLoading(true);
		const data = await fetchTutorProfiles(auth_token, paramsToSendToApi);
		setResults(data);
		setLoading(false);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
			<YStack gap="$4" padding="$4">
				<Input
					placeholder="Search tutors..."
					value={query}
					onChangeText={setQuery}
					size="$4"
					width="100%"
					borderWidth={1}
					borderColor="gray"
					borderRadius="$2"
				/>
				<MultiSelectComponent
					selectedLanguages={selectedLanguages}
					onLanguageChange={setSelectedLanguages}
					placeholderText={" Filter by language"}
				/>
				<Button
					icon={<SearchIcon size="$1" />}
					onPress={handleSearch}
					size="$4"
					backgroundColor="#6200ea"
					color="white"
				>
					Search
				</Button>
				<Separator borderWidth={1} borderColor="lightgray" />
				{isLoading ? (
					<YStack paddingTop="$5" alignSelf="center" aignItems="center">
						<H5 >Loading...</H5>
						<Spinner size="large" color="$orange10" />
					</YStack>
				) : (
					<FlatList
						data={results}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <MediumCard item={item} />}
            contentContainerStyle={{ marginBottom: 250 }}
					/>
				)}
			</YStack>
		</SafeAreaView>
	);
};

export default Search;
