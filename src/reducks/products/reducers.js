import * as Actions from './actions'
import initialState from '../store/initialstate'

// actionの種類（SIGN_INなど）によってstoreの状態をどのように変更するかを決める
// 第一引数：state(どこから受け取る？) 第二引数：action
export const ProductsReducer = (state = initialState.products, action) => {
//actionのタイプによってstateの状態をどのように変更するかを決める
switch(action.type){
    
    default:
        return state

    }
}