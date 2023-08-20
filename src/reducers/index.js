import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {searchReducer} from './searchReducer'
import {cartReducer} from './cartReducer'
import {drawerReducer} from './drawerReducer'
import {couponrReducer} from './couponReducer'
// import {CODReducer} from './CODReducer'

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponrReducer,
});

export default rootReducer;