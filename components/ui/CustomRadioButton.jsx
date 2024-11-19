import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const CustomRadioButton = ({ selectedOption, options, onOptionChange }) => {
	return (
		<View className="flex flex-row gap-5">
			{options.map((option) => (
				<TouchableOpacity
					key={option}
					className={`border-slate-700 flex-row items-center gap-2 px-5 py-3 rounded-full ${
						selectedOption === option
							? "bg-secondary"
							: "bg-black-100 border-2"
					}`}
					onPress={() => onOptionChange(option)}
				>
					<View
						className={`w-5 h-5 rounded-full  ${
							selectedOption === option
								? "bg-orange-500"
								: "bg-gray-300"
						}`}
					/>
					<Text
						className={`text-white text-lg ${
							selectedOption === option
								? "font-semibold"
								: "font-medium"
						}`}
					>
						{option.charAt(0).toUpperCase() + option.slice(1)}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default CustomRadioButton;
