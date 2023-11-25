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
  PasswordChangedConfirmation,
  SellerCreatePage,
  SellerActivationPage,
  SellerLoginPage,
  CheckoutPage,
  PaymentPage,
  OrderDetailsPage,
  TrackOrderPage,
  OrderSuccessPage,
  UserInbox,
} from "./routes/Routes.js";
import {
  SellerDashboardPage,
  SellerHomePage,
  SellerCreateProduct,
  SellerAllProducts,
  SellerCreateEvents,
  SellerAllEvents,
  SellerAllOrders,
  SellerAllRefunds,
  SellerOrderDetails,
  SellerAllCoupons,
  SellerSettingsPage,
  ResetPasswordSellerPage,
  PasswordChangedConfirmationSeller,
  SellerPreviewPage,
  SellerWithDrawMoneyPage,
  SellerInboxPage,
} from "./routes/SellerRoutes.js";

import {
  AdminDashboardPage,
  AdminDashboardUsersPage,
  AdminDashboardSellersPage,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
  AdminDashboardCategories,
  AdminDashboardSubscription,
} from "./routes/AdminRoutes.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { server } from "./server";
import axios from "axios";
import { useState } from "react";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
    {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/sign-up" element={<SignupPage />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route
          path="/confirmation-reset"
          element={<PasswordChangedConfirmation />}
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
        <Route path="/product/:id" element={<ProductsDetailsPage />}></Route>
        <Route path="/best-selling" element={<BestSellingPage />}></Route>
        <Route path="/events" element={<EventsPage />}></Route>
        <Route path="/faq" element={<FAQPage />}></Route>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/seller/preview/:id" element={<SellerPreviewPage />} />

        {/* Seller routes */}

        <Route path="/seller-create" element={<SellerCreatePage />}></Route>
        <Route path="/seller-login" element={<SellerLoginPage />}></Route>
        <Route
          path="/reset-password-seller"
          element={<ResetPasswordSellerPage />}
        ></Route>
        <Route
          path="/confirmation-reset-seller"
          element={<PasswordChangedConfirmationSeller />}
        ></Route>
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
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <SellerCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <SellerAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <SellerAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <SellerAllRefunds />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <SellerOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <SellerProtectedRoute>
              <SellerAllCoupons />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <SellerSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <SellerWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <SellerInboxPage />
            </SellerProtectedRoute>
          }
        />
        {/* Admin route  */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard-all-user"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsersPage />
            </ProtectedAdminRoute>
          }
        ></Route>

        <Route
          path="/admin/all-seller"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellersPage />
            </ProtectedAdminRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        ></Route>
         <Route
          path="/admin/dashboard-categories"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardCategories />
            </ProtectedAdminRoute>
          }
        ></Route>
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin-dashboard-subscription"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSubscription />
            </ProtectedAdminRoute>
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
