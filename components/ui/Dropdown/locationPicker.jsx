import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Button } from "tamagui";

const LocationPicker = ({
	onCountryChange,
	placeholder = "Country",
}) => {
	const [visible, setVisible] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState();

	const handleSelect = (country) => {
		const countryName = country.name; // Extract country name
		console.log("Selected Country:", country);
		onCountryChange(countryName); // Pass it to the parent
		setSelectedCountry(countryName);
		setVisible(false); // Close the modal after selection
	};

	const toggleModal = () => {
		setVisible(!visible);
	};

	const clearSelection = () => {
		onCountryChange("");
		setSelectedCountry("");
	};

	return (
		<View className="-mb-6">
			<View style={styles.locationButton}>
				<Button
					size="$5"
					onPress={toggleModal}
					boxShadow={"0 2 5px rgba(0, 0, 0, 0.2)"}
					icon={
						<FontAwesome5
							name="map-marker-alt"
							size={20}
							color="blue"
						/>
					}
					theme={"primary"}
					backgroundColor={"#fff"}
					elevation={'$1'}
				>
					{selectedCountry || placeholder}
				</Button>
			</View>
			{selectedCountry && (
				<Text
					className="pt-2 text-center"
					onPress={clearSelection}
					color="gray"
				>
					{" "}
					Remove Location
				</Text>
			)}
			<CountryPicker
				onSelect={handleSelect}
				preferredCountries={["BD", "GB", "US", "-"]}
				withFilter
				withFlag
				withCountryNameButton={true}
				excludeCountries={["IL"]}
				visible={visible} // Control visibility here
				onClose={() => setVisible(false)} // Close the modal when dismissed
				placeholder={""}
			/>
		</View>
	);
};

export default LocationPicker;

const styles = StyleSheet.create({
	locationButton: {
		// marginHorizontal: 4,
		// width: "100%",
		// display: "flex",
		// flexDirection: "row",
		// justifyContent: "center",
		// alignItems: "center",
		// padding: 4,
		// backgroundColor: 'white',
		// borderRadius: 10,
		// boxShadow: '0 1 5px rgba(0, 0, 0, 0.2)',
		// height: 48,
		// color: 'black',
	},
});
