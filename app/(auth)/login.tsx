import InputFields from "@/components/auth_components/InputFields";
import { Colors } from "@/constants/theme";
import { validateEmail, validatePassword } from "@/utils/FieldValidations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../hooks/useUser";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { user, login, currentUser } = useUser();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      const [validated_email] = validateEmail(email)
      const [validated_password] = validatePassword(password)
      if (validated_email.valid && validated_password.valid) {
        setLoading(true);
        let successLogin = false;
        if (user === null && email !== "" && password !== "") {
          successLogin = await login(email, password)
        }
        if (successLogin || user !== null) {
          router.replace("/(tabs)/explore");
        } else {
          Alert.alert("Login Faild", "Please check email or password!")
        }
        setLoading(false);
      } else {
        setErrorEmail(validated_email.error)
        setErrorPassword(validated_password.error)
      }
    } catch (error: any) {
      console.log("login errors:", error)
      setLoading(false);
    }

  };
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[Colors.dark.gradient1, Colors.dark.gradient2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 1 }}
      style={[styles.container]}
    >
      <View style={[styles.section, styles.item_center]}>
        <Text style={styles.page_title}>Let’s Get You {"\n"}Sign in!</Text>
      </View>
      <View style={styles.white_section} >
        <View >
          <InputFields
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            error={errorEmail ? true : false}
            errorMessage={errorEmail}
            label="Enter your email address"
            placeholderTextColor={Colors.light.placeholder}
          />

          <InputFields
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            error={errorPassword ? true : false}
            errorMessage={errorPassword}
            placeholderTextColor={Colors.light.placeholder}
            label="Enter your password"
            secureTextEntry
          />
          <Pressable onPress={handleLogin} >
            <LinearGradient
              colors={[Colors.dark.gradient1, Colors.dark.gradient2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button_gradient]}>
              <Text style={[styles.button_gradient_text]}>SIGN IN</Text>
            </LinearGradient>
          </Pressable>
        </View>
        <View style={styles.bottom_section_right}>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")} >
            <Text style={styles.bottom_section_right_text}>Don’t have an account?</Text>
            <Text style={{textAlign:"right",fontWeight:800, fontSize:18, color:Colors.light.tint}}>Sign up</Text>
          </TouchableOpacity>
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
    paddingLeft: 20,
    paddingRight: 20,
  }, item_center: {
    // alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  page_title: {
    fontSize: 60,
    color: "#fffffF",
    fontWeight:200
  },
  white_section: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    flex:1
  },
  button_gradient: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  button_gradient_text: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 500
  },
  bottom_section_right:{
    position:"absolute",
    bottom:50,
    left:0,
    right:0,
    alignItems:"flex-end",
    paddingLeft: 20,
    paddingRight: 30,
  },bottom_section_right_text:{
    fontSize:14,
    textAlign:"right",
  }
});
