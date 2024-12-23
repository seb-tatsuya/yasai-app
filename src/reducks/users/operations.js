import { signInAction } from "./actions"
import { push } from "connected-react-router"
import {auth, db ,FirebaseTimestamp} from '../../firebase/index'
import { snapshotEqual } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

// 認証をリッスンする関数
export const listenAuthState = () => {
    return async (dispatch) => {
        return onAuthStateChanged(user => {
            if(user){ // userが存在している条件＝認証を完了していると言う意味
                // userの認証が完了している場合はuser情報をDBから取得してstoreにSignInした時と同じように形でstateをもたす
                const uid = user.uid
                db.collection('users').doc(uid).get() // usersコレクションからuidを取得する
                .then(snapshot => {
                    const data = snapshot.data()
                    // クエリを投げてreduxのユーザー情報を更新する
                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: uid,
                        username: data.username
                    }))

                    dispatch(push('/'))
                })
            }else{
                dispatch(push('/signin'))
            }
        })
    }
}

export const signIn = (email,password) => {
    return async(dispatch) => {
        // Validetion
        if(email === "" || password === ""){
            alert("必須項目が未入力です")
            return false //signup自体は何もされずにここで終了となる

        }

        auth.signInWithEmailAndPasswrd(email,password)
        .then(result => {
            const user = result.user

            if(user){
                const uid = user.uid
                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: uid,
                        username: data.username
                    }))

                    dispatch(push('/'))
                })
            }
        }

        )
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