import { Divider, TextField } from "@material-ui/core";
import React from "react";
import { TextDetail } from "../UIkits";

// 注文日時の成形
const dateTimeToString = (date) => { // date型の引数
    return date.getFullYear() + "-"
            + ('00' + (date.getMonth()+1)).slice(-2) + "-"
            + ('00' + (date.getDate())).slice(-2) + " "
            + ('00' + (date.getHours())).slice(-2) + ":"
            + ('00' + (date.getMinutes())).slice(-2) + ":"
            + ('00' + (date.getSeconds())).slice(-2)
        }

// 発送予定日の成形
const dateToString = (date) => { // date型の引数
    return date.getFullYear() + "-"
            + ('00' + (date.getMonth()+1)).slice(-2) + "-"
            + ('00' + (date.getDate())).slice(-2)
}

// 注文履歴画面
const OrderHistoryItem = (props) => {
    const order = props.order;
    const price = "¥" + order.amount.toLocaleStoring();
    const orderedDateTime = dateTimeToString(order.updated_at.toDate()); // timestamp型に変換して格納
    const sippingDate = dateToString(order.sippingDate.toDate());

    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={order.id}/> {/**textDetailはlaelとvalueをいい感じに表示してくれる */}
            <TextDetail label={"注文日時"} value={orderedDateTime}/>
            <TextDetail label={"発送予定日"} value={sippingDate}/>
            <TextDetail label={"注文金額"} value={price}/>

            {order.products.length > 0 && (
                <OrderProducts products={order.products} />
            )}
            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    )
}
export default OrderHistoryItem