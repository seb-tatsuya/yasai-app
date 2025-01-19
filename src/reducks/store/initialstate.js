// initialstateはstoreの初期状態を定義
// アプリに必要なstateをすべて記述

const initialState = {
    // 商品情報
    products:{
        List:[]
    },

    // ユーザー情報
    users:{
        cart: [],
        isSignedIn: false,
        orders: [],
        role: "",
        uid: "",
        userName: ""
    }
};

export default initialState