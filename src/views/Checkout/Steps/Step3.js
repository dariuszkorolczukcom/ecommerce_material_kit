import React from "react";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function Step3() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          labelText="With floating label"
          id="float"
          formControlProps={{
            fullWidth: true,
          }}
          error
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <People />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
    </GridContainer>
  );
}
