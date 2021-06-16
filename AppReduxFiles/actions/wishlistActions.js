/*
* Single Place Of Updation
*/

import * as actions from './action.types'

export const addToWishlist = (item)=>({
    type: actions.ADD_TO_WISHLIST,
    payload: {item}
})

export const moveToWishlist = (items)=>({
    type: actions.MOVE_TO_WISHLIST,
    payload: {items}
})

export const emptyWishlist = ()=>({
    type: actions.EMPTY_WISHLIST,
    payload: {}
})

export const editWishlistItem = (item)=>({
    type: actions.EDIT_WISHLIST_ITEM,
    payload: {item}
})

export const deleteWishlistItem = (item)=>({
    type: actions.DELETE_WISHLIST_ITEM,
    payload: {item}
})