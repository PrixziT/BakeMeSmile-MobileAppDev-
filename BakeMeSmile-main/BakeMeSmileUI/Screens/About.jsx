import React from "react";      
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

function About() {
  const navigation = useNavigation();
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
          <View>
            <Text style={styles.headerText}>ABOUT</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.centeredContent}>
            <Image
              source={require("../assets/brand.png")}
              style={styles.imageContainer}
            />
            <Text style={styles.headerSentence}>COMPANY HISTORY</Text>
            <View style={styles.textContainer}>
              <Text style={styles.centeredText}>
                Bake Me Smile's is an American-style bakery founded in 2022 to bring
                the authentic taste of American home to the Philippines. Today,
                the bakery has become a highly celebrated and iconic brand, 
                helping to create moments of joy on every occasion. One of the
                key factors in Bake Me Smile's success has been its ethos that 
                cakes taste best when they've been freshly baked using exactly
                the same ingredients and techniques as those used in home 
                baking.
              </Text>
            </View>

            <Text style={styles.ourTeam}>OUR TEAM</Text>

            <View style={styles.teamContainer}>
              <View style={styles.column}>
                <View style={styles.memberContainer}>
                  <Image
                    source={require("../assets/erika.jpg")}
                    style={styles.memberImage}
                  />
                  <Text style={styles.memberName}>Erika Ferolino</Text>
                </View>
                <View style={styles.memberContainer}>
                  <Image
                    source={require("../assets/recreo.jpg")}
                    style={styles.memberImage}
                  />
                  <Text style={styles.memberName}>Ann Bernadette Recreo</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.memberContainer}>
                  <Image
                    source={require("../assets/subida.jpg")}
                    style={styles.memberImage}
                  />
                  <Text style={styles.memberName}>Anne Chatterene Subida </Text>
                </View>
                <View style={styles.memberContainer}>
                  <Image
                    source={require("../assets/nikol.jpg")}
                    style={styles.memberImage}
                  />
                  <Text style={styles.memberName}>Anne Nicole Talce</Text>
                </View>
                <View style={styles.memberContainer}>
                  <Image
                    source={require("../assets/tanno.jpg")}
                    style={styles.memberImage}
                  />
                  <Text style={styles.memberName}>Mantaro Tanno</Text>
                </View>
              </View>
            </View>
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
  aboutSubtitle: {
    fontSize: 16,
    color: "black",
    marginTop: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 250,
    height: 300,
    marginBottom: 20,
    marginTop: 20,
  },
  headerSentence: {
    color: 'black',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textContainer: {
    paddingHorizontal: 20,
    padding: 20,
    marginBottom: 10,
  },
  centeredText: {
    color: 'black',
    textAlign: "justify",
    fontSize: 18,
  },
  ourTeam: {
    color: 'black',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  memberContainer: {
    alignItems: "center",
  },
  memberImage: {
    flexDirection: "row",
    width: 180,
    height: 180,
    borderRadius: 150,
    marginBottom: 10,
  },
  memberName: {
    color: 'black',
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default About;
