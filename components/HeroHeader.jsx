import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
} from "react-native";
import { Button, Input } from "tamagui";

const HeroHeader = ({ email, photoUrl, title, subtitle }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View>
					<Image
						source={{
							uri: photoUrl || "https://via.placeholder.com/150",
						}}
						style={styles.image}
						resizeMode="cover"
					/>
				</View>
				<View>
					<Text style={styles.title}>
						{title}
						{", "}
						<Text style={styles.subTitle}>{subtitle}</Text>
					</Text>
				</View>
			</View>
			<View className="mx-5">
                <Input className="w-2/3" size={"$3"} value={email?? 'no email found'} placeholder={`Size $}...`} />
			</View>
		</SafeAreaView>
	);
};

export default HeroHeader;

const styles = StyleSheet.create({
	container: {
        backgroundColor: 'orange',
        height: "280",
        borderBottomLeftRadius: "6%",
        borderBottomRightRadius: "6%",
        // borderBottomStartRadius: "6%",
        // borderBottomEndRadius: "6%",
	},
	header: {
		width: "80%",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 24,
		
		gap: 25,
		height: "65%",
	},
	image: {
		width: 64,
		height: 64,
		borderRadius: 32,
		borderWidth: 4,
		borderColor: "#FFD700", // Optional, for image outline
	},
	text: {
		marginLeft: 12,
		fontSize: 18,
		color: "#000", // Black text
		fontWeight: "600", // Semi-bold
	},
	title: {
		fontSize: 32,
	},
	subTitle: {
		fontSize: 32,
		color: "#505050",
	},
});
