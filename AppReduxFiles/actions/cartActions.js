/*
* Single Place Of Updation
*/

import * as actions from './action.types'

export const addToCart = (item)=>({
    type: actions.ADD_TO_CART,
    payload: {item}
})

export const moveToCart = (items)=>({
    type: actions.MOVE_TO_CART,
    payload: {items}
})

export const emptyCart = ()=>({
    type: actions.EMPTY_CART,
    payload: {}
})

export const editCartItem = (item)=>({
    type: actions.EDIT_CART_ITEM,
    payload: {item}
})

export const deleteCartItem = (item)=>({
    type: actions.DELETE_CART_ITEM,
    payload: {item}
})