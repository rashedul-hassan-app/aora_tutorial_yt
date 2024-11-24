import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TabIcon = ({ icon, color, name, focused, isVectorIcon=false }) => {
	return (
		<View className="items-center justify-center gap-2">
			{isVectorIcon ? (
				<FontAwesome6 name="message" size={24} color={color} />
			) : (
				<Image
					source={icon}
					resizeMode={"contain"}
					tintColor={color}
					className="w-6 h-6"
				/>
			)}
			<Text
				className={`w-full ${focused ? 'font-psemibold' : 'font-pregular'} text-xs }`}
                style={{ color: color }}
            >
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 94,
                        paddingTop: 16
                    }
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								color={color}
								name="Home"
								focused={focused}
							/>
						),
					}}
				/>
                <Tabs.Screen
					name="search"
					options={{
						title: "Search",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.search}
								color={color}
								name="Search"
								focused={focused}
							/>
						),
					}}
				/>
                <Tabs.Screen
					name="messages"
					options={{
						title: "Messages",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								color={color}
								name="Messages"
								focused={focused}
								isVectorIcon={true}
							/>
						),
					}}
				/>
                <Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								name="Profile"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
