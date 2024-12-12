import React , {Component} from "react";
import { useDispatch, useSelector } from "react-redux";
import {push} from "connected-react-router";
import { signInAction } from "../reducks/users/actions";

// storeとコネクトされたコンテナーコンポーネント
export default class LoginClass extends Component{
    render(){
        return (
            <dev>
                <h2>ログイン</h2>
                <button onClick={() => { this.props.action.signIn()} > // mapDispatchToPropsのactionのsignIn関数を呼び出す
                ログインする
                </button>
            </dev>
        );
    }
}

const Login = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    console.log(selector.router)

    return (
        <div>
            <h2>ログイン</h2>
            <button onClick={() => {
                dispatch(signInAction({uid:"0001" , userName:"tatsu"}));
                dispatch(push('/'))}}>ログイン</button> {/* push=URLに遷移する役割　ログインしたらホーム画面に遷移するような流れ*/}
        </div>
    );
};

export default Login;