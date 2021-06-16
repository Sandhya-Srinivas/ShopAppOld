import * as actions from "../actions/action.types";

const initialState = []


// anonymous function
export default (state = initialState, action)=>{
    switch(action.type){
        case actions.ADD_TO_STOCK:
            return [...state, action.payload]
        case actions.MOVE_TO_STOCK:
            return [...state, ...action.payload]
        case actions.EMPTY_STOCK:
            return []
        case actions.EDIT_STOCK_ITEM:
            state = state.filter(i=>(i.id !== action.payload.id))
            return [...state, action.payload]
        case actions.DELETE_STOCK_ITEM:
            return state.filter(i=>i.id!==action.payload.id)
        default:
            return state
    }
}
    