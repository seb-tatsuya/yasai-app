import { Divider, ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../UIkits";

const useStayles = makeStyles({
    List: {
        background: '#fff',
        height: 'auto'
    },
    image:{
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
})

// 注文詳細ページ
const OrderedProducts = () => {
    const classes = useStayles();
    const dispatch = useDispatch();
    const products = props.products;

    const goToproductDetail = useCallback((id) => {
        dispatch(push('/product/'+id))
    },[])

    return (
        <List>
            {products.map(product => (
                <>
                    <ListItem className={classes.List} key={product.id}>
                        <ListItemAvatar>
                            <img className={classes.images} 
                                src={product.images[0].path}
                                alt={"Ordered Product"}
                            />
                        </ListItemAvatar>
                        <div className={classes.text}>
                            <ListItemText primary={product.name}
                                            secondary={"サイズ：" + product.size} />
                            <ListItemText primary={"¥" + product.price.toLocaleStoring()} />
                        </div>
                        <PrimaryButton lavel={"商品詳細を見る"} onClikc={() => goToproductDetail(product.id)} />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    )

}

export default OrderedProducts