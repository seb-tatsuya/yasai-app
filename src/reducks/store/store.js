import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
// import {ProductsReducer} from '../products/reducers';
import { UsersReducer } from '../users/reducers';
import { ConnectedRouter,routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export default function createStore(history){ //history=今どこにいるかの情報（URL）
    return reduxCreateStore (
        // combineReducers({
        //     // 管理したいstateが増えればreducerも増える
        //     // products: ProductsReducer,
        //     router:ConnectedRouter(history), //reduxのstoreにrouter(state)を作り、そのstateの値はhistoryの情報
        //     users: UsersReducer
        // }),
        // routerをミドルウェアで使うと言う宣言
        // ルーティング用のミドルウェアを導入(ミドルウェアはアプリケーションとOSの中間)
        applyMiddleware(
            routerMiddleware(history),
            thunk // 非同期処理を待機する
        )
    );
}

