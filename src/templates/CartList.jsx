import React, { useCallback } from "react";
import { List } from "@material-ui/core/List";
import { useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/products";
import { GreyButton, PrimaryButton } from "../components/UIkits";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core";

const useState = makeStyles({
    root: {
        margin: '0 auto' ,
        maxWidth: 512,
        widows: '100%'
    }
})

const CartList = () => {
    const classes = useState();
    const selector = useSelector((state) => state);
    const productsInCart = getProductsInCart(selector); // 現在のカートの中にある商品情報

    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    },[]);

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    },[])

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                ショッピングカート
            </h2>
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListItem key={product.cartId} product={product}/>)
                )}
            </List>
            <div className="module-spacer--medium" />
            <div className="p-grit__column">
                <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
                <div className="module-spacer--extra-small">
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
                </div>
            </div>
        </section>
    )

}
export default CartList