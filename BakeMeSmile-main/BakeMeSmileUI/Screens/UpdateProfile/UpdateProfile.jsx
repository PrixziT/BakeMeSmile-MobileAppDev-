import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import styles from './stylesProfileEdit';
import Back from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation hook
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';

function UpdateProfile() {
  const navigation = useNavigation(); // Initialize navigation hook
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [mobile, setMobile] = useState('');
  const route = useRoute();
  const selectPhoto = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      console.log(image);
      const data = `data:${image.mime};base64,${image.data}`;
      setImage(data);
    });
  };

  useEffect(() => {
    const userData = route.params.data;
    setEmail(userData.email);
    setGender(userData.gender);
    setImage(userData.image);
    setProfession(userData.profession);
    setName(userData.name);
    setMobile(userData.mobile)
  }, []);

  const updateProfile = () => { 
    const formdata = {
      name: name,
      image,
      email,
      profession,
      mobile,
      gender
    };
    console.log(formdata);
    axios.post('http://192.168.254.139:5001/update-user', formdata)
      .then(res => {
        console.log(res.data)
        if (res.data.status == "Ok") {
          Toast.show({
            type: 'success',
            text1: 'Updated',
          })
        }
      });
  };
  return (
    <LinearGradient colors={["#ffde59", "#ff914d"]} style={{ flex: 1 }}>
    <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1 }}>
            <Back name="arrow-back" size={30} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 3 }}>
            <Text style={styles.nameText}>Edit Profile</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={styles.camDiv}>
          <View style={styles.camIconDiv}>
            <Back name="camera" size={22} style={styles.cameraIcon} />
          </View>

          <TouchableOpacity onPress={() => selectPhoto()}>
            <Avatar.Image
              size={140}
              style={styles.avatar}
              source={{
                uri:
                 image==""|| image==null
                    ? 'https://pm1.aminoapps.com/7821/709b1b94e5384a9bcc87c7207fb4d521d54d4492r1-1080-1349v2_hq.jpg'
                    : image,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 50,
            marginHorizontal: 22,
          }}>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Username</Text>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChange={e => setName(e.nativeEvent.text)}
              defaultValue={name}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Email</Text>
            <TextInput
              editable={false}
              placeholder="Your Email"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChange={e => setEmail(e.nativeEvent.text)}
              defaultValue={email}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Gender</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Male</Text>
                <RadioButton
                  value="Male"
                  status={gender === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('Male');
                  }}
                />
              </View>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Female</Text>
                <RadioButton
                  value="Female"
                  status={gender === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('Female');
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Address</Text>
            <TextInput
              placeholder="Address"
              placeholderTextColor={'#999797'}
              maxLength={30}
              style={styles.infoEditSecond_text}
              onChange={e => setProfession(e.nativeEvent.text)}
              defaultValue={profession}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Mobile No</Text>
            <TextInput
              placeholder="Your Mobile No"
              placeholderTextColor={'#999797'}
              keyboardType="numeric"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChange={e => setMobile(e.nativeEvent.text)}
              defaultValue={mobile}
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => updateProfile()}
            style={styles.inBut}>
            <View>
              <Text style={styles.textSign}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </LinearGradient>
  );
}

export default UpdateProfile;
