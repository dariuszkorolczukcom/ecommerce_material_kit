import React, { useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Store, Close } from "@material-ui/icons";
import Button from "components/CustomButtons/Button.js";

import ProductsTable from "./ProductsTable";
const useStyles = makeStyles({
  list: {
    minWidth: "30%",
    maxWidth: "100%",
  },
  fullList: {
    width: "auto",
  },
});

export default function CustomCart(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div role="presentation">
      <Button
        onClick={toggleDrawer(anchor, false)}
        color="transparent"
        className={classes.navLink}
      >
        <Close className={classes.icons} />
      </Button>
      <ProductsTable
        cart={props.cart}
        handleAddItemToCart={props.handleAddItemToCart}
        handleDeleteItemFromCart={props.handleDeleteItemFromCart}
      />
      <Link
        to="checkout"
        onClick={toggleDrawer(anchor, false)}
        className={classes.navLink}
      >
        <Button color="success">
          <Store className={classes.icons} />
          Go To Checkout
        </Button>{" "}
      </Link>
    </div>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer("right", true)} color="transparent">
        {props.children}
      </Button>
      <Drawer
        variant="persistent"
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
}
CustomCart.propTypes = {
  children: PropTypes.object,
  cart: PropTypes.object,
  handleAddItemToCart: PropTypes.func,
  handleDeleteItemFromCart: PropTypes.func,
};
