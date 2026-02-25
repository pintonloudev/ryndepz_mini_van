import { account } from "@/lib/appwrite";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import Buttons from "@/components/auth_components/Buttons";
// import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "@/constants/theme";



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

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/explore" />;
  } else {

    return (
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.dark.gradient1, Colors.dark.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 1 }}
        style={[styles.container]}
      >
        <View style={[styles.section, styles.page_title]}>
          <View><Image source={require("../../assets/images/logo.png")} style={styles.logo} /></View>
        </View>
        <View style={[styles.section, styles.buttons_section,]}>
          <View>
            <Text style={[styles.title]}>Transform Your Ride</Text>
          </View>
          <View>
            <Buttons type="Transparent" onPress={() => router.push("/(auth)/login")} buttonText="SIGN IN"></Buttons>
          </View>
          <View>
            <Buttons type="White" onPress={() => router.push("/(auth)/register")} buttonText="SIGN UP"></Buttons>
          </View>
        </View>
        <View style={[styles.section, styles.login_with_social,]}>
          <Text style={styles.login_with_text}>Continue with Your Social Account</Text>
          <View style={[styles.login_with_social_icons]}>
            <FontAwesome6 name="facebook" size={24} color={Colors.dark.text} />
            <FontAwesome6 name="square-instagram" size={24} color={Colors.dark.text} />
            <FontAwesome6 name="google-plus" size={24} color={Colors.dark.text} />
          </View>
        </View>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // covers whole screen
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  container: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 0,
  },
  section: {
    paddingLeft: 10,
    paddingRight: 10,
    // borderStyle: "solid",
    // borderColor: "#000",
    // borderWidth: 1
  },
  logo: {
    width: 200,
    height: 200,
  },
  page_title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  },
  title_text: {
    fontSize: 40,
    color: Colors.dark.text
  },
  iconStyle: {
    color: Colors.dark.text,
    fontSize: 70
  },
  buttons_section: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  title: {
    fontSize: 45,
    color: Colors.dark.text,
    paddingBottom: 20,
    fontWeight: 100
  },
  login_with_social: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_with_text: {
    color: Colors.dark.text,
    paddingBottom: 20
  },
  login_with_social_icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  }
})