import React, { useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

import Button from "components/CustomButtons/Button.js";
import PaypalButton from "../PaypalButton";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import Home from "@material-ui/icons/Home";
import Apartment from "@material-ui/icons/Apartment";
import Mail from "@material-ui/icons/Mail";
import LocationCity from "@material-ui/icons/LocationCity";

const initialAddress = {
  Name: {
    name: "Name",
    value: "",
    required: true,
    icon: <Person />,
  },
  Email: {
    name: "Email",
    value: "",
    required: true,
    icon: <AlternateEmail />,
  },
  AddresLine1: {
    name: "First Line Of Address",
    value: "",
    required: true,
    icon: <Home />,
  },
  AddresLine2: {
    name: "Second Line Of Address",
    value: "",
    required: false,
    icon: <Apartment />,
  },
  PostCode: {
    name: "Post Code",
    value: "",
    required: true,
    icon: <Mail />,
  },
  Town: {
    name: "Town",
    value: "",
    required: true,
    icon: <LocationCity />,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Address", "Review and Pay", "Receipt"];
}

export default function HorizontalNonLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState(initialAddress);
  const steps = getSteps();

  const onChange = (e) => {
    console.log();
    let addressTemp = address;
    addressTemp[e.target.name].value = e.target.value;
    setAddress(addressTemp);
    console.log(address);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 address={address} onChange={onChange} />;
      case 1:
        return <Step2 cart={props.cart} address={address} />;
      case 2:
        return <Step3 />;
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ backgroundColor: "#f1f1f1" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {getStepContent(activeStep)}
          <div>
            <div style={{ float: "left" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                style={{ float: "left" }}
              >
                Back
              </Button>
            </div>
            {activeStep === 0 && (
              <div style={{ float: "left" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  style={{ float: "left" }}
                >
                  Next
                </Button>
              </div>
            )}{" "}
            {activeStep === 1 && (
              <div style={{ float: "left" }}>
                <PaypalButton
                  className={classes.button}
                  style={{ float: "left" }}
                  client={props.CLIENT}
                  env={props.ENV}
                  commit={true}
                  currency={"GBP"}
                  total={1}
                  onSuccess={() => {
                    props.onSuccess();
                    handleNext();
                  }}
                  onError={props.onError}
                  onCancel={props.onCancel}
                />
              </div>
            )}
            <div style={{ clear: "all" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

HorizontalNonLinearStepper.propTypes = {
  CLIENT: PropTypes.object.isRequired,
  ENV: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onCancel: PropTypes.func,
  cart: PropTypes.object,
};
