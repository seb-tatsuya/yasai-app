import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './reducks/store/store';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
// import reportWebVitals from './reportWebVitals';

const history = History.createBrowserHistory(); // 現在の居場所または前回どこにいたか(URL)の履歴を作成
export const store = createStore(history);

// propsにstoreを渡す（ラップしたコンポーネントにstoreを渡しアプリ全体でstoreを参照）
// さらにConnectedRouterでラッピング、propsにhistory情報を渡す
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // propsに上で定義したstoreを代入
  <Provider props={store}>
    <ConnectedRouter history={history}>
      <App /> {/* AppをProviderでラッピンングすることによりアプリケーション全体でstoreを変更、参照が可能  */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
