import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	Alert,
	Image,
	TouchableOpacity,
} from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import CustomButton from "../../components/ui/CustomButton";
import FormField from "../../components/FormField";
import { MultiSelectComponent } from "../../components/ui/Dropdown";
import CustomRadioButton from "../../components/ui/CustomRadioButton";
import CloseButton from "../../components/ui/CloseButton";

const SignUp = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		userType: "student", // Default selected option
		languages: [], // Preferred languages (multi-select)
	});

	const handleUserTypeChange = (type) => {
		setForm({ ...form, userType: type });
	};

	const handleLanguageChange = (selected) => {
		setForm({ ...form, languages: selected });
	};

	const submit = async () => {
		if (
			!form.username ||
			!form.email ||
			!form.password ||
			form.languages.length === 0
		) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setSubmitting(true);
		try {
			const result = await createUser(
				form.email,
				form.password,
				form.username
			);
			setUser(result);
			setIsLogged(true);

			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setSubmitting(false);
		}
	};

	console.log("-- form --");
	console.log(form);

	return (
		<SafeAreaView className="bg-primary h-full px-2">
			<ScrollView>
					<CloseButton containerStyles={'absolute right-4 top-4'} handlePress={() => router.replace("/")} />
				<View
					className="w-full flex justify-center h-full px-4 my-6"
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
						Let's create an account
					</Text>

					{/* Email and Password Fields */}
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) =>
							setForm({ ...form, password: e })
						}
						otherStyles="mt-7"
					/>

					{/* Language Dropdown Group */}
					<View>
						<Text className="text-white mt-10">
							Spoken Languages:
						</Text>
						<MultiSelectComponent
							selectedLanguages={form.languages}
							onLanguageChange={handleLanguageChange}
						/>
					</View>
					{/* Radio Button Group */}
					<View className="my-5 space-y-5">
						<Text className="text-white mb-5">Sign up as a</Text>
						<View className="items-center">
							<CustomRadioButton
								selectedOption={form.userType}
								options={["student", "tutor"]}
								onOptionChange={handleUserTypeChange}
							/>
						</View>
					</View>

					<CustomButton
						title="Sign Up"
						handlePress={submit}
						containerStyles="mt-7 bg-white"
						isLoading={isSubmitting}
					/>

					<View className="flex justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
