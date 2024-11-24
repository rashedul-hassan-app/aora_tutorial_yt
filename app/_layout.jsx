import { StyleSheet, Text } from 'react-native'
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
// Import your global CSS file
import "../global.css";
import { useEffect } from 'react';
import { createTamagui,TamaguiProvider, View } from 'tamagui'
import defaultConfig from '@tamagui/config/v3'

const config = createTamagui(defaultConfig)
// prevent autohiding splash before asset loading
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    // if fonts loaded hide splash screen
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="profile" options={{headerShown: false}} />
      </Stack>
    </TamaguiProvider>
  );
}

export default RootLayout