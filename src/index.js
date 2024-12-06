import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import createStore from './reducks/store/store';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// propsにstoreを渡す（ラップしたコンポーネントにstoreを渡す）
export const store = createStore();

ReactDOM.render(
  // propsに上で定義したstoreを代入
  <Provider props={store}>
    <App /> {/* AppをProviderでラッピンングすることによりアプリケーション全体でstoreを変更、参照が可能  */}
  </Provider>

)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
