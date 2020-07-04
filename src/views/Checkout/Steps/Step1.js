import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function Step1(props) {
  //https://api.getAddress.io/find/
  return (
    <GridContainer>
      {Object.keys(props.address).map((key) => {
        return (
          <GridItem xs={12} md={7} key={key}>
            <CustomInput
              labelText={props.address[key].name}
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
              value={props.address[key].value}
              error={
                !props.address[key].validate(props.address[key].value)
              }
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props.address[key].icon}
                  </InputAdornment>
                ),
                onChange: (e) => props.onChange(e, key),

                name: key,
              }}
            />
          </GridItem>
        );
      })}
    </GridContainer>
  );
}

Step1.propTypes = {
  address: PropTypes.object,
  onChange: PropTypes.func,
};
