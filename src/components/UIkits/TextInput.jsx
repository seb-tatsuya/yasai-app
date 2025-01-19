import React from "react";
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
    return(
        <TextField
         fullWidth={props.fullWidth} // 幅（true:最大 false:程よい）
         label={props.label}
         margin="dense"
         multiline={props.multiline} // 複数行（true:OK false:NG）
         rows={props.rows} // 複数行の場合の行数最初に見せるかを指定
         required={props.required} //必須項目(true:必須 false:任意)
         value={props.value} // 現在の値
         type={props.type} // テキストボックスのtype（パスワード、emailなど）
         onChange={props.onChange} // TextFirldの値に変更があった場合に親コンポーネントへ変更を伝えるための関数
        />
    )

}

export default TextInput