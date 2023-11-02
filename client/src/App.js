import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductsDetailsPage,
  ProfilePage,
  ResetPasswordPage,
  SellerCreatePage,
  SellerActivationPage,
  SellerLoginPage,
} from "./routes/Routes.js";
import { 
  SellerHomePage 
} from "./routes/SellerRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
    <>
      {loading || isLoading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/sign-up" element={<SignupPage />}></Route>
            <Route
              path="/resetpassword"
              element={<ResetPasswordPage />}
            ></Route>
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            ></Route>
            <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route
              path="/product/:name"
              element={<ProductsDetailsPage />}
            ></Route>
            <Route path="/best-selling" element={<BestSellingPage />}></Route>
            <Route path="/events" element={<EventsPage />}></Route>
            <Route path="/faq" element={<FAQPage />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            ></Route>
            {/* Seller routes */}
            <Route path="/seller-create" element={<SellerCreatePage />}></Route>
            <Route path="/seller-login" element={<SellerLoginPage />}></Route>
            <Route
              path="/seller/:id"
              element={
                <SellerProtectedRoute isSeller={isSeller}>
                  <SellerHomePage />
                </SellerProtectedRoute>
              }
            ></Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
