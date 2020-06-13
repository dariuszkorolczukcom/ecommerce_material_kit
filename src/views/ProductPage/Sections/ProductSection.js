import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { AddShoppingCart } from "@material-ui/icons";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection(props) {
  let product = props.product;
  let isLoading = props.isLoading;

  const classes = useStyles();
  const imageClasses = classNames(classes.imgCard);
  return (
    <div className={classes.section}>
      {!isLoading && product !== null && (
        <GridContainer>
          <GridItem xs={12} sm={6} className={classes.itemGrid}>
            <img
              src={process.env.REACT_APP_S3_BUCKET + product.images[0].name}
              alt="..."
              className={imageClasses}
            />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <Card plain>
              <h4 className={classes.cardTitle}>
                {product.name}
                <br />£{product.price}
              </h4>
              <CardBody>
                <p className={classes.description}>
                  {product.shortDescription}
                </p>
                <p className={classes.description}>{product.description}</p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <a href={props.ebayLink}>
                  <Button color="primary" className={classes.margin5}>
                    Buy on ebay
                  </Button>
                </a>
                <Button
                  color="primary"
                  className={classes.margin5}
                  onClick={(e) => props.handleAddItemToCart(e, product.ID)}
                >
                  <AddShoppingCart className={classes.icons} />
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
}

ProductSection.propTypes = {
  ebayLink: PropTypes.string,
  product: PropTypes.object,
  isLoading: PropTypes.bool,
  handleAddItemToCart: PropTypes.func,
};
