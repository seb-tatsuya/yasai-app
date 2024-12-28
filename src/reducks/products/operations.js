import {db,FirebaseTimestamp} from "../../firebase";
import {push} from "@reduxjs/toolkit"

const productsRef = db.collection ('products')

// 商品登録画面から入力値を受け取る
export const saveProduct = (name , description , category , gender , price , images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        // firestoreへ送るデータ構造
        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            peice: parseInt(price,10), // parseIntで文字列を１０進数に変換する
            updated_at: timestamp
        }

        const ref = productsRef.doc();
        const id = ref.id
        data.id = id
        data.created_at = timestamp

        // 
        return productsRef.doc(id).set(data)
        .then(() => {
            dispatch(push('/'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}