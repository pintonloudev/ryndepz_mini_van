import InputFields from "@/components/auth_components/InputFields";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";


export default function RegisterScreen() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [errorEmptyField, setErrorEmptyField] = useState("This field must not be empty");
  const [errorEmptyFname, setErrorEmptyFname] = useState(false);
  const [errorEmptyLname, setErrorEmptyLname] = useState(false);
  const [errorEmptyPhone, setErrorEmptyPhone] = useState(false);
  const [errorEmptyAddress, setErrorEmptyAddress] = useState(false);
  const [form_submitted, setForm_submitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, register, add_user_profile } = useUser();

  const router = useRouter();
  const handleRegister = async () => {
    try {
      setForm_submitted(true)
      const complete = validateEmptyField()
      if (complete) {
        setLoading(true);
        if (await register(email, password, fname + " " + lname)) {
          await add_user_profile(fname, lname, address, phonenumber, email)
          router.replace("/(tabs)/explore");
        } else {
          Alert.alert("Registration faild!", "User already exist.")
        }
        setLoading(false);
      }
    } catch (error: any) {
    }
  };

  useEffect(() => {
    if (form_submitted) {
      validateEmptyField()
    } else {
      if (email) {
        validateEmail(email)
      } if (password) {
        validatePassword(password)
      } if (repassword) {
        validateRePassword(repassword)
      }
    }
  }, [fname, lname, address, phonenumber, email, password, repassword]);

  const validateEmptyField = () => {
    var complete = true;
    setErrorEmptyFname(false)
    setErrorEmptyLname(false)
    setErrorEmptyPhone(false)
    setErrorEmptyAddress(false)
    if (fname == "" || fname == null) {
      setErrorEmptyFname(true)
      complete = false;
    }
    if (lname == "" || lname == null) {
      setErrorEmptyLname(true)
      complete = false;
    }
    if (phonenumber == "" || phonenumber == null) {
      setErrorEmptyPhone(true)
      complete = false;
    }
    if (address == "" || address == null) {
      setErrorEmptyAddress(true)
      complete = false;
    }
    if (!validateEmail(email)) {
      complete = false;
    }
    if (!validatePassword(password)) {
      complete = false;
    }
    if (!validateRePassword(repassword)) {
      complete = false;
    }
    return complete;
  }

  const validateEmail = (text: string) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(text)) {
      setErrorEmail("Please enter a valid email address");
      return false;
    } else {
      setErrorEmail("");
      return true
    }
  };

  const validatePassword = (text: string) => {
    console.log(errorPassword)
    if (text.length < 8) {
      setErrorPassword("Password must be 8 characters or more");
      return false
    } else {
      setErrorPassword("");
      return true
    }
  };


  const validateRePassword = (text: string) => {
    if (text !== password) {
      setErrorRePassword("This field must much to the password you set above");
      return false;
    } else {
      setErrorRePassword("");
      return true
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
        <Text style={styles.page_title}>Join Us {"\n"}Today!</Text>
      </View>
      <View style={styles.white_section} >
        <View >
          <ScrollView style={{ height: "85%" }} bounces
            showsVerticalScrollIndicator={false}>
            <InputFields
              placeholder="First Name"
              value={fname}
              onChangeText={setFname}
              error={errorEmptyFname}
              errorMessage={errorEmptyField}
              label="First Name"
              placeholderTextColor={Colors.light.placeholder}
            />
            <InputFields
              placeholder="Last Name"
              value={lname}
              onChangeText={setLname}
              error={errorEmptyLname}
              errorMessage={errorEmptyField}
              label="Last Name"
              placeholderTextColor={Colors.light.placeholder}
            />
            <InputFields
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              error={errorEmptyAddress}
              errorMessage={errorEmptyField}
              label="Address"
              placeholderTextColor={Colors.light.placeholder}
            />
            <InputFields
              placeholder="Phone Number"
              value={phonenumber}
              onChangeText={setPhonenumber}
              error={errorEmptyPhone}
              errorMessage={errorEmptyField}
              label="Phone Number"
              placeholderTextColor={Colors.light.placeholder}
            />
            <InputFields
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              error={errorEmail ? true : false}
              errorMessage={errorEmail}
              label="Email Address"
              placeholderTextColor={Colors.light.placeholder}
            />
            <InputFields
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              error={errorPassword ? true : false}
              errorMessage={errorPassword}
              label="Password"
              placeholderTextColor={Colors.light.placeholder}
              secureTextEntry
            />

            <InputFields
              placeholder="Confirm Password"
              value={repassword}
              onChangeText={setRepassword}
              error={errorRePassword ? true : false}
              errorMessage={errorRePassword}
              label="Confirm Password"
              placeholderTextColor={Colors.light.placeholder}
              secureTextEntry
            />
            <Pressable onPress={handleRegister} >
              <LinearGradient
                colors={[Colors.dark.gradient1, Colors.dark.gradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button_gradient]}>
                <Text style={[styles.button_gradient_text]}>SIGN UP</Text>
              </LinearGradient>
            </Pressable>
          </ScrollView>
        </View>
        <View style={styles.bottom_section_right}>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")} >
            <Text style={styles.bottom_section_right_text}>Alredy have an account?</Text>
            <Text style={{ textAlign: "right", fontWeight: 800, fontSize: 18, color: Colors.light.tint }}>Sign in</Text>
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
    fontWeight: 200
  },
  white_section: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1
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
  bottom_section_right: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "flex-end",
    paddingLeft: 20,
    paddingRight: 30,
  }, bottom_section_right_text: {
    fontSize: 14,
    textAlign: "right",
  }
});
