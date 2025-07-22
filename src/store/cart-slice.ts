import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
}

type CartState = {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(
            state: CartState, 
            action: PayloadAction<{ id: string; title: string; price: number }>
        ) {

                const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

                if(itemIndex >= 0) { // If the item already exists in the cart, we just increase the quantity
                    state.items[itemIndex].quantity++;
                }else {
                    state.items.push({
                        ...action.payload,
                        quantity: 1 // If the item does not exist, we add it with a quantity
                    })
                }
        },
        removeFromCart(state, action: PayloadAction<string>){

            const itemIndex = state.items.findIndex(item => item.id === action.payload);

            if( state.items[itemIndex].quantity === 1){
                state.items.splice(itemIndex, 1); // If the quantity is 1, we remove the item from the cart
            }else {
                state.items[itemIndex].quantity--; // If the quantity is more than 1, we just decrease the quantity
            }


        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;