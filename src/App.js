import React, { useEffect, useState } from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import {
  LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPages, TrackOrderPage,
  ProductDetailsPage, ProfilePage, ShopCreatePage, SellerActivationPage, ShopLoginPage, PaymentPage, OrderSuccessPage,
  OrderDetailsPage, UserInbox
} from "./routes/Routes.js"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import ProtectedRoute from './routes/ProtectedRoutes';
import { ShopHomePage } from './ShopRoutes'
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import {
  ShopAllCupon, ShopAllEvent, ShopAllOrders, ShopAllProducts, ShopCreateEvent, ShopCreateProduct, ShopDashboardPage,
  ShopPreviewPage, ShopOrderDetails, ShopAllRefunds, ShopSettingsPage, ShopWithDrawMoneyPage, ShopInboxPage
} from './routes/ShopRoutes';
import { getAllProducts } from './redux/actions/product';
import { getAllEvents } from './redux/actions/event';

import CheckoutPage from './pages/CheckoutPage';
import axios from 'axios';
import { server } from './server';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import { AdminDashboardEvents, AdminDashboardOrders, AdminDashboardPage, AdminDashboardProducts, AdminDashboardSellers, AdminDashboardUsers, AdminDashboardWithdraw } from './routes/AdminRoutes';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';


const App = ({ data }) => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }


  useEffect(() => {
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller())
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey()

  }, [])

  return (
    < BrowserRouter >
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
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPages />} />
        <Route path='/profile' element={<ProtectedRoute ><ProfilePage /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute ><CheckoutPage /></ProtectedRoute>} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/inbox" element={<ProtectedRoute ><UserInbox /></ProtectedRoute>} />
        <Route path='/user/order/:id' element={<ProtectedRoute ><OrderDetailsPage /></ProtectedRoute>} />
        <Route path='/user/track/order/:id' element={<ProtectedRoute ><TrackOrderPage /></ProtectedRoute>} />


        <Route path='/shop-create' element={<ShopCreatePage />} />
        <Route path='/shop-login' element={<ShopLoginPage />} />
        <Route path='/shop/:id' element={<SellerProtectedRoute  ><ShopHomePage /></SellerProtectedRoute>} />
        <Route path='/dashboard' element={<SellerProtectedRoute  ><ShopDashboardPage /></SellerProtectedRoute>} />
        <Route path='/dashboard-create-product' element={<SellerProtectedRoute ><ShopCreateProduct /></SellerProtectedRoute>} />
        <Route path='/dashboard-products' element={<SellerProtectedRoute ><ShopAllProducts /></SellerProtectedRoute>} />
        <Route path='/dashboard-create-event' element={<SellerProtectedRoute ><ShopCreateEvent /></SellerProtectedRoute>} />
        <Route path='/dashboard-events' element={<SellerProtectedRoute ><ShopAllEvent /></SellerProtectedRoute>} />
        <Route path='/dashboard-refunds' element={<SellerProtectedRoute ><ShopAllRefunds /></SellerProtectedRoute>} />
        <Route path='/dashboard-coupouns' element={<SellerProtectedRoute ><ShopAllCupon /></SellerProtectedRoute>} />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        <Route path="/settings" element={<SellerProtectedRoute ><ShopSettingsPage /></SellerProtectedRoute>} />
        <Route path='/dashboard-orders' element={<SellerProtectedRoute ><ShopAllOrders /></SellerProtectedRoute>} />
        <Route path='/order/:id' element={<SellerProtectedRoute ><ShopOrderDetails /></SellerProtectedRoute>} />
        <Route path="/dashboard-withdraw-money" element={<SellerProtectedRoute> <ShopWithDrawMoneyPage /> </SellerProtectedRoute>} />
        <Route path="/dashboard-messages" element={<SellerProtectedRoute> <ShopInboxPage /> </SellerProtectedRoute>} />

        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-users" element={<ProtectedAdminRoute> <AdminDashboardUsers /> </ProtectedAdminRoute>} />
        <Route path="/admin-sellers" element={<ProtectedAdminRoute> <AdminDashboardSellers /></ProtectedAdminRoute>} />
        <Route path="/admin-orders" element={<ProtectedAdminRoute> <AdminDashboardOrders /> </ProtectedAdminRoute>} />
        <Route path="/admin-products" element={ <ProtectedAdminRoute> <AdminDashboardProducts /> </ProtectedAdminRoute>  }/>
        <Route path="/admin-events" element={ <ProtectedAdminRoute> <AdminDashboardEvents /> </ProtectedAdminRoute> } />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
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
        theme="light"
      />
      <ToastContainer />
    </BrowserRouter >


  )
}

export default App
