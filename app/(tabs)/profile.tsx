import { router } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Profile = () => {
  const { user, logout } = useUser(); // ✅ inside component

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={{ backgroundColor: "#f15256", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});