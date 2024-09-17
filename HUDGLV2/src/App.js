import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import AdminMainMenu from "./Component/Admin/Index";

import Dashboard from "./Component/Admin/Dashboard";
import { GetSession } from "./Class/ClsSession";
import FrmVoucherPD from "./Component/FrmVoucherPD/FrmVoucherPD";
import FrmVoucherAS from "./Component/FrmVoucherAS/FrmVoucherAS";
import FrmVoucherDR from "./Component/FrmVoucherDR/FrmVoucherDR";
import FrmVoucherRS from "./Component/FrmVoucherRS/FrmVoucherRS";

const ProtectedRoute = ({ children }) => {
  const sessionToken = GetSession();
  if (!sessionToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const RouteForLogin = ({ children }) => {
  const sessionToken = GetSession();
  if (sessionToken) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            <RouteForLogin>
              <LoginPage />
            </RouteForLogin>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminMainMenu title="Dashboard">
                <Dashboard />
              </AdminMainMenu>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/purchase-delivery"
          element={
            <ProtectedRoute>
              <AdminMainMenu title={"Purchase Delivery"}>
                <FrmVoucherPD />
              </AdminMainMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/adjustment-slip"
          element={
            <ProtectedRoute>
              <AdminMainMenu title={"Adjustment Slip"}>
                <FrmVoucherAS />
              </AdminMainMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/delivery-reciept"
          element={
            <ProtectedRoute>
              <AdminMainMenu title={"Delivery Reciept"}>
                <FrmVoucherDR />
              </AdminMainMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/return-slip"
          element={
            <ProtectedRoute>
              <AdminMainMenu title={"Return Slip"}>
                <FrmVoucherRS />
              </AdminMainMenu>
            </ProtectedRoute>
          }
        />
        {/* End Admin Route */}

        <Route path="*" element={<>Page Not Found.</>} />
      </Routes>
    </BrowserRouter>
  );
}
