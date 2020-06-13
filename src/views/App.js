import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// http hook
import { useHttpGet } from "../hooks/http";
import "assets/scss/material-kit-react.scss?v=1.9.0";
// header
import Header from "components/Header/Header.js";
import HeaderLinksLeft from "components/Header/HeaderLinks/HeaderLinksLeft.js";
import HeaderLinksRight from "components/Header/HeaderLinks/HeaderLinksRight.js";
import Cart from "components/Cart/Cart.js";
// footer
import Footer from "components/Footer/Footer.js";
//landing
import LandingPage from "views/LandingPage/LandingPage.js";
import ProductsSection from "views/LandingPage/Sections/ProductsSection.js";
// product
import ProductPage from "views/ProductPage/ProductPage.js";
// checkout
import Checkout from "views/Checkout/Checkout.js";
// FAQ
import FAQ from "views/FAQ/FAQ.js";

const dashboardRoutes = [];

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
          height: 300,
          color: "primary",
        }}
      />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <LandingPage>
              <ProductsSection
                isLoading={isLoading}
                categorisedProducts={categorisedProducts}
                handleAddItemToCart={handleAddItemToCart}
              />
            </LandingPage>
          )}
        />
        <Route path="/faq" component={FAQ} />
        <Route path="/checkout" component={Checkout} />
        <Route
          path="/:id"
          component={() => (
            <ProductPage handleAddItemToCart={handleAddItemToCart} />
          )}
        />
      </Switch>
      <Footer />
    </>
  );
}
