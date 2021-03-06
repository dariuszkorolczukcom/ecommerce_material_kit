/*eslint-disable*/
import React, { useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import { Apps, Help } from "@material-ui/icons";
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
      console.log(category);
      if (category.products.length > 0) {
        dropdownList.push(
          <HashLink
            key={category.ID}
            to={"/#" + category.name.replace(/\s/g, "")}
            className={classes.dropdownLink}
            color="transparent"
          >
            {category.name}
          </HashLink>
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
        <CustomDropdown
          noLiPadding
          buttonText="Categories"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={dropdownList}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/faq" className={classes.navLink}>
          <Help className={classes.icons} /> FAQ
        </NavLink>
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  categorisedProducts: PropTypes.array,
  isLoading: PropTypes.bool,
};
