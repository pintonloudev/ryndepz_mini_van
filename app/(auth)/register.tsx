import { useUser } from "@/hooks/useUser";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


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
  const [errorComplete, setComplete] = useState(false);

  const {user, register, add_user_profile} = useUser();

  const router = useRouter();
  const handleRegister = async () => {
    try{ 
       const complete=validateEmptyField()
      if(complete){
        console.log("complete:",complete);
        await register(email, password,fname+" "+lname)
        await add_user_profile(fname, lname,address,phonenumber,email)

        router.replace("/(tabs)/explore");
      }
    }catch(error:any){
    }
  };
  
  
  const validateEmptyField = () => {
      var complete = true;
      setErrorEmptyFname(false)
      setErrorEmptyLname(false)
      setErrorEmptyPhone(false)
      setErrorEmptyAddress(false)
      if(fname == "" || fname == null){
        setErrorEmptyFname(true)
        complete = false;
      }
      if(lname == "" || lname == null){
        setErrorEmptyLname(true)
        complete = false;
      }
      if(phonenumber == "" || phonenumber == null){
        setErrorEmptyPhone(true)
        complete = false;
      }
      if(address == "" || address == null){
        setErrorEmptyAddress(true)
        complete = false;
      }
      if(!validateEmail(email)){
        complete = false;
      }
      if(!validatePassword(password)){
        complete = false;
      }
      if(!validateRePassword(repassword)){
        complete = false;
      }
      return complete;
  }
  
  const validateEmail = (text:string) => {
    setEmail(text);
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
  
  
  const validateRePassword = (text:string) => {
    setRepassword(text);
    if (text != password) {
      setErrorRePassword("This field must much to the password you set above");
      return false;
    } else {
      setErrorRePassword("");
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
                <Text style={styles.title}>Create an account</Text>
                    <Text style={styles.createaccountdescription}>Create an account to track your orders, 
                        save items to your wishlist, and enjoy a faster, secure checkout experience.</Text>
                <TextInput
                    placeholder="First name"
                    style={[styles.input, errorEmptyFname?styles.inputError:styles.marginBot]}
                    value={fname}
                    onChangeText={setFname}
                />
                {errorEmptyFname ? <Text style={styles.errorText}>{errorEmptyField}</Text> : null}

                <TextInput
                    placeholder="Last Name"
                    style={[styles.input, errorEmptyLname?styles.inputError:styles.marginBot]}
                    value={lname}
                    onChangeText={setLname}
                />
                {errorEmptyLname ? <Text style={styles.errorText}>{errorEmptyField}</Text> : null}
                <TextInput
                    placeholder="Address"
                    style={[styles.input, errorEmptyAddress?styles.inputError:styles.marginBot]}
                    value={address}
                    onChangeText={setAddress}
                />
                {errorEmptyAddress ? <Text style={styles.errorText}>{errorEmptyField}</Text> : null}

                <TextInput
                    placeholder="Phone Number"
                    style={[styles.input, errorEmptyPhone?styles.inputError:styles.marginBot]}
                    value={phonenumber}
                    onChangeText={setPhonenumber}
                />
                {errorEmptyPhone ? <Text style={styles.errorText}>{errorEmptyField}</Text> : null}

                <TextInput
                    placeholder="Email Address"
                    style={[styles.input, errorEmail?styles.inputError:styles.marginBot]}
                    value={email}
                    onChangeText={validateEmail}
                />
                {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
                <TextInput
                    placeholder="Password"
                    style={[styles.input, errorPassword?styles.inputError:styles.marginBot]}
                    value={password}
                    onChangeText={validatePassword}
                    secureTextEntry
                />
                {errorEmail ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
                <TextInput
                    placeholder="Confirm Password"
                    style={[styles.input, errorRePassword?styles.inputError:styles.marginBot]}
                    value={repassword}
                    onChangeText={validateRePassword}
                    secureTextEntry
                />
                {errorEmail ? <Text style={styles.errorText}>{errorRePassword}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.createAccountSection}>
                <TouchableOpacity style={styles.backbtn} onPress={() => router.push("/(auth)/login")}>
                    <Text style={styles.link}><FontAwesome6 style={styles.iconStyle} name="arrow-left-long" iconStyle="solid" /> Login to your account</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop:100
  },
  logo: {
    width: 200,
    height: 200,
  },
  formSection:{
    paddingBottom:30,
    padding: 24,
    overflow: "hidden",
    paddingTop:60
  },
  formBackground: {
    position: "absolute", top: 0,
    // opacity:0.9
  },
  title: {
    fontSize: 50,
    fontWeight: "100",
    textAlign: "center",
    color:"#fff"

  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    marginBottom: 5,
    color: "#fff",
  },
  button: {
    backgroundColor: "#04689a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 40,
    color: "#04689a",
    fontSize:18,
    // textDecorationLine:"underline"
  },
  createAccountSection:{
    alignItems: "center",
    paddingBottom:50
    
  },
  createaccountdescription:{
    color:"#8a8a8aff",
    marginTop:10,
    paddingLeft: 24,
    paddingRight:24,
    marginBottom: 24,
    alignItems:"center",
    textAlign:"center",
    fontWeight:"100"
  },
  errorText:{
    color:"rgb(223, 88, 88)",
    marginBottom: 20,
  },
  inputError:{
    borderColor: "rgb(223, 88, 88)",
  },backbtn:{

  },
  marginBot:{
    marginBottom: 20
  },iconStyle:{
    color:"#04689a",
    fontSize:20
  }

});
