import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// http hook
import { useHttpGet } from "../../../hooks/http";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  list: {
    minWidth: "30%",
    maxWidth: "100%",
  },
  fullList: {
    width: "auto",
  },
});

export default function ProductsTable(props) {
  const classes = useStyles();

  let cartPrice = 0;
  let products = [];

  const [isLoading, fetchedData] = useHttpGet("products", []);

  if (fetchedData !== null) products = fetchedData.data;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            Object.keys(props.cart).map((productID) => {
              let product = products.find(
                (product) => product.ID === parseInt(productID)
              );
              if (product !== undefined)
                cartPrice += props.cart[productID] * product.price;

              return (
                product !== undefined && (
                  <TableRow key={product.name}>
                    <TableCell component="th" scope="row">
                      <Avatar
                        alt={product.name}
                        src={
                          process.env.REACT_APP_S3_BUCKET +
                          product.images[0].name
                        }
                      />
                    </TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{props.cart[productID]}</TableCell>
                    <TableCell align="right">
                      £{props.cart[productID] * product.price}
                    </TableCell>
                  </TableRow>
                )
              );
            })}
          <TableRow>
            <TableCell>To pay: </TableCell>
            <TableCell>£{cartPrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProductsTable.propTypes = {
  cart: PropTypes.object,
};
