import React, { useCallback, useState } from "react";
import { makeStyles, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core";
import logo from '../../assets/img/icons/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import HeaderMenus from "./HeaderMenus";
import { ClosableDrawer } from ".";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        margin: '0 0 0 auto' // 右よせ
    }
})

const Header = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const isSinedIn = getIsSignedIn(selector)

    const [open , setOpen] = useState();

    const handleDrawerToggle = useCallback((event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setOpen(!open)
    }, [setOpen, open]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}> {/*position=fixedでheader部分を固定する */}
                <Toolbar className={vlasses.toolBar}>
                    <img 
                    src={logo} alt="EC logo" width="128px"
                    onClick={() => dispatch(push('/'))} // headerロゴをクリックするとホーム画面に遷移
                    />
                    { isSinedIn && (
                        <div className={classes.iconButtons}> {/*右よせ */}
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
                        </div>
                    )}
                </Toolbar>

            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle}/>

        </div>
    )
}

export defalut Header;