import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import CustomButton from "../../components/ui/CustomButton";
import FormField from "../../components/FormField";
import { handleSignIn } from "../../services/auth";
import CloseButton from "../../components/ui/CloseButton";
import { useAuthStore } from "../../store/authStore";

const SignIn = () => {
	const saveSignInDataInStore = useAuthStore((state) => state.SaveSignInDataInStore);

	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	if (isSubmitting) {
		return (
			<View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="orange" />
			</View>
		  );
	}
	return (
		<SafeAreaView className="bg-primary h-full px-2">
			<ScrollView>
			<CloseButton containerStyles={'absolute right-4 top-4'} handlePress={() => router.replace("/")} />
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
						title="email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
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
					<Text className="mt-2 text-right">
						<Link
							href="/sign-up"
							className="text-lg font-psemibold text-white "
						>
							Forgot Password?
						</Link>
					</Text>
					<CustomButton
						title="Sign In"
						handlePress={() =>
							handleSignIn(form, saveSignInDataInStore, setSubmitting)
						}
						containerStyles="bg-secondary mt-7"
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

const styles = StyleSheet.create({
	loadingContainer: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#161622', // Match the app theme
	  opacity: 0.9,
	},
  });