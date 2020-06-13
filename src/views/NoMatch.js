import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

const useStyles = makeStyles(styles);

export default function NoMatch() {
  const classes = useStyles();

  return (
    <div>
      <Parallax filter image={require("assets/img/NotFound.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>404</h1>
              <p>The address you are looking for does not exist...</p>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}
