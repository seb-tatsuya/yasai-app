import React, { useEffect } from "react";
import { ProductCard } from "../components/products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/users/selectors";

const ProductList = () => {

    // opelationファイルで作る関数をuseEffectの中でdispatchしたい
    const dispatch = useDispatch();
    const selector = useSelector((state) => state); // storeの状態がすべて格納されている
    const products = getProducts(selector); // productsには商品情報が格納されている

    // URLのqueryパラメーターを取得
    const query = selector.router.location.search;
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

    // initialstateのproductのリストにDBから取得した値を格納していく
    useEffect( () => (
        dispatch(fetchProducts(gender, category))
    ),[query]);

    return (
        <section className="c-selection-wrapin">
            <div className="p-grid__row">
                {products.length > 0 && ( // productsの配列の長さをチェック
                    products.map(product => {
                        <ProductCard key={product.id} id={product.id} name={product.name}
                        images={product.images} price={product.price}
                        />
                    })
                )}
            </div>
        </section>
    )

}

export default ProductList