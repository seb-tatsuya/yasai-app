import React , {useCallback , useState} from "react";
import {PrimaryButton, TextInput} from "../components/UIkits";
import {resetPassword} from '../reducks/users/operations'
import { useDispatch } from "react-redux";
import {push} from '@reduxjs/toolkit'

const Reset = () => {

    const dispatch = useDispatch()

    // 各入力値の初期値
    const [email , setEmail] = useState("");
    
    // useCallback関数でメモ化してパフォーマンス向上

    // メールアドレスメモ化
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    return(
        //c-section-containerは独自CSSクラス
        <dev className="c-section-container"> 
            <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
            <TextInput
                fullwidth={true} label={"Email"} multiline={false} required={true}
                value={email} type={"email"} onChange={inputEmail}
            />
            <div className="nodule-space--medium" />

            <dev className="center">
                <PrimaryButton
                    label={"Reset Password"}
                    onClick={() => dispatch(resetPassword(email))} // firebase.Ruhr
                />
                <p onClick={() => (dispatch(push('/signup')))}>アカウントをお持ちでない方はこちら</p>
                <p onClick={() => (dispatch(push('/signin/reset')))}>パスワードを忘れた方はこちら</p>
            </dev>
        </dev>
    )
}

export default Reset