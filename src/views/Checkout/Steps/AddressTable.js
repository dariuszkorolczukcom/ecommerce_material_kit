import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
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

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {Object.keys(props.address).map((key) => {
            return (
              <TableRow key={key}>
                <TableCell align="left">{props.address[key].name}</TableCell>
                <TableCell align="right">{props.address[key].value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProductsTable.propTypes = {
  address: PropTypes.object,
};
