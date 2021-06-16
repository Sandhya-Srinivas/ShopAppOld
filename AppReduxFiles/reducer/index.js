import { combineReducers } from 'redux'

import cart from "./cartReducer";
import stock from "./stockReducer";
import wishlist from "./wishlistReducer";

// anonumous return
export default combineReducers({
    cart,
    stock,
    wishlist
})