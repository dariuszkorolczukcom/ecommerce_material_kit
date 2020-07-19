/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
      <NavLink
          to="/checkout"
          style={{
            color: "white",
          }}
        >
          <Button color="transparent" className={classes.navLink}>
          Checkout
        </Button>
        </NavLink>
      </ListItem>
    </List>
  );
}

