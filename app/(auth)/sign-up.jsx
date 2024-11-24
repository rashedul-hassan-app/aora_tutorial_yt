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
import CustomButton from "../../components/ui/CustomButton";
import FormField from "../../components/FormField";
import { MultiSelectComponent } from "../../components/ui/Dropdown";
import CustomRadioButton from "../../components/ui/CustomRadioButton";
import CloseButton from "../../components/ui/CloseButton";
import { handleSignUp } from "../../services/auth";
import { useAuthStore } from "../../store/authStore";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInUp,
	FadeOut,
	Easing,
	useSharedValue,
} from "react-native-reanimated";

const SignUp = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
		role: "student",
		sex: "male",
		languages: [], // Preferred languages (multi-select)
	});

	const handleUserTypeChange = (type) => {
		setForm({ ...form, role: type });
	};

	const handleSexChange = (type) => {
		setForm({ ...form, sex: type });
	};

	const handleLanguageChange = (selected) => {
		setForm({ ...form, languages: selected });
	};

	const saveSignInDataInStore = useAuthStore(
		(state) => state.SaveSignInDataInStore
	);

	console.log("-- form --");
	console.log(form);

	return (
		<SafeAreaView className="bg-primary h-full px-2">
			<ScrollView>
				<CloseButton
					containerStyles={"absolute right-4 top-4"}
					handlePress={() => router.replace("/")}
				/>
				<View
					className="w-full flex justify-center h-full px-4 my-6"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>
					<Animated.Image
						entering={FadeIn.delay(100)
							.duration(1000)
							.easing(Easing.in(Easing.quad))}
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[34px]"
					/>

					<Animated.Text
						entering={FadeIn.delay(300)
							.duration(600)
							.easing(Easing.in(Easing.quad))}
						className="text-2xl font-semibold text-white mt-10 font-psemibold"
					>
						Let's create an account
					</Animated.Text>

					{/* Email and Password Fields */}
					<Animated.View
						className="w-full"
						entering={FadeInUp.delay(800)
							.duration(600)
							.easing(Easing.in(Easing.quad))
							.damping(2)}
					>
						<FormField
							title="Email"
							value={form.email}
							handleChangeText={(e) =>
								setForm({ ...form, email: e })
							}
							otherStyles="mt-7"
							keyboardType="email-address"
						/>
					</Animated.View>

					<Animated.View
						className="w-full"
						entering={FadeInUp.delay(1000)
							.duration(600)
							.easing(Easing.in(Easing.quad))
							.damping(2)}
					>
						<FormField
							title="Password"
							value={form.password}
							handleChangeText={(e) =>
								setForm({ ...form, password: e })
							}
							otherStyles="mt-7"
						/>
					</Animated.View>
					{/* Language Dropdown Group */}
					<Animated.View
						entering={FadeInUp.delay(1200)
							.duration(600)
							.easing(Easing.in(Easing.quad))
							.damping(2)}
					>
						<Animated.Text
							// entering={FadeIn.delay(1000)
							// 	.duration(600)
							// 	.easing(Easing.in(Easing.quad)).damping(2)}
							className="text-white mt-10"
						>
							Spoken Languages:
						</Animated.Text>
						<MultiSelectComponent
							selectedLanguages={form.languages}
							onLanguageChange={handleLanguageChange}
						/>
					</Animated.View>
					{/* Radio Button Group */}
					<View className="my-5 space-y-5">
						<Animated.Text
							entering={FadeInUp.delay(1500)
								.duration(600)
								.easing(Easing.in(Easing.quad))
								.damping(2)}
							className="text-white mb-5"
						>
							Sign up as a
						</Animated.Text>
						<Animated.View
							entering={FadeInUp.delay(1600)
								.duration(600)
								.easing(Easing.in(Easing.quad))
								.damping(2)}
							className="items-center"
						>
							<CustomRadioButton
								selectedOption={form.role}
								options={["student", "tutor"]}
								onOptionChange={handleUserTypeChange}
							/>
						</Animated.View>
					</View>

					{/* Radio Button Group */}
					<View className="my-5 space-y-5">
						<Animated.Text
							entering={FadeInUp.delay(1500)
								.duration(600)
								.easing(Easing.in(Easing.quad))
								.damping(2)}
							className="text-white mb-5"
						>
							Gender
						</Animated.Text>
						<Animated.View
							entering={FadeInUp.delay(1600)
								.duration(600)
								.easing(Easing.in(Easing.quad))
								.damping(2)}
							className="items-center"
						>
							<CustomRadioButton
								selectedOption={form.sex}
								options={["male", "female"]}
								onOptionChange={handleSexChange}
							/>
						</Animated.View>
					</View>

					<Animated.View
						entering={FadeInUp.delay(1800)
							.duration(600)
							.easing(Easing.in(Easing.quad))
							.damping(2)}
					>
						<CustomButton
							title="Sign Up"
							handlePress={() =>
								handleSignUp(
									form,
									setSubmitting,
									saveSignInDataInStore
								)
							}
							containerStyles="mt-7 bg-white"
							isLoading={isSubmitting}
						/>
					</Animated.View>
					<Animated.View
						entering={FadeInUp.delay(2000)
							.duration(600)
							.easing(Easing.in(Easing.quad))
							.damping(2)}
						className="flex justify-center pt-5 flex-row gap-2"
					>
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Sign In
						</Link>
					</Animated.View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
