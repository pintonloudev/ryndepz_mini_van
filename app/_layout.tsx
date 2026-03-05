import { Stack } from 'expo-router';

import { StatusBar } from "react-native";

import { UserProvider } from "@/contexts/UserContext";


export default function RootLayout() {
  return (
    <>
      <UserProvider>
        <StatusBar hidden={true} />
        <Stack  screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </>
  );
}
