const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity, 
  ScrollView,
  Alert,
} = require("react-native");
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { log } from "react-native-reanimated";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

function LoginPage({ props }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };

    axios
      .post("http://192.168.254.139:5001/login-user", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Logged In Successful");
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("userType", res.data.userType);
          navigation.navigate('Home'); 
          if (res.data.userType == "Admin") {
            navigation.navigate("AdminScreen");
          } else {
            navigation.navigate("Home");
          } 
        }
      });
  }
  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");

    console.log(data, "at app.jsx");
  }
  useEffect(() => {
    getData();
    console.log("Hii");
  }, []);

  return (
    <LinearGradient colors={["#ffde59", "#ff914d"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={"always"}
      >
        <View style={{ backgroundColor: "transparent" }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.action}>
              <FontAwesome
                name="user"
                color="#000000"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#000000"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChange={(e) => setPassword(e.nativeEvent.text)}
              />
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: 8,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontWeight: "500",
                  marginTop: 25,
                  marginBottom: 5,
                }}
              >
                FORGOT PASSWORD?
              </Text>
            </View>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.inBut}
              onPress={() => handleSubmit()}
            >
              <View>
                <Text style={styles.textSign}>LOGIN</Text>
              </View>
            </TouchableOpacity>

            <View style={{ padding: 15 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#000000" }}
              >
                or via Social Media
              </Text>
            </View>
            <View style={styles.bottomButton}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.inBut2}
                  onPress={() => alert("Coming Soon")}
                >
                  <FontAwesome
                    name="facebook-f"
                    color="white"
                    style={[styles.smallIcon2, { fontSize: 20 }]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.inBut2}
                  onPress={() => alert("Coming Soon")}
                >
                  <FontAwesome
                    name="google"
                    color="white"
                    style={[styles.smallIcon2, { fontSize: 20 }]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.inBut2}
                  onPress={() => alert("Coming Soon")}
                >
                  <FontAwesome
                    name="apple"
                    color="white"
                    style={[styles.smallIcon2, { fontSize: 20 }]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.inBut3}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.bottomText}>
                Don't Have An Account?
              </Text>
              <Text style={styles.bottomText1}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
export default LoginPage;
