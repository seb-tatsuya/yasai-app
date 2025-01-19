import { Divider, makeStyles } from "@material-ui/core";
import { Widgets } from "@material-ui/icons";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/products";
import { PrimaryButton, TextDetail } from "../components/UIkits";
import { orderProduct } from "../reducks/products/operations";

const useStayles = makeStyles((theme) => ({
    detailBox: {
        margin : 'o auto',
        [theme.breakpoints.down('sm')]: {
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            width: 512
        }
    },
    orderBox: {
        border: '1px solid rgba(0 0 0 0.2)',
        borderRadius: 4,
        boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
        height: 256,
        margin: '24px auto 16px auto',
        padding: 16,
        width: 288
    }
}));

// 注文確認画面
const OrderConfirm = () => {
    const classes = useStayles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const productsInCart = getProductsInCart(selector);

    // 合計金額
    const subtotal = useMemo(() => {
        return productsInCart.reduce((sum , product) => sum += product.price, 0) //sumの初期値が０
    },[productsInCart]);
    // 送料
    const shippingFee = (subtotal >= 100000) ? 0 : 210;
    // 消費税
    const tax = (subtotal) * 0.1;
    // 合計金額
    const total = subtotal + shippingFee + tax;

    // 注文するボタン押下
    const order = useCallback(() => {
        dispatch(orderProduct(productsInCart, total))
    },[productsInCart, total])

    return (
        <select className="c-section-wrapin">
            <h2 className="u-text__headline">注文の確認</h2>
            <div className={classes.ditailBox}>
                <List>
                    {productsInCart.length > 0 &&(
                        productsInCart.map(product => <CartListItem product={product} key={product.cartId}/>)
                    )}
                </List>
            </div>
            <div className={classes.orderBox}>
                    <TextDetail label={"商品合計"} value={"¥" + subtotal.toLocaleString()} />
                    <TextDetail label={"送料"} value={"¥" + shippingFee.toLocaleString()} />
                    <TextDetail label={"消費税"} value={"¥" + tax} />
                    <Divider />
                    <TextDetail label={"合計（税込）"} value={"¥" + total.toLocaleString()} />
                    <PrimaryButton label={"注文する"} onClick={order} />
            </div>

        </select>
    )


}

export default OrderConfirm