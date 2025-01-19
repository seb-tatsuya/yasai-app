import { Badge, IconButton } from "@material-ui/core";
import { FavoriteBorderIcon, ShoppingCartIcon } from "@material-ui/icons";
import { MenuIcon } from "@material-ui/core/MenuIcon"
import React, { useEffect } from "react";
import { getProductsInCart, getUserId } from "../../reducks/users/selectors";
import { useSelector } from "react-redux";
import { ProductCard } from "../products";
import { db } from "../../firebase/index";
import { fetchProductsInCart } from "../../reducks/users/operations"
import { push } from "connected-react-router";

const HeaderMenus = (props) => {

    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    let productsInCart = getProductsInCart(selector);

    // 現在のカート情報リスナー
    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('cart')
        .onSnapshot(snapshots => {
            snapshots.docCanges().forEach(change => { //snapshotsはカートコレクションの中のデータ全て　
                const product = change.doc.data();
                const changeType = change.type;

                switch (changeType){
                    // 新しい商品を追加
                    case 'added':
                        productsInCart.push(product);
                        break;
                    // 商品の変更
                    case 'modified' :
                        const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                        productsInCart[index] = product
                        break;
                    // 商品の削除
                    case 'removed' :
                        productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
                        break;
                    default:
                        break;
                }
            });
            dispatch(fetchProductsInCart(productsInCart)) // reduxのstoreのcartの情報を更新するするためのオペレーション
        })

        return () => unsubscribe()
    },[]);

    return (
        <>
            <IconButton onClick={() => dispatch(push('/cart'))}>
                <Badge badgeContent={ProductCard.length} color="secondary"> {/*badgeContent={}でbsdgeの中身を指定する */}
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default HeaderMenus