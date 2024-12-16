import React , {useCallback , useState} from "react";
import {PrimaryButton, TextInput} from "../components/UIkits";

const SignUp = () => {

    // 各入力値の初期値
    const [username , setUsername] = useState(""),
            [email , setEmail] = useState(""),
            [password , setPassword] = useState(""),
            [confirmPassword , setConfirmPassword] = useState("");
    
    // useCallback関数でメモ化してパフォーマンス向上
    // usetnameメモ化
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername]);

    // メールアドレスメモ化
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    // パスワードメモ化
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);

    // 確認用メールアドレスメモ化
    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    },[setConfirmPassword]);

    return(
        //c-section-containerは独自CSSクラス
        <dev className="c-section-container"> 
            <h2 className="u-text__headline u-text-center">アカウント登録</h2>
            <div className="model-spacer--medium"/>

            <TextInput
                fullwidth={true} label={"ユーザー名"} multiline={false} required={true}
                value={username} type={"text"} onChange={inputUsername}
            />
            <div className="nodule-space--medium" />
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
            <TextInput
                fullwidth={true} label={"確認用パスワード"} multiline={false} required={true}
                value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div className="nodule-space--medium" />
            <dev className="center">
                <PrimaryButton
                    label={"アカウントを登録する"}
                    onClick={() => console.log("clicked")}
                />

            </dev>
        </dev>
    )
}

export default SignUp