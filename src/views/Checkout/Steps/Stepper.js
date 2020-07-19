import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// http hook
import { useHttpGet } from "../../../hooks/http";
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
import useDeepCompareEffect from 'use-deep-compare-effect'


const initialAddress = {
  Name: {
    name: "Name",
    value: "",
    required: true,
    icon: <Person />,
    validate: (v) => {
      console.log(v.length > 0 && v.length < 50)
      return v.length > 0 && v.length < 50
    }
  },
  Email: {
    name: "Email",
    value: "",
    required: true,
    icon: <AlternateEmail />,
    validate: (email) => {
      console.log(email)
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase())
    }
  },
  AddresLine1: {
    name: "First Line Of Address",
    value: "",
    required: true,
    icon: <Home />,
    validate: (v) => {
      console.log(v.length > 0 && v.length < 50)
      return v.length > 0 && v.length < 50
    }
  },
  AddresLine2: {
    minLength:0,
    maxLength: 50,
    name: "Second Line Of Address",
    value: "",
    required: false,
    icon: <Apartment />,
    validate: (v) => {
      console.log(v.length > 0 && v.length < 50)
      return v.length > 0 && v.length < 50
    }
  },
  PostCode: {
    minLength:1,
    maxLength: 10,
    name: "Post Code",
    value: "",
    required: true,
    icon: <Mail />,
    validate: (v) => {
      console.log(v.length > 0 && v.length < 50)
      return v.length > 0 && v.length < 50
    }
  },
  Town: {
    minLength:1,
    maxLength: 50,
    name: "Town",
    value: "",
    required: true,
    icon: <LocationCity />,
    validate: (v) => {
      console.log(v.length > 0 && v.length < 50)
      return v.length > 0 && v.length < 50
    }
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
  let products = [];

  useDeepCompareEffect(() => {
    setAddress(address)
  }, [address])

  const [isLoading, fetchedData] = useHttpGet("products", []);

  if (fetchedData !== null) products = fetchedData.data;

  const onChange = (e) => {
    console.log();
    let addressTemp = address;
    addressTemp[e.target.name].value = e.target.value;
    setAddress(addressTemp);
  };

  const getPrice = () => {
    let cartPrice = 0;
    if (props.cart)
      Object.keys(props.cart).map((productID) => {
        let product = products.find(
          (product) => product.ID === parseInt(productID)
        );
        let productPrice = 0;
        if (product !== undefined) {
          productPrice = props.cart[productID] * product.price;
          cartPrice += productPrice / 100;
        }
      });
    return cartPrice.toString();
  };
  let cartPrice = getPrice();
  console.log("price: " + cartPrice);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 address={address} onChange={onChange} />;
      case 1:
        return (
          <Step2
            cart={props.cart}
            address={address}
            products={products}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <Step3 address={address} products={products} cart={props.cart} />
        );
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
            <StepButton disabled>{label}</StepButton>
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
              <div style={{ float: "left", marginTop: "5px" }}>
                <PaypalButton
                  className={classes.button}
                  style={{ float: "left" }}
                  client={props.CLIENT}
                  env={props.ENV}
                  commit={true}
                  currency={"GBP"}
                  total={cartPrice}
                  onSuccess={() => {
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
