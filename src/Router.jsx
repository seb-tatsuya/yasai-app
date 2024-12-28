import React from "react";
import { Route ,Switch} from "react-router";
import {Home ,ProductEdit,Reset ,SignIn ,SignUp} from "./templates";
import Auth from './Auth'

// ルーティング
// ブラウザのURLに応じて表示するコンポーネントを切り替える（ルーティング（Routerコンポーネント））
export const Router = () =>{
    return (
        <Switch>
            {/* exact＝このパスに完全一致する場合 component={Login}を実行しコンポーネントを切り替える*/}
            <Route exact paht="/signIn" component={SignIn} />
            <Route exact paht="/signup" component={SignUp} />
            <Route exact paht="/signup/reset" component={Reset} />
            {/* <Route paht="/posts/:id" component={Post} /> */}

            {/* authコンポーネント 認証した状態で見れるようにする*/}
            <Auth>
                <Route exact paht="(/)?" component={Home} /> {/* (/)? は正規表現と同じ()内の/が有っても無くても表示します*/}
                <Route exact paht="/product/edit" component={ProductEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;