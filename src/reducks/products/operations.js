import {db,FirebaseTimestamp} from "../../firebase";
import {push} from "@reduxjs/toolkit"
import { ProductList } from "../../templates";
import {fetchProductsAction , deleteProductAction} from "./actions";

const productsRef = db.collection ('products')

// 商品情報削除
export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
        .then(() => {
            const prevProducts = getState().product.list;
            const nextProducts = prevProducts.filter(product => product.id !== id)
            dispatch(deleteProductAction(nextProducts))
        })
    }
}

export const fetchProducts = () => {
    return async (dispatch) => {
        productsRef.orderBy('updated_at','desc').get() //クエリ送信時に並び替えをする
        .then( snapshots => {
            const productsList = []
            snapshots.forEach(snapshots => {
                const product = snapshots.data();
                productsList.push(product)
            })
            dispatch(fetchProductsAction(ProductList))
        })
    }
}

// 商品登録画面から入力値を受け取る
export const saveProduct = (name , description , category , gender , price , images, sizes) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        // firestoreへ送るデータ構造
        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            peice: parseInt(price,10),
            sizes: sizes, // parseIntで文字列を１０進数に変換する
            updated_at: timestamp
        }

        // 商品情報編集でない場合
        if(id === ""){
            const ref = productsRef.doc();
            id = ref.id
            data.id = id
            data.created_at = timestamp
        }

        // 商品情報を更新
        return productsRef.doc(id).set(data , {merge:(true)}) // オブジェクト型でmerge:tureで更新された部分だけを更新
        .then(() => {
            dispatch(push('/'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}