import React , {useState, useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import {ImageSwaiper, SizeTable} from "../components/products"
import { db , FierbaseTimestamp, FirebaseTimestamp} from "../firebase/index"
import { addProductToCart } from "../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
    sliderBox:{
        [theme.breakpoints.down('sm')]:{
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]:{
            margin: '0 auto',
            height: 400,
            width: 400
        }
    },
    default:{
        [theme.breakpoints.down('sm')]:{
            margin: '0 auto 24px auto',
            height: 'auto',
            width: 320
        },
        [theme.breakpoints.up('sm')]:{
            margin: '0 auto',
            height: 'auto',
            width: 400
        }
    },
    price:{
        fontSize: 36
    }
}));

const returnCodeToBr = (text) => {
    if (text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/¥?¥n/g, <br/>)); // 改行コードをパースする
    }
};

const ProductDetail = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const path = selector.router.location.pathname;
    const id = path.split('/product/')[1];
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        db.collection('products').doc().get()
        .then(doc => {
            const data = doc.data();
            setProduct(data)
        })
    },[]);

    const addProduct = useCallback((selectedSize) => {
        const timestamp = FirebaseTimestamp.now();
        dispatch(addProductToCart({ // DB設計はuserの中にcartを持たせる為、ユーザー毎にカートがあるイメージ
            added_at: timestamp,
            description: product.description,
            gender: product.gender,
            images: product.images,
            name: product.name,
            price: product.price,
            productId: product.productId,
            quantity: product.quantity,
            size: product.size
        }))
    },[product]); //子要素に関数を渡したい場合はコールバック関数をメモ化

    return (
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwaiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>{product.price.toLocaleString()}</p>
                        <div className="module-spacer--small"/>
                        <SizeTable addProduct={addProduct} sizes={product.sizes} />
                        <div className="module-spacer--small"/>
                        <p>{returnCodeToBr(product.description)}</p> {/*HTMLタグの改行コードを生成 */}
                    </div>
                </div>
            )}
        </section>
    )
};

export default ProductDetail