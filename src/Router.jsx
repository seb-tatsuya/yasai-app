import React from "react";
import { Route ,Switch} from "react-router";
import {CartList, OrderConfirm, OrderHistory, ProductDetail,ProductEdit,ProductList,Reset ,SignIn ,SignUp} from "./templates";
import Auth from './Auth'

// ルーティング
// ブラウザのURLに応じて表示するコンポーネントを切り替える（ルーティング（Routerコンポーネント））
export const Router = () =>{
    return (
        <Switch>
            {/* exact＝このパスに完全一致する場合 component={Login}を実行しコンポーネントを切り替える*/}
            <Route exact paht="/signIn" component={SignIn} />
            <Route exact paht="/signup" component={SignUp} />
            <Route exact paht="/signin/reset" component={Reset} />
            {/* <Route paht="/posts/:id" component={Post} /> */}

            {/* authコンポーネント 認証した状態で見れるようにする*/}
            <Auth>
                <Route exact paht="(/)?" component={ProductList} /> {/* (/)? は正規表現と同じ()内の/が有っても無くても表示します*/}
                <Route exact paht="/product/:id" component={ProductDetail} /> {/*:idは変数 */}
                <Route paht="/product/edit(/:id)?" component={ProductEdit} /> {/*正規表現(/:id)? で商品IDに応じて表示画面を指定する又はIDの指定が無い場合もProductEditを呼び出す */}

                <React exact paht={"/cart"} component={CartList}/>
                <React exact paht={"/order/confirm"} component={OrderConfirm}/>
                <React exact paht={"/order/history"} component={OrderHistory}/>
            </Auth>
        </Switch>
    );
};

export default Router;