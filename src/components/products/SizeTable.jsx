import React from "react";
import { TableContainer } from "@material-ui/core/TableContainer";
import { IconButton, makeStyles, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartIcon";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderIcon";

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        widows: 48
    }
});

const SizeTable = (props) => {
    
    const classes = useStyles();

    const sizes = props.sizes;

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map(size => (
                            <TableRow key={size.size}>
                                <TableCell component="th" scope="row">
                                    {size.size}
                                </TableCell>
                                <TableCell>
                                    残り{size.quantity}点
                                </TableCell>
                                <TableCell　className={classes.iconCell}>
                                    {size.quantity > 0 ? (
                                        <IconButton onClick={() => props.addProduct(size.size)}>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>売り切れ</div>
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SizeTable


