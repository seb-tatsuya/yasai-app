import React , {useCallback , useState} from "react";
import {PrimaryButton, SelectBox ,TextInput} from "../components/UIkits";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import ImageArea from "../components/products/ImegeArea";
import { Storage } from "../../firebasse/index";

const ProductEdit = () => {

    const dispatch = useDispatch();

    // 各入力値の初期値
    const [name , setName] = useState(""),
            [discliption , setDiscliption] = useState(""),
            [category , setCategory] = useState(""),
            [gender , setGender] = useState(""),
            [price , setPrice] = useState(""),
            [images , setImages] = useState([]);
    
    // useCallback関数でメモ化してパフォーマンス向上
    // 商品名メモ化
    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

    // 商品説明メモ化
    const inputDiscliption = useCallback((event) => {
        setDiscliption(event.target.value)
    },[setDiscliption]);

    // 価格メモ化
    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    },[setPrice]);

    const categories = [
        {id: "tops" , name: "トップス"},
        {id: "shirt" , name: "シャツ"},
        {id: "pants" , name: "パンツ"}
    ]

    const genders = [
        {id: "all" , name: "すべて"},
        {id: "male" , name: "メンズ"},
        {id: "female" , name: "レディース"}
    ]

    return(
        <section>
            <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container"/>
            <ImageArea images={images} setImages={setImages} />
            <TextInput
                fullwidth={true} label={"商品名"} multiline={false} required={true}
                rows={1} value={name} type={"text"} onChange={inputName}
            />
            <div className="nodule-space--medium" />
            <TextInput
                fullwidth={true} label={"商品説明"} multiline={true} required={true}
                rows={5} value={discliption} type={"text"} onChange={inputDiscliption}
            />
            <div className="nodule-space--medium" />
            <SelectBox>
                label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
            </SelectBox>
            <div className="nodule-space--medium" />
            <SelectBox>
                label={"性別"} required={true} options={genders} select={setGender} value={gender}
            </SelectBox>
            <div className="nodule-space--medium" />
            <TextInput
                fullwidth={true} label={"価格"} multiline={false} required={true}
                value={price} type={"number"} onChange={inputPrice}
            />
            <div className="nodule-space--medium" />
            <dev className="center">
                <PrimaryButton
                    label={"商品情報を保存"}
                    onClick={() => dispatch(saveProduct(name , discliption , category , gender , price , images))} // firebase.Ruhr
                />

            </dev>
        </section>
    )
}

export default ProductEdit