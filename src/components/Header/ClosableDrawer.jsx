import { Divider, Drawer, ListItem, ListItemIcon, ListItemText, makeStyles, TextField } from "@material-ui/core";
import { AddCircleIcon, ExitToAppIcon, Filter } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signOut} from "../../reducks/users/operations"
import { db } from "../../firebase";

const useStyles = makeStyles((theme) => ({
    drawer:{
        [theme.breakpoints.up('sm')]:{
            flexShrink: 0,
            width: 256
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerParper: {
        width: 256
    },
    searchField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
}));

const ClosableDrawer = (props) => {
    const  classes = useStyles();
    const {container} = props;
    const dispatch = useDispatch();

    const [keyword , setKeyword] = useState("");

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    },[setKeyword]);

    // drawerが開いてメニューを選択した時の処理
    selectMenu = (event , path) => { // pathは配列のvalueの値が渡される
        dispatch(push(path))
        props.onClose(event) //drawerを閉じる
    }

    // ドロワーメニューをクリックした時の挙動
    const [filters, setFilters] = useState([
        {func: selectMenu, label: "すべて" , id: "all" , value: "/"}　,
        {func: selectMenu, label: "メンズ" , id: "male" , value: "/?gender=male"}　,
        {func: selectMenu, label: "レディース" , id: "female" , value: "/?gender=female"}　,
    ])

    // メニュー
    const menus = [
        {func: selectMenu, label: "商品登録" , icon: <AddCircleIcon /> , id: "register" , value: "/product/edit"}　,
        {func: selectMenu, label: "注文履歴" , icon: <HistoryIcon /> , id: "history" , value: "/order/history"} ,
        {func: selectMenu, label: "プロフィール" , icon: <PersonIcon /> , id: "profile" , value: "/user/mypage"}    
    ];

    // 
    useEffect(() => {
        db.collection('categories')
        .orderBy('order','asc')
        .get()
        .then(snapshots => {
            const list = []
            snapshots.forEach(snapshot => {
                const category = snapshot.date()
                list.push({func: selectMenu, label: category.name , id: category.id , value: `/?category=${category.id}`})
            })
            setFilters(prevState => [...prevState, ...list]) // prevStateは更新前の状態
        })
    },[])

    return (
        <nav className={classes.drawer}>
            <Drawer 
             conteiner={container} //コンテナー
             variant="temporary" // 閉じたり出したりする
             anchor="right" // どこから出すか
             open={props.open} // trueかfalseか
             onClick={(e) => props.onClick(e)} // クローズする条件
             classes={{paper: classes.drawerPaper}} 
             ModalProps={{keepMounted: true}} // スマホ表示のパフォーマンス
             >
                <div onClose={(event) => props.onClose(event)} onKeyDown={(event) => props.onClose(event)}> {/*リスト項目をキーボード操作で選択した時にDrawerを閉じる */}
                    <div className={classes.searchField}>
                        <TextField // 検索ボックス
                            fullWidth={false} label={"キーワードを入力"} multiline={false}
                            onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}>

                        </TextField>

                    </div>
                    <Divider />
                    <List>
                        {menus.map( menu => (
                            <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primay={menu.label}/>
                            </ListItem>
                        ))}
                        <ListItem button key={logut} onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemIcon primary={"Logout"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filters.id} onClick={(e) => filter.func(e,filter.value)}>  {/**funcはselectMenu */}
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

        </nav>
    )

}

export default ClosableDrawer