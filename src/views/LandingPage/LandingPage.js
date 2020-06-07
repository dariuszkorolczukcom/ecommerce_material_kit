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
      <Parallax filter image={require("assets/img/soaps/bg1.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Improve Your Health And Enjoy Your Bath.
              </h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
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
