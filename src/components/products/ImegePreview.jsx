import React from "react";

// プレビュー画像表示コンポーネント
const ImagePreview = () => {
    return (
        <dev className="p-media__thumb" onClick={() => props.delete()} > {/*このCSSクラスは画像を１：１に切り分ける */}
            <img alt="プレビュー画像" src={props.path} />

        </dev>
    )
}

export default ImagePreview