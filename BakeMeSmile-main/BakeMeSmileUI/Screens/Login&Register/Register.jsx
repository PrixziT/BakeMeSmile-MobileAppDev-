import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import Toast from "react-native-toast-message";
import styles from "./style";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import ErrorIcon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

function RegisterPage() {
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  function handelSubmit() {
    const userData = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      userType: "User",
    };

    if (!nameVerify || !emailVerify || !mobileVerify || !passwordVerify) {
      Alert.alert("Fill mandatory details");
      Toast.show({
        type: "error",
        text1: "Error!!",
        text2: "Fill mandatory details",
        visibilityTime: 5000,
      });
      return;
    }

    axios
      .post("http://192.168.254.139:5001/register", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          Alert.alert("Registered Successful!");
          navigation.navigate("Login");
        } else {
          Alert.alert(JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error occurred while registering.");
      });
  }

  function handleName(text) {
    setName(text);
    setNameVerify(text.length > 1);
  }

  function handleEmail(text) {
    setEmail(text);
    setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(text));
  }

  function handleMobile(text) {
    setMobile(text);
    setMobileVerify(/[6-9]{1}[0-9]{9}/.test(text));
  }

  function handlePassword(text) {
    setPassword(text);
    setPasswordVerify(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(text));
  }

  return (
    <LinearGradient colors={["#ffde59", "#ff914d"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#000000"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                onChangeText={handleName}
              />
              {name.length > 0 &&
                (nameVerify ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : (
                  <ErrorIcon name="error" color="red" size={20} />
                ))}
            </View>
            {name.length > 0 && !nameVerify && (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Name should be more than 1 characters.
              </Text>
            )}

            <View style={styles.action}>
              <Fontisto
                name="email"
                color="#000000"
                size={24}
                style={{ marginLeft: 0, paddingRight: 5 }}
              />
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChangeText={handleEmail}
              />
              {email.length > 0 &&
                (emailVerify ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : (
                  <ErrorIcon name="error" color="red" size={20} />
                ))}
            </View>
            {email.length > 0 && !emailVerify && (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Enter Valid Email Address
              </Text>
            )}

            <View style={styles.action}>
              <FontAwesome
                name="mobile"
                color="#000000"
                size={35}
                style={{ paddingRight: 10, marginTop: -7, marginLeft: 5 }}
              />
              <TextInput
                placeholder="Mobile"
                style={styles.textInput}
                onChangeText={handleMobile}
                maxLength={10}
              />
              {mobile.length > 0 &&
                (mobileVerify ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : (
                  <ErrorIcon name="error" color="red" size={20} />
                ))}
            </View>
            {mobile.length > 0 && !mobileVerify && (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Phone number with 6-9 and remaining 9 digits with 0-9
              </Text>
            )}

            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#000000"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChangeText={handlePassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {password.length > 0 &&
                  (!showPassword ? (
                    <Feather
                      name="eye-off"
                      style={{ marginRight: -10 }}
                      color={passwordVerify ? "green" : "red"}
                      size={23}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      style={{ marginRight: -10 }}
                      color={passwordVerify ? "green" : "red"}
                      size={23}
                    />
                  ))}
              </TouchableOpacity>
            </View>
            {password.length > 0 && !passwordVerify && (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and 6 or more characters.
              </Text>
            )}
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.inBut}
              onPress={() => handelSubmit()}
            >
              <View>
                <Text style={styles.textSign}>SIGN UP</Text>
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
              <View style={{ alignItems: "center", justifyContent: "center" }}>
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
              <View style={{ alignItems: "center", justifyContent: "center" }}>
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
              <View style={{ alignItems: "center", justifyContent: "center" }}>
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
        </View>
        <TouchableOpacity
          style={styles.inBut3}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.bottomText}>Already Have An Account? </Text>
            <Text style={styles.bottomText1}>Login</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
export default RegisterPage;
