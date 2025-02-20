import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productId = action.payload._id || action.payload.id;

            if (!productId) {
                console.error("🚨 Error: Product ID is undefined. Check dispatched payload.");
                return;
            }

            const existingProduct = state.products.find((product) => product._id === productId);

            if (!existingProduct) {
                state.products.push({ ...action.payload, _id: productId, quantity: 1 });
            } else {
                console.log("Item is already in cart.");
            }

            // Update the cart state after adding to cart
            updateCartState(state);
        },

        updateQuantity: (state, action) => {
            const { type, _id } = action.payload;

            // Find the product by _id
            const product = state.products.find((product) => product._id === _id);

            if (product) {
                if (type === 'increment') {
                    product.quantity += 1;
                } else if (type === 'decrement' && product.quantity > 1) {
                    product.quantity -= 1;
                }
            }

            // Update state values after changing quantity
            updateCartState(state);
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload.id);
            updateCartState(state);
        },
        clearCart: (state) => {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;
        }
    },
});

// Function to update the cart state after any change
const updateCartState = (state) => {
    state.selectedItems = calculateSelectedItems(state);
    state.totalPrice = calculateTotalPrice(state);
    state.tax = calculateTax(state);
    state.grandTotal = calculateGrandTotal(state);
};

// Helper functions for calculations
export const calculateSelectedItems = (state) =>
    state.products.reduce((total, product) => total + product.quantity, 0);

export const calculateTotalPrice = (state) =>
    state.products.reduce((total, product) => total + product.quantity * product.price, 0);

export const calculateTax = (state) => calculateTotalPrice(state) * state.taxRate;

export const calculateGrandTotal = (state) => calculateTotalPrice(state) + calculateTax(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
