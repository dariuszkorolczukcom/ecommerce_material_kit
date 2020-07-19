import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ProductsTable from "./ProductsTable";
import AddressTable from "./AddressTable";

export default function Step2(props) {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        Summary:
      </GridItem>
      <GridItem>
        <ProductsTable
          cart={props.cart}
          products={props.products}
          isLoading={props.isLoading}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        Delivery Address:
      </GridItem>
      <GridItem>
        <AddressTable address={props.address} />
      </GridItem>
    </GridContainer>
  );
}

Step2.propTypes = {
  cart: PropTypes.object,
  address: PropTypes.object,
  products: PropTypes.array,
  isLoading: PropTypes.bool,
};
