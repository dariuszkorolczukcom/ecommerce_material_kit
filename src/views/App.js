import React from "react";
import { Route, Switch } from "react-router-dom";
// http hook
import { useHttpGet } from "../hooks/http";
import "assets/scss/material-kit-react.scss?v=1.9.0";
// header
import Header from "components/Header/Header.js";
import HeaderLinksLeft from "components/Header/HeaderLinks/HeaderLinksLeft.js";
import HeaderLinksRight from "components/Header/HeaderLinks/HeaderLinksRight.js";
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

  let categorisedProducts = null;

  if (fetchedData !== null) categorisedProducts = fetchedData.data;

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
              />
            </LandingPage>
          )}
        />
        <Route path="/faq" component={FAQ} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/:id" component={ProductPage} />
      </Switch>
      <Footer />
    </>
  );
}
