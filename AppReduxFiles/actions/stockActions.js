/*
* Single Place Of Updation
*/

import * as actions from './action.types'

export const addToStock = (item)=>({
    type: actions.ADD_TO_STOCK,
    payload: {item}
})

export const moveToStock = (item)=>({
    type: actions.MOVE_TO_STOCK,
    payload: {items}
})
export const emptyStock = ()=>({
    type: actions.EMPTY_STOCK,
    payload: {}
})

export const editStockItem = (item)=>({
    type: actions.EDIT_STOCK_ITEM,
    payload: {item}
})

export const deleteStockItem = (item)=>({
    type: actions.DELETE_STOCK_ITEM,
    payload: {item}
})