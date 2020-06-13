import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import Stepper from "./Steps/Stepper";

const useStyles = makeStyles(styles);

const Checkout = (props) => {
  const classes = useStyles();
  const onSuccess = (payment) => console.log("Successful payment!", payment);

  const CLIENT = {
    sandbox:
      "AavNFzhxitJJsiMgUfzBCOQyjgrm_RZ5qZKnBH3wgvavZlPr6Zr54srbXha_FKPuwIEdkKPPlr1HGQtN",
    production:
      "AUzJFQ5BQN-riXPv6W7AscnvsxoZLR_MJmf7vql9qvG_eliqjc3T_15aHmYG866VXUQvQpsuEnq_BXdu",
  };

  const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

  const onError = (error) =>
    console.log("Erroneous payment OR failed to load script!", error);

  const onCancel = (data) => console.log("Cancelled payment!", data);

  return (
    <div>
      <Parallax small filter image={require("assets/img/backGround4.jpg")} />
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Stepper
                cart={props.cart}
                CLIENT={CLIENT}
                ENV={ENV}
                total={1}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

Checkout.propTypes = {
  cart: PropTypes.object,
};
