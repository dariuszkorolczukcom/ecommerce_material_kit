import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage() {
  const classes = useStyles();

  return (
    <div>
      {/* <Parallax small filter image={require("assets/img/profile-bg.jpg")} /> */}
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h1 className={classes.title}>Frequently Asked Questions</h1>
                <h2 className={classes.title}>Our Products are?</h2>
                <p>
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn
                  {"'"}t scroll to get here. Add a button if you want the user
                  to see more.
                </p>
                <br />
                <h2 className={classes.title}>Our Products are?</h2>
                <p>
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn
                  {"'"}t scroll to get here. Add a button if you want the user
                  to see more.
                </p>
                <br />
                <h2 className={classes.title}>Our Products are?</h2>
                <p>
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn
                  {"'"}t scroll to get here. Add a button if you want the user
                  to see more.
                </p>
                <br />
                <h2 className={classes.title}>Our Products are?</h2>
                <p>
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn
                  {"'"}t scroll to get here. Add a button if you want the user
                  to see more.
                </p>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
