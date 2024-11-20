import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from "react-native";

import { icons } from "../../constants";
// import useAppwrite from "../../lib/useAppwrite";
// import { getUserPosts, signOut } from "../../lib/appwrite";
// import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

import { images } from "../../constants";

import useAuthStore from "../../store/authStore";

const Profile = () => {
  // const { user, setUser, setIsLogged } = useGlobalContext();
  // const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const handleSignOut = async () => {
    console.log('Triggered log out func');
    const signOutFn = useAuthStore.getState().signOut; // Use getState() to ensure proper retrieval
    console.log("Retrieved signOutFn:", signOutFn);

    try {
        await signOutFn(); // Await the async `signOut` function
        router.replace("/sign-in");
    } catch (error) {
        console.error("Error during logout:", error);
        Alert.alert("Error", "Something went wrong while logging out.");
    }
};


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={posts}
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={handleSignOut}
              className="flex w-full items-end mb-10"
            >
              <Text className="text-white">Signout</Text>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                // source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              // title={user?.username}
              title={"some title"}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                // title={posts.length || 0}
                title={"title here"}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;