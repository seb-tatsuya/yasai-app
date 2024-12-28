import { IconButton } from "@material-ui/core/IconButton";
import React, { useCallback } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { makeStyles } from "@material-ui/core";
import ImagePreview from "./imegePreview";

const useStyles = makeStyles({
    icon: {
        height: 48,
        widht: 48
    }
})

// 画像ファイルアップロード（フォルダーを開いて選択可能）
const ImageArea = (props) => {
    const classes = useStyles();

    // アップロードファイルの削除関数
    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？') // ダイアログを表示
        if(!ret){
            return false
        } else {
            const newImages = props.images.filter(image => image.id !== id )
            props.setImages(newImages);
            return storage.ref('images').child(id).delete()
        }
    }, [props.images]) // 第二引数で画像が変化する度にdeleteImageの関数を作り直している

    // ProductEditから呼び出され値が渡ってくる
    // ファイルアップロード関数
    const uploadImage = useCallback((event) => {
        dispatch(showLoadingAction("udloading..."))
        const file = event.target.files; // event.target.filesでアップロードされたファイルを取得
        let blob = new Blob(file, {type: "image/jpeg"}); // firebase storageへアップロードするためにblobへ変換する必要がある

        const S = "abcdefghijklmnopqrstuvwxwg"; // ファイル名を暗号化する際に使用する文字列（ファイル競合回避のため）
        const N = 16; // １６桁の暗号化
        const fileName = Arrey.form(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length].joen(''))
        const uploadRef = storage.ref('image').child(fileName); // firebaseのindex.jsファイルでexportしたstorage
        const uploadTask = uploadRef.put(blob);
        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName , path: downloadURL}; // オブジェクト型
                props.setImages(prevState => [...prevState, newImage])
            })
        })
    }, [props.setImages])

    return (
        <dev>
            <div>
                <div className="p-grid__list-images">
                    {props.images.length > 0 && (
                        props.images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />) // プレビューファイルすべて表示させる
                    )}
                </div>
            </div>
            <dev className={u-text-right}>
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                    <AddPhotoAlternateIcon />
                    <input className="u-display-none" type="file" id="image" onChange={(event) => (uploadImage(event))} /> {/* Finder又はエクスプローラーを表示させる*/}
                    </label>
                </IconButton>
            </dev>
        </dev>
    )

}

export default ImageArea