/*eslint-disable*/
import React, { useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, ShoppingCart } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  let isLoading = props.isLoading;
  let categorisedProducts = props.categorisedProducts;

  const dropdownList = [];

  const createDropdown = () => {
    props.categorisedProducts.map((category) => {
      if (category.products.length > 0) {
        dropdownList.push(
          <a
            key={category.ID}
            href={"/#" + category.name.replace(/\s/g, "")}
            className={classes.dropdownLink}
          >
            {category.name}
          </a>
        );
      }
    });
  };
  useEffect(() => {
    if (!props.isLoading && props.categorisedProducts !== null)
      createDropdown();
  }, [props.isLoading, props.categorisedProducts]);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button href="checkout" color="transparent" className={classes.navLink}>
          <ShoppingCart className={classes.icons} /> Checkout
        </Button>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}

HeaderLinks.propTypes = {
  categorisedProducts: PropTypes.array,
  isLoading: PropTypes.bool,
};
