// initialstateはstoreの初期状態を定義
// アプリに必要なstateをすべて記述

const initialState = {
    // 商品情報
    products:{

    },

    // ユーザー情報
    users:{
        isSignedIn: false,
        uid: "",
        userName: ""
    }
};

export default initialState