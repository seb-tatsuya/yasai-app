import { Card, CardContent, CardMedia, makeStyles, MenuItem, Typography } from "@material-ui/core";
import React from "react";
import NoImage from '../../assets/img/src/no-profile.png'
import { push } from "connected-react-router";
import { MoreVert } from "@material-ui/icons";
import { deleteProduct } from "../../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
    root:{
        [theme.breakpoints.down('sm')]:{ // スマホ表示以上の時に幅がsm表示で576pxの場合に適用する
            margin: 8,
            width: 'calc(50% - 16px)' // 要素の幅を決める（スマホ表示の時は）
        },
        [theme.breakpoints.up('sm')]:{
            margin: 16,
            whdth: 'calc(33.333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16px 8px',
        textAlign: 'left',
        '&:last-chlid':{
            paddingBottom: 16
        }
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    price: {
        color: theme.palette.secondary,
        fontSize: 16
    }
}));

const ProductCard = (props) => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null); // 初期値NULL

    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const images = (props.images.length > 0) ? props.images : [{path: NoImage}];
    const price = props.price.toLocaleString(); // DBに入っている価格は数値型は円表記のコンマがないのでここで作成

        return (
            <Card className={classes.root}>
                <CardMedia 
                    className={classes.media}
                    image={images[0].path} // 複数画像の最初の画像パスを取得
                    title=""
                    onClick={() => dispatch(push('/product/' + props.id))}
                />
                <CardContent className={classes.content}>
                    <div onClick={() => dispatch(push('/product/' + props.id))}>
                        <Typography color="textSecondary" component="p">
                            {props.name} {/*商品名 */}
                        </Typography>
                        <Typography className={classes.price} component="p">
                            ¥{price}
                        </Typography>
                    </div>
                    <IconButton onClick={handleClick}>
                        <MOreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            dispatch(push('/product/edit/' + props.id))
                        }}>
                            編集する
                        </MenuItem>
                        <MenuItem　onClick={() => {
                            dispatch(deleteProduct(props.id));
                            handleClose()
                        }}>
                            削除する
                        </MenuItem>

                    </Menu>
                </CardContent>
            </Card>
        )

}
export default ProductCard