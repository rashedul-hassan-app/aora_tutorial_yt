import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { Redirect, SplashScreen, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import { images } from "../constants";
import CustomButton from "../components/ui/CustomButton";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { readData } from "../utils/storage";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInUp,
	FadeOut,
	Easing,
} from "react-native-reanimated";

export default function App() {
	const { isLoading, isLoggedIn, LoadAuthStateFromStore } = useAuthStore();

	useEffect(() => {
		const initializeApp = async () => {
			await LoadAuthStateFromStore();
			SplashScreen.hideAsync(); // Hide splash screen once loading is complete
			const savedData = await readData("auth_token");
			console.log("launch data");
			console.log(savedData);
		};

		initializeApp();
	}, []);

	if (isLoading) {
		// Return null to ensure the splash screen remains visible until `SplashScreen.hideAsync` is called
		return null;
	}

	if (isLoggedIn) {
		return <Redirect href="/home" />;
	}


	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full flex justify-center items-center min-h-[85vh] px-4">
					<Animated.Image
						entering={FadeInUp.duration(100).easing(
							Easing.inOut(Easing.quad)
						)}
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>

					<Animated.Image
						entering={FadeIn.duration(300).easing(
							Easing.inOut(Easing.quad)
						)}
						source={images.cards}
						className="max-w-[380px] w-full h-[298px]"
						resizeMode="contain"
					/>

					<Animated.View
						entering={FadeIn.delay(100)
							.duration(500)
							.easing(Easing.in(Easing.quad))}
						className="relative mt-5"
					>
						<Text className="text-3xl text-white font-bold text-center">
							"We have made the Qur'an" {"\n"} Easy to remember{" "}
							<Text className="text-secondary-200"> 54:40</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[136px] h-[15px] absolute 
						-bottom-4 -right-10"
							resizeMode="contain"
						/>
					</Animated.View>

					<Animated.Text
						entering={FadeIn.delay(400)
							.duration(500)
							.easing(Easing.in(Easing.quad))}
						className="text-sm font-pregular text-gray-100 my-7 text-center"
					>
						Enlighten your heart with Quranic knowledge. Connect
						with the words that shaped the world!
					</Animated.Text>
					<Animated.View
						entering={FadeInDown.delay(900)
							.duration(600)
							.easing(Easing.in(Easing.quad))}
						className={"w-full"}
					>
						<CustomButton
							title="Sign In with Email"
							handlePress={() => router.push("/sign-in")}
							containerStyles="bg-secondary w-full mt-7"
						/>
					</Animated.View>
					<Animated.View
						className={"w-full"}
						entering={FadeInDown.delay(1200)
							.duration(500)
							.easing(Easing.in(Easing.quad))}
					>
						<CustomButton
							title="Register"
							handlePress={() => router.push("/sign-up")}
							containerStyles="bg-white w-full mt-7"
						/>
					</Animated.View>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}
