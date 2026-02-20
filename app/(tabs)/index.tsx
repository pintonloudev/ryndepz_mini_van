import { account } from "@/lib/appwrite";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/explore" />;
  }

  return <Redirect href="/(auth)/login" />;
}