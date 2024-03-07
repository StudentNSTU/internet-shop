import { createSlice } from "@reduxjs/toolkit";
import { CartItem, Item } from "../../assets/types";

const initialState = {
    items: [
        { id: 1, title: "Свитер", price: 1500, currency: "₽", imgURL: "https://pi.lmcdn.ru/img600x866/M/P/MP002XM0YDSQ_6120204_4_v1.jpeg", sizes: ['S', 'M', 'XL', "XXL"], alarm: false},
        { id: 2, title: "Толстовка", price: 2800, currency: "₽", imgURL: "https://cdn1.ozone.ru/s3/multimedia-u/6135216714.jpg", sizes: ['M', 'XL', "XXL"], alarm: false},
        { id: 3, title: "Nike Air Vortex", price: 3400, currency: "₽", imgURL: "https://www.cmp24.ru/images/prodacts/sourse/64530/64530498_mujskie-krossovki-nike-air-vortex-903896-010.jpg", sizes: ['38', '42', '45'], alarm: false},
    ] as Item[],
    cartItems: [
        
    ] as CartItem[]
}

const reducer = createSlice({
    name: "initialData",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const filterdItem = state.cartItems.filter((item) => item.item.id == action.payload.id && item.chosenSize == action.payload.size)[0]
            if (filterdItem) {
                state.cartItems = state.cartItems.map((item) => {
                    if (item.item.id == filterdItem.item.id) {
                        if (item.chosenSize == filterdItem.chosenSize)
                            return { ...item, quality: item.quality += 1 }
                        else {
                            const item: CartItem = {
                                quality: 1,
                                chosenSize: action.payload.size,
                                item: state.items.filter((item) => item.id == action.payload.id)[0]
                            }
                            state.cartItems.push(item)
                        }
                    }

                    return { ...item }
                })
            } else {
                const item: CartItem = {
                    quality: 1,
                    chosenSize: action.payload.size,
                    item: state.items.filter((item) => item.id == action.payload.id)[0]
                }
                state.cartItems.push(item)
            }

        },
        addQuality: (state, action) => {
            state.cartItems = state.cartItems.map((item) => {
                if (item.item.id == action.payload.id) {
                    if (item.quality !== 1 || action.payload.effect > 0) {
                        return { ...item, quality: item.quality += action.payload.effect }
                    }
                }
                return item
            })
        },
        deleteItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => !deepEqual(item, action.payload))
        },
        setAlarm: (state, action) => {
            state.items = state.items.map((item)=>{
                if(item.id == action.payload.id){
                    return {...item, alarm: action.payload.alarm }
                }
                return item
            })
        }
    }
})

function deepEqual(x: any, y: any): any {
    return (x && y && typeof x === 'object' && typeof y === 'object') ?
        (Object.keys(x).length === Object.keys(y).length) &&
        Object.keys(x).reduce(function (isEqual, key) {
            return isEqual && deepEqual(x[key], y[key]);
        }, true) : (x === y);
}

export const { addToCart, addQuality, deleteItemFromCart, setAlarm } = reducer.actions

export const initialReducer = reducer.reducer

