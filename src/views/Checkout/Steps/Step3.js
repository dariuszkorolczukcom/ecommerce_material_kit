import React from "react";
// http hook
import { useHttpPost } from "../../../hooks/http";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

export default function Step3(props) {
  const address = props.address;
  const products = props.products;
  const createSummary = () => {
    const orderSummary = {
      status: 1,
      price: 0,
      address: {
        name: address.Name.value,
        email: address.Email.value,
        address1: address.AddresLine1.value,
        address2: address.AddresLine2.value,
        postcode: address.PostCode.value,
        town: address.Town.value,
      },
      orderItems: [],
    };
    Object.keys(props.cart).map((productID) => {
      let product = products.find(
        (product) => product.ID === parseInt(productID)
      );
      let productPrice = 0;
      if (product !== undefined) {
        productPrice = props.cart[productID] * product.price;
        orderSummary.price += productPrice;
        orderSummary.orderItems.push({
          ProductId: parseInt(productID),
          qty: props.cart[productID],
        });
      }
    });
    return orderSummary;
  };
  const [isReceiptLoading, fetchedReceipt] = useHttpPost(
    "guest_order",
    [],
    createSummary()
  );

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        {console.log("fetchedReceipt")}
        {console.log(fetchedReceipt)}
        {!isReceiptLoading && fetchedReceipt != null && <div>Hello! {fetchedReceipt.ID}</div>}
      </GridItem>
    </GridContainer>
  );
}

Step3.propTypes = {
  address: PropTypes.object,
  products: PropTypes.array,
  cart: PropTypes.object,
};
