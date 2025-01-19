import * as Actions from './actions'
import initialState from '../store/initialstate'

// actionの種類（SIGN_INなど）によってstoreの状態をどのように変更するかを決める
// 第一引数：state(どこから受け取る？) 第二引数：action
export const UsersReducer = (state = initialState.users, action) => {
//actionのタイプによってstateの状態をどのように変更するかを決める
switch(action.type){
    case Actions.FETCH_ORDERS_HISTORY:
        return {
            ...state,
            orders: [...action.payload]
        }
    case Actions.FETCH_PRODUCTS_IN_CART:
        return {
            ...state,
            cart: [...action.payload]
        }
    case Actions.SIGN_IN:
        return {
            ...state,
            ...action.payload
        }
    case Actions.SIGN_OUT:
        return{
            ...action.payload
        }
    default:
        return state

    }
}