import React , {useCallback , useState} from "react";
import {PrimaryButton, TextInput} from "../components/UIkits";
import {signIn} from '../reducks/users/operations'
import { useDispatch } from "react-redux";

const SignIn = () => {

    const dispatch = useDispatch()

    // 各入力値の初期値
    const [email , setEmail] = useState(""),
          [password , setPassword] = useState("");
    
    // useCallback関数でメモ化してパフォーマンス向上

    // メールアドレスメモ化
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    // パスワードメモ化
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);

    return(
        //c-section-containerは独自CSSクラス
        <dev className="c-section-container"> 
            <h2 className="u-text__headline u-text-center"></h2>
            <TextInput
                fullwidth={true} label={"Email"} multiline={false} required={true}
                value={email} type={"email"} onChange={inputEmail}
            />
            <div className="nodule-space--medium" />
            <TextInput
                fullwidth={true} label={"パスワード"} multiline={false} required={true}
                value={password} type={"password"} onChange={inputPassword}
            />
            <div className="nodule-space--medium" />

            <dev className="center">
                <PrimaryButton
                    label={"Sign in"}
                    onClick={() => dispatch(signIn(email , password))} // firebase.Ruhr
                />
                <p onClick={() => (dispatch(push('/signin')))}>アカウントをお持ちの方はこちら</p>
            </dev>
        </dev>
    )
}

export default SignIn