import React, { useEffect } from "react";
import {useDispatch, userSelector} from "react-redux";
import { getIsSignedIn } from "./reducks/users/selectors";

const Auth = ({Children}) => {
    const dispatch = useDispatch()
    const selector = userSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector); //isSignedIn

    // コンポーネントディルマインと同じ
    useEffect(() => { // renderが終わって
        if(!isSignedIn){
            dispatch(lisrenAuthState()) // もしサインインしていなかったらlisrenAuthState()を呼び出す
        }

    },[]);

    // サインインしていない場合は空の
    if(!isSignedIn){
        return <></>
    }else{
        return Children
    }
}

export default Auth