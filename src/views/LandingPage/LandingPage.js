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

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import InfoSection from "./Sections/InfoSection.js";
import ContactSection from "./Sections/ContactSection.js";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();

  return (
    <div>
      <Parallax filter image={require("assets/img/backGround3.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Enjoy Your Bath.</h1>
              <h4>
                My money{"'"}s in that office, right? If she start giving me
                some bullshit about it ain{"'"}t there, and we got to go
                someplace else and get it, I{"'"}m gonna shoot you in the head
                then and there. Then I{"'"}m gonna shoot that bitch in the
                kneecaps, find out where my goddamn money is. She gonna tell me
                too. Hey, look at me when I{"'"}m talking to you, motherfucker.
                You listen: we go in there, and that nigga Winston or anybody
                else is in there, you the first motherfucker to get shot. You
                understand?
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <div className={classes.container}>
          <InfoSection />
          {props.children}
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  children: PropTypes.object,
};
