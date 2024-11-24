import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	editable = true,
	rightComponent,
	otherStyles,
	...props
}) => {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium mb-3">
				{title}
			</Text>

			<View
				className={`w-full h-16 px-4 bg-black-100 rounded-2xl flex flex-row items-center`}
				style={{
					borderWidth: 2,
					borderColor: focused ? "orange" : "#2C2C2E", // Adjust colors as needed
				}}
			>
				<TextInput
					className="flex-1 text-white font-psemibold text-base"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7B7B8B"
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
					autoCapitalize="none"
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					editable={editable}
					{...props}
				/>
				{title === "Password" && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
					>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
				{/* Right Component */}
				{rightComponent}
			</View>
		</View>
	);
};

export default FormField;
