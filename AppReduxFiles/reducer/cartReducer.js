import * as actions from "../actions/action.types";

const initialState = []


// anonymous function
export default (state = initialState, action)=>{
    switch(action.type){
        case actions.ADD_TO_CART:
            return [...state, action.payload]
        case actions.MOVE_TO_CART:
            return [...state, ...action.payload]
        case actions.EMPTY_CART:
            return []
        case actions.EDIT_CART_ITEM:
            state = state.filter(i=>(i.id !== action.payload.id))
            return [...state, action.payload]
        case actions.DELETE_CART_ITEM:
            return state.filter(i=>i.id!==action.payload.id)
        default:
            return state
    }
}
