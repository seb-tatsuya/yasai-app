import {
    combineReducers,
    // applyMiddleware
} from 'redux';
import { configureStore , getDefaultMiddleware } from '@reduxjs/toolkit';
// import {ProductsReducer} from '../products/reducers';
import { UsersReducer } from '../users/reducers';
// import { ConnectedRouter,routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export const createStore = (history) => { //history=今どこにいるかの情報（URL）

    const rootReducer = combineReducers({
        users: UsersReducer
        // 他のリデューサをここに追加できます
      });

      const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: true, // redux-thunkを有効にする(非同期処理を待機する)
            serializableCheck: false, // `history` を redux store に格納する場合にエラーを回避するため
          }).concat(routerMiddleware(history)), 
          thunk,// 他のミドルウェアがあればここに追加できます
        devTools: process.env.NODE_ENV !== 'production', // 開発モードでのみRedux DevToolsを有効化
      });
    
      return store;

        // const rootReducer =  combineReducers({
        //     // 管理したいstateが増えればreducerも増える
        //     // products: ProductsReducer,
        //     // router:ConnectedRouter(history), //reduxのstoreにrouter(state)を作り、そのstateの値はhistoryの情報
            
        // }),
        // // routerをミドルウェアで使うと言う宣言
        // // ルーティング用のミドルウェアを導入(ミドルウェアはアプリケーションとOSの中間)
        // applyMiddleware(
        //     routerMiddleware(history),
        //     thunk // 非同期処理を待機する
        // )
}

