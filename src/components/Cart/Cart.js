import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { ShoppingCart } from "@material-ui/icons";
// core components
import CustomCart from "./CustomCart/CustomCart.js";
import Badge from "@material-ui/core/Badge";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function Cart(props) {
  const classes = useStyles();

  return (
    <CustomCart
      cart={props.cart}
      handleAddItemToCart={props.handleAddItemToCart}
      handleDeleteItemFromCart={props.handleDeleteItemFromCart}
    >
      {Object.keys(props.cart).length > 0 ? (
        <Badge badgeContent={Object.keys(props.cart).length} color="error">
          <ShoppingCart className={classes.icons} />
        </Badge>
      ) : (
        <ShoppingCart className={classes.icons} />
      )}
    </CustomCart>
  );
}
Cart.propTypes = {
  cart: PropTypes.object,
  handleAddItemToCart: PropTypes.func,
  handleDeleteItemFromCart: PropTypes.func,
};
