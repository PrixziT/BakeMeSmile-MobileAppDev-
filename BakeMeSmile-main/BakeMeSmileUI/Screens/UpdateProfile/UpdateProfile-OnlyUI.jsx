import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  Image,
} from "react-native";
import { Avatar } from "react-native-paper";
import styles from "./stylesProfileEdit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Back from "react-native-vector-icons/Ionicons";

import { RadioButton } from "react-native-paper";
import Toast from "react-native-toast-message";

function UpdateProfile() {
  return (
    <ScrollView
      keyboardShouldPersistTaps={"always"}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Back
              name="arrow-back"
              size={30}
              style={styles.backIcon}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.nameText}>Edit Profile</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={styles.camDiv}>
          <View style={styles.camIconDiv}>
            <Back name="camera" size={22} style={styles.cameraIcon} />
          </View>

          <TouchableOpacity>
            <Avatar.Image
              size={140}
              style={styles.avatar}
              source={{
                uri: "https://pm1.aminoapps.com/7821/709b1b94e5384a9bcc87c7207fb4d521d54d4492r1-1080-1349v2_hq.jpg",
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 50,
            marginHorizontal: 22,
          }}
        >
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Username</Text>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor={"#999797"}
              style={styles.infoEditSecond_text}
              value={this.state.username}
              onChange={(e) => this.handleName(e)}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Email</Text>
            <TextInput
              editable={false}
              placeholder="Your Email"
              placeholderTextColor={"#999797"}
              style={styles.infoEditSecond_text}
              value={this.state.uemail}
              onChange={(e) => this.handleEmail(e)}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Gender</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Male</Text>
                <RadioButton
                  value="Male"
                  status={
                    this.state.gender === "Male" ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    this.setState(
                      {
                        gender: "Male",
                      },
                      console.log(this.state.gender, "gen")
                    )
                  }
                />
              </View>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Female</Text>
                <RadioButton
                  value="Female"
                  status={
                    this.state.gender === "Female" ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    this.setState(
                      {
                        gender: "Female",
                      },
                      console.log(this.state.gender, "gen")
                    )
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Address</Text>
            <TextInput
              placeholder="Address"
              placeholderTextColor={"#999797"}
              keyboardType="numeric"
              maxLength={10}
              style={styles.infoEditSecond_text}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Mobile No</Text>
            <TextInput
              placeholder="Your Mobile No"
              placeholderTextColor={"#999797"}
              keyboardType="numeric"
              maxLength={10}
              style={styles.infoEditSecond_text}
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={this.updateProfile} style={styles.inBut}>
            <View>
              <Text style={styles.textSign}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default UpdateProfile;
