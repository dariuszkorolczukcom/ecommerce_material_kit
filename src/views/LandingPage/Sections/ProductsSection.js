import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function ProductsSection(props) {
  let isLoading = props.isLoading;
  let categorisedProducts = props.categorisedProducts;

  const classes = useStyles();
  const imageClasses = classNames(classes.imgCard);
  return (
    <div className={classes.section}>
      {!isLoading &&
        categorisedProducts !== null &&
        categorisedProducts.map((category) => {
          if (category.products.length > 0) {
            return (
              <React.Fragment key={category.ID}>
                <h2
                  className={classes.title}
                  id={category.name.replace(/\s/g, "")}
                >
                  {category.name}
                </h2>
                <div>
                  <GridContainer>
                    {category.products.map((product) => {
                      return (
                        <GridItem xs={12} sm={6} md={4} key={product.ID}>
                          <Card plain>
                            <Link
                              to={"product/" + product.ID}
                              style={{ textDecoration: "none" }}
                            >
                              <GridItem
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.itemGrid}
                              >
                                <img
                                  src={
                                    product.images[0] &&
                                    process.env.REACT_APP_S3_BUCKET +
                                      product.images[0].name
                                  }
                                  alt="..."
                                  className={imageClasses}
                                />
                              </GridItem>
                            </Link>
                            <h4 className={classes.cardTitle}>
                              {product.name}
                              <br />£{(product.price / 100).toFixed(2)}
                            </h4>
                            <CardBody>
                              <p className={classes.description}>
                                {product.shortDescription}
                              </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                              <a href={props.ebayLink}>
                                <Button
                                  color="primary"
                                  className={classes.margin5}
                                >
                                  Buy on ebay
                                </Button>
                              </a>
                              <Button
                                color="primary"
                                className={classes.margin5}
                                onClick={(e) =>
                                  props.handleAddItemToCart(e, product.ID)
                                }
                              >
                                Add to cart
                              </Button>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      );
                    })}
                  </GridContainer>
                </div>
              </React.Fragment>
            );
          }
        })}
    </div>
  );
}

ProductsSection.propTypes = {
  ebayLink: PropTypes.string,
  categorisedProducts: PropTypes.array,
  isLoading: PropTypes.bool,
  handleAddItemToCart: PropTypes.func,
};
