import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// http hook
import { useHttpGet } from "../../hooks/http";

// router hook
import { useParams } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";

const useStyles = makeStyles(styles);

export default function ProductPage(props) {
  const classes = useStyles();

  let { id } = useParams();
  const [isLoading, fetchedData] = useHttpGet("product/" + id, [id]);
  let product = null;

  if (fetchedData !== null) product = fetchedData.data;

  return (
    <div>
      <Parallax
        small
        filter
        image={
          product
            ? process.env.REACT_APP_S3_BUCKET + product.images[0].name
            : ""
        }
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12}>
              <h1 className={classes.title}>{product ? product.name : ""}</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <div className={classes.container}>
          <ProductSection
            ebayLink={props.ebayLink}
            isLoading={isLoading}
            product={product}
            handleAddItemToCart={props.handleAddItemToCart}
          />
        </div>
      </div>
    </div>
  );
}

ProductPage.propTypes = {
  ebayLink: PropTypes.string,
  handleAddItemToCart: PropTypes.func,
};
