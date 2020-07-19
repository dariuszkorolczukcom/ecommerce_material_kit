import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/icons
// import Chat from "@material-ui/icons/Chat";
// import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import InfoArea from "components/InfoArea/InfoArea.js";

import notTestedOnAnimals from "assets/img/notTestedOnAnimals.png";
import veganFriendly from "assets/img/veganFriendly.png";
import pure from "assets/img/pure.png";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function InfoSection() {
  const classes = useStyles();
  const imageClasses = classNames(classes.imgRounded, classes.imgFluid);
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Our Products are</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <img src={pure} alt="pure" className={imageClasses} />
            <p className={classes.description}>
              You can write here details about one of your team members. You can
              give more details about what they do. Feel free to add some for
              people to be able to follow them outside the site.
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <img
              src={notTestedOnAnimals}
              alt="notTestedOnAnimals"
              className={imageClasses}
            />
            <p className={classes.description}>
              You can write here details about one of your team members. You can
              give more details about what they do. Feel free to add some for
              people to be able to follow them outside the site.
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <img
              src={veganFriendly}
              alt="veganFriendly"
              className={imageClasses}
            />
            <p className={classes.description}>
              You can write here details about one of your team members. You can
              give more details about what they do. Feel free to add some for
              people to be able to follow them outside the site.
            </p>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
