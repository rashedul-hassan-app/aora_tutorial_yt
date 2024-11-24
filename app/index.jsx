import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { Redirect, SplashScreen, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInUp,
	Easing,
} from "react-native-reanimated";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { images } from "../constants";
import CustomButton from "../components/ui/CustomButton";

export default function App() {
	const LoadAuthStateFromStore = useAuthStore(
		(state) => state.LoadAuthStateFromStore
	);
	const auth_token = useAuthStore((state) => state.auth_token);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const isLoading = useAuthStore((state) => state.isLoading);

	useEffect(() => {
		const initializeApp = async () => {
			await LoadAuthStateFromStore(); // Load auth state and profile
			await SplashScreen.hideAsync(); // Hide splash screen after loading is complete
		};

		initializeApp();
	}, []);

	if (isLoggedIn && auth_token && !isLoading) {
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
							className="w-[136px] h-[15px] absolute -bottom-4 -right-10"
							resizeMode="contain"
						/>
					</Animated.View>
					<Animated.Text
						entering={FadeIn.delay(300)
							.duration(500)
							.easing(Easing.in(Easing.quad))}
						className="text-sm font-pregular text-gray-100 my-7 text-center"
					>
						Enlighten your heart with Quranic knowledge. Connect
						with the words that shaped the world!
					</Animated.Text>
					<Animated.View
						entering={FadeInDown.delay(500)
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
						entering={FadeInDown.delay(700)
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
