import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// http hook
import { useHttpGet } from "../hooks/http";
import "assets/scss/material-kit-react.scss?v=1.9.0";

import Header from "components/Header/Header.js";
import HeaderLinksLeft from "components/Header/HeaderLinks/HeaderLinksLeft.js";
import HeaderLinksRight from "components/Header/HeaderLinks/HeaderLinksRight.js";

import Footer from "components/Footer/Footer.js";

import LandingPage from "views/LandingPage/LandingPage.js";
import ProductsSection from "views/LandingPage/Sections/ProductsSection.js";
import ProductPage from "views/ProductPage/ProductPage.js";
import Checkout from "views/Checkout/Checkout.js";
import FAQ from "views/FAQ/FAQ.js";
import NoMatch from "views/NoMatch";

import Cart from "components/Cart/Cart.js";

const dashboardRoutes = [];

const ebayLink =
  "https://www.ebay.co.uk/itm/Organic-Loofah-Luffa-Soap-Hand-crafted-various-scents-and-colours/313107319035?hash=item48e6a688fb:m:mp2-hSkBefAn2Y0CCiLT0dQ";

export default function App() {
  const [isLoading, fetchedData] = useHttpGet("products/sorted", []);
  const [cart, setCart] = useState();

  useEffect(() => {
    let cart = {};
    if (typeof localStorage.getItem("cart") === "string")
      cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
  }, []);

  let categorisedProducts = null;

  if (fetchedData !== null) categorisedProducts = fetchedData.data;

  const handleAddItemToCart = (e, itemId) => {
    e.preventDefault();
    let cart = {};
    if (typeof localStorage.getItem("cart") === "string")
      cart = JSON.parse(localStorage.getItem("cart"));
    cart[itemId] ? cart[itemId]++ : (cart[itemId] = 1);
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleDeleteItemFromCart = (e, itemId) => {
    e.preventDefault();
    let cart = {};
    if (typeof localStorage.getItem("cart") === "string")
      cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[itemId]) cart[itemId] == 1 ? delete cart[itemId] : cart[itemId]--;
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="PinkBubbleBath"
        leftLinks={
          <HeaderLinksLeft
            categorisedProducts={categorisedProducts}
            isLoading={isLoading}
          />
        }
        rightLinks={
          <HeaderLinksRight
            categorisedProducts={categorisedProducts}
            isLoading={isLoading}
          />
        }
        cart={
          <Cart
            handleAddItemToCart={handleAddItemToCart}
            handleDeleteItemFromCart={handleDeleteItemFromCart}
            cart={cart !== undefined ? cart : {}}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "dark",
        }}
      />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <LandingPage>
              <ProductsSection
                ebayLink={ebayLink}
                isLoading={isLoading}
                categorisedProducts={categorisedProducts}
                handleAddItemToCart={handleAddItemToCart}
              />
            </LandingPage>
          )}
        />
        <Route exact path="/faq" component={FAQ} />
        <Route
          exact
          path="/checkout"
          component={() => <Checkout cart={cart} />}
        />
        <Route
          path="/product/:id"
          component={() => (
            <ProductPage
              ebayLink={ebayLink}
              handleAddItemToCart={handleAddItemToCart}
            />
          )}
        />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
