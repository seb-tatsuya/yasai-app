import { Divider, IconButton, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux"
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase/index";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles({
    list: {
        height: 128,
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        widows: 96
    },
    text: {
        widows: '100%'
    }
})

const CartListItem = () => {
    const selector = useSelector((state) => state);
    const classes = useStyles();
    const image = props.product.images[0].path;
    const name = props.product.name;
    const price = props.product.price.toLocaleString();
    const size = props.product.size;

    const removePrductFromCart = (id) => {
        return db.collection('users').doc(id).collection('cart').doc(id)
                .delete()
    }

    return (
        <>
            <ListItem className={classes.list}>
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt=""商品画像/>
                </ListItemAvatar>
                <div className={classes.text}>
                    <ListItemText primary={name}
                    secondary={"サイズ:" + size} />
                    <ListItemText primary={"¥ :" + price} />
                </div>
                <IconButton onClick={() => removePrductFromCart(props.product.cartId)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default CartListItem