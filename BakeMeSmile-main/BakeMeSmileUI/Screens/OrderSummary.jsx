import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const OrderSummary = ({ navigation, route }) => {
  const { selectedPaymentMethod, cartItems, selectedAddOns, dummyAddOns } = route.params || {};
  const selectedAddOnsData = selectedAddOns || {};
  const dummyAddOnsData = dummyAddOns || [];
  // Calculate total price including add-ons
  let totalPrice = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  // Add price of selected add-ons
  if (dummyAddOnsData && selectedAddOnsData) {
    Object.keys(selectedAddOnsData).forEach(addOnId => {
      if (selectedAddOnsData[addOnId]) {
        const addOn = dummyAddOnsData.find(addOn => addOn.id === parseInt(addOnId));
        if (addOn) {
          totalPrice += parseFloat(addOn.price);
        }
      }
    });
  }

  const handleOrderAgain = () => {
    navigation.navigate("Products");
  };

  return (
    <LinearGradient colors={["#ffde59", "#ff914d"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>ORDER SUMMARY</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.title}>Order Details</Text>
            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentMethodText}>Payment Method:</Text>
              <Text>{selectedPaymentMethod}</Text>
            </View>

            {cartItems.map((item, index) => (
              <View key={index} style={styles.productContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.quantityText}>{item.quantity}x {item.price}</Text>
              </View>
            ))}

            <View style={styles.addOnsContainer}>
              <Text style={styles.addOnsTitle}>Selected Add-Ons:</Text>
              {dummyAddOns && selectedAddOns && Object.entries(selectedAddOns).map(([addOnId, selected]) => (
                selected ? (
                  <View key={addOnId} style={styles.addOnItem}>
                    <Text>{dummyAddOns.find(addOn => addOn.id === parseInt(addOnId))?.name}</Text>
                    <Text>{dummyAddOns.find(addOn => addOn.id === parseInt(addOnId))?.price}</Text>
                  </View>
                ) : null
              ))}
            </View>

            <Text style={styles.totalPrice}>Total Amount: ₱{totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.orderAgainButton}
        onPress={handleOrderAgain}
      >
        <Text style={styles.orderAgainButtonText}>Order Again</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Adjust this value according to your button size
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  orderDetailsContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentMethodText: {
    color: 'black',
    fontWeight: "bold",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productName: {
    fontSize: 15,
    color: 'black',
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantityText: {
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  orderAgainButton: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "black",
   
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  orderAgainButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  addOnsContainer: {
    marginTop: 20,
  },
  addOnsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addOnItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});

export default OrderSummary;
