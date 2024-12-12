import { signInAction } from "./actions"
import { push } from "connected-react-router"

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

            // const userData = await emailSignIn(email,password)
            // dispatch(signInAction({
            //     isSignedIn:true,
            //     uid:"0001",
            //     userName:"tatyu"
            // }))
        }
    }
}