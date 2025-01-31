import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import LinearGradient from 'react-native-linear-gradient';
import { useCart } from '../CartContext'; // Import useCart hook

function Category({ title }) {
  return (
    <TouchableOpacity style={styles.category}>
      <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>
  );
}

function Products() {
  const navigation = useNavigation(); 
  const { addToCart } = useCart(); // Destructure addToCart function from useCart hook
  const products = [
    {
      id: 1,
      name: "Flan",
      image: require("../assets/flan.png"),
      price: "100.00",
      description: "yummy",
    },
    {
      id: 2,
      name: "Cupcake",
      image: require("../assets/cream.png"),
      price: "120.00",
      description: "delicious",
    },
    {
      id: 3,
      name: "Brezel",
      image: require("../assets/brezel.png"),
      price: "90.00",
      description: "tasty",
    },
    {
      id: 4,
      name: "Macarons",
      image: require("../assets/macarons.png"),
      price: "150.00",
      description: "scrumptious",
    },
    {
      id: 5,
      name: "Cheese Cake",
      image: require("../assets/cheesecake.png"),
      price: "180.00",
      description: "mouth-watering",
    },
    {
      id: 6,
      name: "Pancake",
      image: require("../assets/pancake.png"),
      price: "80.00",
      description: "fluffy",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product); 
    navigation.navigate('Cart'); 
  };

  useEffect(() => {
    // Any necessary setup or state updates
  }, []);

  return (
    <LinearGradient colors={["#ffde59", "#ff914d"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.drawerIcon}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Text style={styles.drawerText}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>PRODUCTS</Text>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search products..."
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.categories}>
          <Category title="All" />
          <Category title="Cakes" />
          <Category title="Drinks" />
          <Category title="Biscuits" />
          <Category title="Muffins" />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {products.map((product) => (
            <View
              key={product.id}
              style={styles.productContainer}
            >
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₱ {product.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(product)}
              >
                <Text style={styles.addToCartText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  categories: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    marginTop: 10,
  },
  category: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    color: "black",
    marginTop: 15,
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  productContainer: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    elevation: 4,
    height: 280,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
  },
});

export { Products };
