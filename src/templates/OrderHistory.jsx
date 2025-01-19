import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersHistory } from "../reducks/users/selectors";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { OrdersHistoryItem } from "../components/products/index"

const useState = makeStyles((theme) => ({
    orderLine: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('md')]: { // breakpointsは異なるデバイスや画面サイズに応じてレスポンシブデザインを最適化する
            width: '100%'
        },
        [theme.breakpoints.up('md')]: { // 小型デスクトップより大きいディスプレイの場合は幅768に設定
            width: 768
        }
    }

}));

// 注文履歴情報
const OrderHistory = () => {
    const classes = useState();
    const dispatch = useDispatch(); // reactコンポーネントからアクションをdispatchする
    const selector = useSelector((state) => state); // storeの状態を参照する
    const orders = getOrdersHistory(selector); // selectorの中の関数を呼び出し

    useEffect( () => { // orderHistoryがマウントされたら
        dispatch(fetchOrdersHistory()) // operationのfetchOrdersHistoryを呼び出す
    },[])

    return (
        // 関連するコンテンツをグループ化
        <section className="c-section-wrapin">
            <List className={classes.orderLine}>
                {orders.length > 0 && (
                    orders.map(order => <OrdersHistoryItem order={order} key={order.id} />)
                )}

            </List>
        </section>
    )

}
export default OrderHistory