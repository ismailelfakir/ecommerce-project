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
  PasswordChangedConfirmation,
  
} from "./routes/Routes.js";
import {
  SellerDashboardPage,
  SellerHomePage,
  SellerCreateProduct,
  SellerAllProducts,
  ResetPasswordSellerPage,
  PasswordChangedConfirmationSeller,
  SellerAllCoupons,
} from "./routes/SellerRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/sign-up" element={<SignupPage />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route path="/confirmation-reset" element={<PasswordChangedConfirmation />}></Route>
        <Route path="/reset-password-seller" element={<ResetPasswordSellerPage />}></Route>
        <Route path="/confirmation-reset-seller" element={<PasswordChangedConfirmationSeller />}></Route>



        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        ></Route>
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/product/:name" element={<ProductsDetailsPage />}></Route>
        <Route path="/best-selling" element={<BestSellingPage />}></Route>
        <Route path="/events" element={<EventsPage />}></Route>
        <Route path="/faq" element={<FAQPage />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
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
            <SellerProtectedRoute>
              <SellerHomePage />
            </SellerProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <SellerDashboardPage />
            </SellerProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <SellerCreateProduct />
            </SellerProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <SellerAllProducts />
            </SellerProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <SellerAllCoupons />
            </SellerProtectedRoute>
          }
        />
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
  );
};

export default App;
