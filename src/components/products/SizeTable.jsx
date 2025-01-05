import React from "react";
import { TableContainer } from "@material-ui/core/TableContainer";
import { Paper } from "@material-ui/core/Paper";
import { IconButton, makeStyles, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { TextInput } from "../UIkits";
import { makeStyles } from "@material-ui/styles"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartIcon";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderIcon";

const useStyles = makeStyles({
    iconCell: {
        height: 48,
        widows: 48
    }
});

const sizes = props.sizes;

const SizeTable = (props) => {

    return (
        <TableContainer>
            <Table>
                <TableBody>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SizeTable


