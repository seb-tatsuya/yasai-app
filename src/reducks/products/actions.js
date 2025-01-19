export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsActin = (products) => {
    // プレーンなオブジェクト
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
};

export const DELETE_PRODUCTS = "DELETE_PRODUCTS";
export const deleteProductsActin = (products) => {
    // プレーンなオブジェクト
    return {
        type: "DELETE_PRODUCTS",
        payload: products
    }
};