import { TouchableOpacity, Text } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

const CloseButton = ({ handlePress, containerStyles, isDisabled = false }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`
            ${containerStyles} `}
			disabled={isDisabled}
		>
			<Entypo name="cross" size={32} color="white" />
		</TouchableOpacity>
	);
};

export default CloseButton;
