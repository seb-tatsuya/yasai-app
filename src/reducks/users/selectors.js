import {createSelector} from 'reselect';

// selector=storeで管理しているstateを参照する関数
const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn // initialstateのisSignedIn
)

// 更新されたordersのstateをgetする
export const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders // initialstateのorders
)

// カート情報
export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.isSignedIn // initialstateのisSignedIn
)

// storeで管理しているusersのuidを取得する関数
export const getUserId = createSelector(
    [usersSelector],
    state => state.uid // initialstateのuid
)

// storeで管理しているusersのusernameを取得する関数
export const getUsername = createSelector(
    [usersSelector],
    state => state.username // initialstateのusername
)

// 商品情報storeから取得する
const productsSelector = (state) => state.products; // reduxの中のstateのproductsを取得

export const getProducts = createSelector(
    [productsSelector],
    state => state.list // stateの中のlistを取得 
)