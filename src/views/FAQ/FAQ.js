import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// http hook
import { useHttpGet } from "../../hooks/http";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage() {
  const classes = useStyles();
  const [isLoading, fetchedData] = useHttpGet("faq", []);

  let faq = null;

  if (fetchedData !== null) faq = fetchedData.data;

  return (
    <div>
      <Parallax small filter image={require("assets/img/backGround6.jpg")} />
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Frequently Asked Questions</h1>
              {!isLoading &&
                faq !== null &&
                faq.map((q) => {
                  return (
                    <>
                      <h2 className={classes.title}>{q.question}</h2>
                      <p>{q.answer}</p>
                      <br />
                    </>
                  );
                })}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
