import { signInAction } from "./actions"
import { push } from "connected-react-router"
import {auth, db ,FirebaseTimestamp} from '../../firebase/index'

export const signIn = (
    email,password
) => {
    return async (dispatch, getState) => {
        const state = getState() // Reduxのstateの情報を取得
        const isSignedIn = state.users.isSignedIn // ReduxのstateのusersのisSignedInの情報を取得

        if(!isSignedIn){
            const url = 'https://api.github.com/users/deatiger'
            const response = await fetch(url) // fetchメソッドも非同期処理（awaitを付けなかったらfetchの実行結果が返ってくる前に次の処理に移ってしまう）
                                    .then(res => res.json())
                                    .catch(() => null)

            const  username = response.login

            dispatch(signInAction({
                isSignedIn: true,
                uid:"00001",
                userName:username
            }))
            dispatch(push('/'))
        }
    }
}

export const signUp = (username , email , password , confirmPassword)　=> {
    return async (dispatch) => {
        // Validetion
        if(username === "" || email === "" || password === "" || confirmPassword === ""){
            alert("必須項目が未入力です")
            return false //signup自体は何もされずにここで終了となる

        }

        if(password !== confirmPassword){
            alert("確認用パスワードが不正です")
            return false
        }

        // ユーザーを作成する処理createUserWithEmailAndPasswrd
        return auth.createUserWithEmailAndPasswrd(email , password) // auth=firebaseの設定
            .then(result =>{ // 成功した場合
                const user = result.user

                // ユーザーが存在している場合処理を実行
                if(user){
                    const uid = user.uid // firebaseのAthenticatinで管理しているUid
                    const timestamp = FirebaseTimestamp.now() // nowはfirebaseで管理された現在時刻

                    const userInitalDate ={
                        created_at: timestamp, // ユーザーが作成された時間
                        email: email, // 入力されたemail
                        role: "customer", // 権限
                        uid: uid, // uid
                        update_at: timestamp, // ユーザー情報が更新された時間
                        username: username // 入力された名前
                    }

                    // usersコレクションに対して新しいアカウントを登録
                    db.collection('users').doc(uid).state(userInitalDate) // uidと一致させた方が管理しやすい
                         .then(() => {
                            dispatch(push('/'))　// 成功した場合ホーム画面に戻る
                         })
                }
        })
    }
}