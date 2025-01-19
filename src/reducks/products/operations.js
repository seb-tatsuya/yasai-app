import {db,FirebaseTimestamp} from "../../firebase";
import {push} from "@reduxjs/toolkit"
import { ProductList } from "../../templates";
import {fetchProductsAction , deleteProductAction} from "./actions";
import { useForkRef } from "@material-ui/core";

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

// ドロワーメニューから選択されたカテゴリーの情報が渡され
export const fetchProducts = (gender, category) => {
    return async (dispatch) => {
        let query = productsRef.orderBy('updated_at','desc'); //クエリ送信時に並び替えをする
        query = (gender !== "") ? query.where('gender' , '===' , gender) : query // URLのクエリーに条件追加する
        query = (category !== "") ? query.where('category' , '===' , category) : query // URLのクエリーに条件追加する
        
        query.get()
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

// トランザクション処理
export const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid);
        const timestamp = FirebaseTimestamp.now();

        let products = [],
            soldOutPrducts = [];

        const batch = db.batch();

        for(const product of productsInCart){
            const snapshot = await productsRef.doc(product.productId).get();
            const sizes = snapshot.data().sizes;

            const updatedSize = sizes.map(size => {
                if(size.size === product.size){
                    if(size.quantity === 0){ // 商品が売り切れの場合
                        soldOutPrducts.push(product.name)
                        return size
                    }
                    return {
                        sizes: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    return size
                }
            })

            // 注文履歴を残す為
            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            });

            // 購入後の数量でアップデートする
            batch.update(
                productsRef.doc(product.productId),
                {sizes: updatedSize}
            )

            // カート内の商品から今回購入した商品のIDを削除する
            batch.delete(
                userRef.collection('cart').doc(product.cartId)
            )
        }
        // 売り切れのものが１つでも存在する場合
        if(soldOutPrducts.length > 0){
            // 購入されずに（コミット）せずにアラートを出力
            const errorMessege = (soldOutPrducts.length > 1) ?
                                    soldOutPrducts.join("と") :
                                    soldOutPrducts[0];
            alert('大変申し訳ございません。' + errorMessege + '売り切れました')
            return false;
        } else {
            batch.commit()
            .then(() => {
                // 注文完了
                const orderRef = userRef.collection('orders').doc();
                // 新しくドキュメントを作成するリファレンスを作成
                const date = timestamp.toDate()
                const sippingDate = FirebaseTimestamp.fromDate(new Date.setDate(date.getDate() + 3)) // Date型のものからfirebase用のtimedtamp(今日の日付から３日間足した日付)
                
                // 注文履歴
                const orderHistory = {
                    amount: amount,
                    created_at: timestamp,
                    id: orderRef.id,
                    products: products,
                    sipping_date: sippingDate,
                    updated_at: timestamp
                }

                orderRef.set(orderHistory);
                dispatch(push('/order/complate'));

            }).catch(() => {
                alert('注文処理に失敗しました。通信環境のご確認のうえ、もう一度お試しください')
                return false
            })
        }
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