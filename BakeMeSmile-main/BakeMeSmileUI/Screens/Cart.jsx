import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useCart } from '../CartContext'; // Adjust the path as needed
import CheckBox from '@react-native-community/checkbox';

function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product
  const [showAddOnsModal, setShowAddOnsModal] = useState(false); // State to control modal visibility
  const [selectedAddOns, setSelectedAddOns] = useState({}); // State to store selected add-ons

  // Dummy add-ons for demonstration
  const dummyAddOns = [
    { id: 1, name: 'Extra toppings', price: '10.00' },
    { id: 2, name: 'Special sauce', price: '15.00' },
    { id: 3, name: 'Double cheese', price: '20.00' },
  ];

  // Function to calculate total price including add-ons
  const calculateTotalPrice = () => {
    let total = cartItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);

    // Add price of selected add-ons
    if (dummyAddOns) {
      Object.keys(selectedAddOns).forEach(addOnId => {
        if (selectedAddOns[addOnId]) {
          const addOn = dummyAddOns.find(addOn => addOn.id === parseInt(addOnId));
          if (addOn) {
            total += parseFloat(addOn.price);
          }
        }
      });
    }

    return total;
  };

  // Calculate total price
  const totalPrice = calculateTotalPrice();

  // Function to handle placing order
  const handlePlaceOrder = () => {
    const selectedPaymentMethod = "Credit Card"; // Set a default payment method or obtain it from somewhere
    navigation.navigate('PaymentOption', {
      selectedPaymentMethod: selectedPaymentMethod, // Pass selectedPaymentMethod to OrderSummary screen
      cartItems: cartItems,
      selectedAddOns: selectedAddOns,
      totalPrice: totalPrice,
      dummyAddOns: dummyAddOns, // Pass dummyAddOns to OrderSummary screen
    });
  };

  // Function to handle clicking on a product in the cart
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set selected product
    setShowAddOnsModal(true); // Show modal to display add-ons
  };

  // Function to handle selecting add-ons
  const handleAddOnSelect = (addOnId, isChecked) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [addOnId]: isChecked,
    }));
  };

  const handleSaveAddOns = () => {
    // Process selected add-ons here, you can add them to the cart or perform any other action
    setShowAddOnsModal(false); // Close the modal after saving add-ons
  };


  return (
    <LinearGradient colors={['#ffde59', '#ff914d']} style={{ flex: 1 }}>
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
          <Text style={styles.headerText}>CART</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.bakeMeSmile}>
            <Text style={styles.bakeMe}>BAKE ME</Text>
            <Text style={styles.smile}>SMILE</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleProductClick(item)}>
                <View style={styles.productContainer}>
                  <Image source={item.image} style={styles.productImage} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>Price: ₱{item.price}</Text>
                    <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => removeFromCart(item)}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addToCart(item)}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          )}

          <TouchableOpacity
            style={styles.addMoreItemsButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.addMoreItemsText}>Add more items</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>₱ {totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderButtonText}>Checkout</Text>
        </TouchableOpacity>

        {/* Modal for displaying add-ons */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAddOnsModal}
          onRequestClose={() => setShowAddOnsModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.addOnsContent}>
              <Text style={styles.modalText}>Add-Ons for {selectedProduct?.name}</Text>
              {dummyAddOns.map((addOn) => (
                <View key={addOn.id} style={styles.addOnItem}>
                  <CheckBox
                    value={selectedAddOns[addOn.id]}
                    onValueChange={(newValue) => handleAddOnSelect(addOn.id, newValue)}
                  />
                  <Text>{addOn.name}</Text>
                  <Text>{addOn.price}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.saveAddOnsButton} onPress={handleSaveAddOns}>
              <Text style={styles.saveAddOnsText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowAddOnsModal(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  quantityButton: {
    fontSize: 25,
    color: 'black',
    paddingHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  addMoreItemsButton: {
    alignItems: "center",
    paddingVertical: 15,
  },
  addMoreItemsText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 15,
    margin: 20,
    borderRadius: 15,
  },
  placeOrderButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addOnsContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addOnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  closeModalButton: {
    marginTop: 20,
  },
  closeModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  saveAddOnsButton: {
    backgroundColor: 'black',
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  saveAddOnsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeModalButton: {
    backgroundColor: 'black',
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  closeModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  });

export default Cart;
