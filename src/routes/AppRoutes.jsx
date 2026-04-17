import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Public/Home";
import Auth from "../pages/Public/Auth";
import Charities from "../pages/Public/Charities";
import Dashboard from "../pages/Dashboard/Dashboard";
import Subscription from "../pages/Dashboard/Subscription";
import ProtectedRoute from "./ProtectedRoute";
import Scores from "../pages/Dashboard/Scores";
import AdminDashboard from "../pages/Admin/AdminDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/charities" element={<Charities />} />
        <Route path="/subscribe" element={<Subscription />} />

        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
        <Route
        path="/dashboard/scores"
          element={
            <ProtectedRoute>
              <Scores /> 
            </ProtectedRoute>
          }
        />  
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}