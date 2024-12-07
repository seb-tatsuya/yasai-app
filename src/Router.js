import React from "react";
import { Route ,Switch} from "react-router";
import {Login, Home} from "templates";

// ブラウザのURLに応じて表示するコンポーネントを切り替える（Routerコンポーネント）
export const Router = () =>{
    return (
        <Switch>
            {/* exact＝このパスに完全一致する場合 component={Login}を実行しコンポーネントを切り替える*/}
            <Route exact paht="/login" component={Login} />
            <Route paht="/posts/:id" component={Post} />
            <Route exact paht="(/)?" component={Home} /> {/* (/)? は正規表現と同じ()内の/が有っても無くても表示します*/}
        </Switch>
    );
};

export default Router;