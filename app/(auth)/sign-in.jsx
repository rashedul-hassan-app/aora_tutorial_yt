import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import CustomButton from "../../components/ui/CustomButton";
import FormField from "../../components/FormField";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import { serverDetails } from "../../constants";

// import { getCurrentUser, signIn } from "../../lib/appwrite";
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
	const signInFn = useAuthStore((state) => state.signIn);

	// const { setUser, setIsLogged } = useGlobalContext();
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const handleSignIn = async () => {
		if (form.username === "" || form.password === "") {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setSubmitting(true);

		try {
			const response =  await axios.post(`${serverDetails.apiEndpoint}/signin`, form, {
				headers: { 'Content-Type': 'application/json' }
			});

			if (response.status === 200) {
				const { token } = response.data;
				signInFn(token, form.username);
				Alert.alert("Success", "User signed in successfully");
				router.replace("/home");
			} else {
				Alert.alert("Error!", "Email/Password is wrong");
			}
		} catch (error) {
			console.error("Error during signing in: ", error.message);
			Alert.alert("Error", "Unable to sign in. Please check username and password and Try again!");
		} finally {
			setSubmitting(false);
		}
		
	};


	return (
		<SafeAreaView className="bg-primary h-full px-2">
			<ScrollView>
				<View
					className="w-full flex justify-center min-h-[85vh] px-4 my-6"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[34px]"
					/>

					<Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
						Log in to Quran Tutor
					</Text>

					<FormField
						title="username"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-7"
					/>

					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) =>
							setForm({ ...form, password: e })
						}
						otherStyles="mt-7"
					/>

					<CustomButton
						title="Sign In"
						handlePress={handleSignIn}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

					<View className="flex justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have an account?
						</Text>
						<Link
							href="/sign-up"
							className="text-lg font-psemibold text-secondary"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
