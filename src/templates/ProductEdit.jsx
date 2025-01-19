import React , {useCallback , useEffect, useState} from "react";
import {PrimaryButton, SelectBox ,TextInput} from "../components/UIkits";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import ImageArea from "../components/products/ImageArea";
import { Storage } from "../../firebasse/index";
import { db } from "../firebase/index";
import SetSizeArea from "../components/products/SetSizeArea";

const ProductEdit = () => {
    const dispatch = useDispatch();

    // URLのID部分を取得する為スラッシュで分割
    let id = window.location.pathname.split('/product/edit')[1];
    console.log("Before split /" , id);

    // さらにスラッシュとIDを分割しID部分のみ取得
    if(id !== ""){
        id = id.split('/')[1]
        console.log("After split /" , id)
    }

    // 各入力値の初期値
    const [name , setName] = useState(""),
            [discliption , setDiscliption] = useState(""),
            [category , setCategory] = useState(""),
            [categorys , setCategorys] = useState([]),
            [gender , setGender] = useState(""),
            [images , setImages] = useState([]),
            [price , setPrice] = useState(""),
            [sizes , setSizes] = useState([]);
            
    
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

    const genders = [
        {id: "all" , name: "すべて"},
        {id: "male" , name: "メンズ"},
        {id: "female" , name: "レディース"}
    ]

    // コンポーネントディドゥマウント　ライフサイクルメソッド
    useEffect(() => {
        if(id !== ""){
            db.collection('products').doc(id).get()
            .then(snapshot => {
                const data = snapshot.data()
                setName(data.name);
                setImages(data.Images);
                setGender(data.gender);
                setDiscliption(data.discliption);
                setCategory(data.category);
                setPrice(data.price);
                setSizes(data.sizes);
            })
        }

    }, [id]); // ディドゥマウントは第二引数にはからの配列を渡す仕様

    // categorysの値をDBから取得する
    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
        .then(snapshots => {
            const list = []
            snapshots.forEach(snapshot => {               
                const date = snapshot.date()
                list.push({
                    id: date.id,
                    name: date.name
                })
            })
            setCategorys(list)
        })
    },[]);

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
            <SetSizeArea sizes={sizes} setSizes={setSizes}/>
            <div className="nodule-space--medium" />
            <dev className="center">
                <PrimaryButton
                    label={"商品情報を保存"}
                    onClick={() => dispatch(saveProduct(id , name , discliption , category , gender , price , images, sizes))} // firebase.Ruhr
                />

            </dev>
        </section>
    )
}

export default ProductEdit