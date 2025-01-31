import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCart } from '../CartContext';

function PaymentOption({ route }) {
  const { resetCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(null);
  const totalPrice = route.params?.totalPrice || 0;
  const selectedAddOns = route.params?.selectedAddOns || {};
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        resetCart(); // Reset the cart when leaving the PaymentOption screen
      };
    }, [])
  );
  const handlePaymentConfirmation = () => {
    if (selectedPaymentMethod) {
      navigation.navigate("OrderSummary", {
        selectedPaymentMethod,
        cartItems: route.params?.cartItems || [],
        selectedAddOns: route.params?.selectedAddOns || {}, // Pass selectedAddOns
        dummyAddOns: route.params?.dummyAddOns || [], // Pass dummyAddOns
        totalPrice,
      });
    } else {
      Alert.alert("Error", "Please select a payment method.");
    }
  };
  
  return (
    <LinearGradient colors={["#ffde59", "#ff914d"]} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>PAYMENT</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Choose Payment Option</Text>

        <View style={styles.paymentOption}>
          <RadioButton
            value="Cash"
            status={selectedPaymentMethod === "Cash" ? "checked" : "unchecked"}
            onPress={() => setSelectedPaymentMethod("Cash")}
            color="#4CAF50"
          />
          <Text style={styles.paymentOptionText}>Cash</Text>
        </View>

        <View style={styles.paymentOption}>
          <RadioButton
            value="GCash"
            status={selectedPaymentMethod === "GCash" ? "checked" : "unchecked"}
            onPress={() => setSelectedPaymentMethod("GCash")}
            color="#4CAF50"
          />
          <Text style={styles.paymentOptionText}>GCash</Text>
        </View>

        <View style={styles.paymentOption}>
          <RadioButton
            value="Credit Card"
            status={selectedPaymentMethod === "Credit Card" ? "checked" : "unchecked"}
            onPress={() => setSelectedPaymentMethod("Credit Card")}
            color="#4CAF50"
          />
          <Text style={styles.paymentOptionText}>Credit Card</Text>
        </View>

        <View style={styles.paymentOption}>
          <RadioButton
            value="PayPal"
            status={selectedPaymentMethod === "PayPal" ? "checked" : "unchecked"}
            onPress={() => setSelectedPaymentMethod("PayPal")}
            color="#4CAF50"
          />
          <Text style={styles.paymentOptionText}>PayPal</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Price: ₱ {totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handlePaymentConfirmation}
        >
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
          <Icon name="arrow-forward" size={20} color="white" style={styles.confirmButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By completing this order, I agree to all terms & conditions.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
  backButton: {
    position: 'absolute',
    left: 15,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  paymentOptionText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  totalContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  confirmButtonIcon: {
    marginLeft: 10,
  },
  termsText: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});

export default PaymentOption;
