import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

function Contact() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    Alert.alert(
      "Message Sent!",
      "Thank you for reaching out.",
      [{ text: "OK" }]
    );

  //Clear text boxes
  setFullName('');
  setContactNumber('');
  setEmail('');
  setMessage('');
  };

  return (
    <LinearGradient colors={["#ffde59", "#ff914d"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.drawerIcon}
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <Text style={styles.drawerText}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>CONTACT</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View>
            <Text style={styles.titleText}>GET IN TOUCH</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={text => setFullName(text)} />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={contactNumber}
              onChangeText={text => setContactNumber(text)}
              keyboardType="phone-pad" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address" />
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Message"
              value={message}
              onChangeText={text => setMessage(text)}
              multiline={true}
              numberOfLines={4} />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  drawerIcon: {
    position: "absolute",
    zIndex: 2,
    left: 30,
    top: 24,
  },
  drawerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
  },
  titleText:{
    alignSelf: "center",
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  input: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    textAlignVertical: 'bottom',
    textAlign: 'left',
  },
  messageInput: {
    height: 200,
    textAlignVertical: 'center',
  },
  button: {
    borderRadius: 30,
    backgroundColor: 'black',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 110,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

});

export default Contact;