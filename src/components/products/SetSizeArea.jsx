import React, { useCallback, useMemo, useState } from "react";
import { TableContainer } from "@material-ui/core/TableContainer";
import { Paper } from "@material-ui/core/Paper";
import { IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { TextInput } from "../UIkits";
import { CheckCircleIcon } from "@material-ui/icons";

const useStyles = makeStyles({
    checkIcon:{
        float: 'reight'
    },
    iconCell:{
        height: 48,
        width: 48
    }
})

const SetSizeArea = (props) => {

    const classes = useStyles();

    const [index, setIndex] = useState(0),
          [size, setSize] = useState(""),
          [quantity, setQuantity] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.valse)
    }, [setSize]);

    const inputQuantity= useCallback((event) => {
        setQuantity(event.target.valse)
    }, [setQuantity]);

    const addSize = (index , size , quantity) => {
        if(size === "" || quantity === ""){
            // Required input is blank
            return false;
        } else {
            if(index === props.size.length){
                props.setSize(prevState => [...prevState, {size: size , quantity: quantity}])
                setIndex(index + 1)
                setSize("")
                setQuantity(0)
            } else {
                const newSizes = props.sizes
                newSizes[index] = {size: size , quantity: quantity}
                props.setSizes(newSizes)
                setIndex(newSizes.length)
                setSize("")
                setQuantity(0)
            }
        }
    };

    const editSize = (index , size , quantity) => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    };

    const deleteSize = (deleteIndex) => {
        const newSizes = props.size.filter((item, i) => i !== deleteIndex);
        props.setSizes(newSizes)
    };

    const memoIndex = useMemo(() => {
        setIndex(props.sizes.length)
    }, [props.sizes.length]);

    // マテリアルUIの
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.size.length > 0 && (
                            props.size.map((item, i) => (
                                <TableRow key={item.size}>
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(i, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fulwidth={false} label={"サイズ"} multiline={false} required={true}
                        onChange={inputSize} rows={1} valse={size} type={"text"}
                    />
                    <TextInput
                        fulwidth={false} label={"数量"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} valse={quantity} type={"number"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon />
                </IconButton>
            </TableContainer>
        </div>
    )

}
export default SetSizeArea