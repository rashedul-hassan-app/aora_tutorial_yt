import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { languageOptions } from "../../../constants/languageOptions";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MultiSelectComponent = ({ selectedLanguages, onLanguageChange, placeholderText}) => {
	const [selected, setSelected] = useState([]);

	const renderItem = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.selectedTextStyle}>{item.label}</Text>
				{item.icon}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<MultiSelect
				activeColor={"orange"}
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={languageOptions}
				labelField="label"
				valueField="value"
				placeholder={placeholderText || "Select your language"}
				value={selectedLanguages}
				search
				searchPlaceholder="Search..."
				onChange={onLanguageChange}
				renderLeftIcon={() => (
					<FontAwesome name="language" size={24} color="black" />
				)}
				renderItem={renderItem}
				renderSelectedItem={(item, unSelect) => (
					<TouchableOpacity
						onPress={() => unSelect && unSelect(item)}
					>
						<View style={styles.selectedStyle}>
							<View className="px-1">{item.icon}</View>
							<Text style={styles.textSelectedStyle}>
								{item.label}
							</Text>
							<Entypo name="cross" size={16} color="black" />
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
	container: { padding: 0 },
	dropdown: {
		height: 50,
		backgroundColor: "white",
		borderRadius: 12,
		padding: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 14,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	icon: {
		marginRight: 5,
	},
	item: {
		padding: 17,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	selectedStyle: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 14,
		backgroundColor: "white",
		shadowColor: "#000",
		marginTop: 8,
		marginRight: 12,
		paddingHorizontal: 12,
		paddingVertical: 8,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	textSelectedStyle: {
		marginRight: 5,
		fontSize: 16,
	},
});
