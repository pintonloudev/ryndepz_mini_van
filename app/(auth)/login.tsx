import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../../hooks/useUser";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const {user, login, currentUser} = useUser();
  
  const handleLogin = async () => {
    try{
      if(validateFields()){
        let successLogin = false;
        if(user == null && email != "" && password != ""){
          successLogin = await login(email,password)
        }
        if(successLogin || user!= null ){
          router.replace("/(tabs)/explore");
        }else{
          Alert.alert("Login Faild","Please double check email or password!")
        }
      }

    }catch(error:any){
      console.log("login errors:",error)
    }
    
  };

  const validateFields=()=>{
    var complete = true;
    complete = validateEmail(email)
    complete = validatePassword(password)
    return complete
  }

  const validateEmail = (text:string) => {
    setEmail(text);

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(text)) {
      setErrorEmail("Please enter a valid email address");
      return false
    } else {
      setErrorEmail("");
      return true
    }
  };
  
  const validatePassword = (text:string) => {
    setPassword(text);
    if (text.length < 8) {
      setErrorPassword("Password must be 8 characters or more");
      return false
    } else {
      setErrorPassword("");
      return true
    }
  };

  return (
    <View style={styles.mainContainer}>
        <ImageBackground
                source={require("../../assets/images/section-background-2.jpg")}
                imageStyle={styles.formBackground}
                resizeMode="cover"
            >
          <ScrollView style={{ height:"100%"}}bounces
  showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
            <Image
                source={require("../../assets/images/reyndepz-logo.png")}
                style={styles.logo}
            />
        </View>
            <View style={styles.formSection}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    placeholder="Email address"
                    style={[styles.input, errorEmail ? styles.inputError : styles.marginBot]}
                    value={email}
                    onChangeText={validateEmail}
                    autoCapitalize="none"
                />
                {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
                <TextInput
                    placeholder="Password"
                    style={[styles.input, errorPassword ? styles.inputError : styles.marginBot]}
                    value={password}
                    onChangeText={validatePassword}
                    secureTextEntry
                />
                {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
                

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.createAccountSection}>
                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                    <Text style={styles.link}>Create an account</Text>
                    <Text style={styles.createaccountdescription}>Create an account to track your orders, 
                        save items to your wishlist, and enjoy a faster, secure checkout experience.</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topSection:{
    height:"50%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop:200
  },
  logo: {
    width: 200,
    height: 200,
  },
  formSection:{
    paddingBottom:30,
    padding: 24,
    overflow: "hidden",
    height:"40%"
  },
  formBackground: {
    position: "absolute", top: 0
  },
  title: {
    fontSize: 50,
    fontWeight: "100",
    marginBottom: 24,
    textAlign: "center",
    color:"#fff"

  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    color: "#fff",
    marginBottom: 5
  },
  button: {
    backgroundColor: "#04689a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop:20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 40,
    color: "#04689a",
    fontSize:18
  },
  createAccountSection:{
    height:"10%",
    alignItems: "center",
  },
  createaccountdescription:{
    color:"#8a8a8aff",
    marginTop:10,
    paddingLeft: 24,
    paddingRight:24
  },
  errorText:{
    color:"rgb(223, 88, 88)",
    marginBottom: 20,
  },
  inputError:{
    borderColor: "rgb(223, 88, 88)",
  },
  marginBot:{
    marginBottom: 20
  }
});
