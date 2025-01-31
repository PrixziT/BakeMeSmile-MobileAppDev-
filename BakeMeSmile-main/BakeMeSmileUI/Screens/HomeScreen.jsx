import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native"; // Import useNavigation
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";

function HomeScreen() {
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
          <Text style={styles.headerText}>HOME</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.swiperContainer}>
            <Swiper
              style={styles.swiper}
              autoplay={true}
              dotStyle={styles.swiperDotStyle}
              activeDotStyle={styles.swiperActiveDotStyle}
              dotContainerStyle={styles.swiperDotContainer}
            >
              <Image
                source={require("../assets/bagel.png")}
                style={styles.swiperimage}
              />
              <Image
                source={require("../assets/baguette.png")}
                style={styles.swiperimage}
              />
              <Image
                source={require("../assets/pie.png")}
                style={styles.swiperimage}
              />
              <Image
                source={require("../assets/croissant.png")}
                style={styles.swiperimage}
              />
            </Swiper>
          </View>

          <View style={styles.content}>
            <View style={styles.bakeMeSmile}>
              <Text style={styles.bakeMe}>BAKE ME</Text>
              <Text style={styles.smile}>SMILE</Text>
            </View>

            <View style={styles.containerBox}>
              <View style={styles.description}>
                <Text style={styles.descriptionText}>
                  Made from 100% whole wheat flour. Whole wheat flour consists
                  of the entire wheat bread berry ground to flour fineness. This
                  flour contains approximately the same relative proportion of
                  nutrients and components as the original wheat kernel.
                </Text>
              </View>
            </View>

            <TouchableOpacity 
  style={styles.purchaseButton} 
  onPress={() => navigation.navigate('Products')}
>
  <Text style={styles.purchaseButtonText}>PURCHASE</Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  swiperContainer: {
    backgroundColor: "#fff2",
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  swiper: {
    height: "100%",
  },
  swiperimage: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },
  swiperDotStyle: {
    backgroundColor: "black",
  },
  swiperActiveDotStyle: {
    backgroundColor: "white",
  },
  bakeMeSmile: {
    flexDirection: "row",
    marginBottom: 30,
  },
  bakeMe: {
    color: "white",
    fontSize: 35,
    marginRight: 5,
    fontWeight: "bold",
  },
  smile: {
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
  },
  containerBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    marginBottom: 20,
    width: 350,
    height: "auto",
  },
  description: {
    alignItems: "center",
  },
  descriptionText: {
    textAlign: "justify",
    color: "black",
    fontSize: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    alignItems: "center",
  },
  bestSellerText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  purchaseButton: {
    backgroundColor: "black",
    alignItems: "center",
    width: "50%",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 15,
  },
  
  purchaseButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  
  
});

export default HomeScreen;
