import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import Dashboardpage from "../pages/DashboardPage";

import DashboardHome from "../components/sections/DashboardHome";
import ProductSection from "../components/sections/ProductSection";
import CategoriesSection from "../components/sections/CategoriesSection";
import OrderSection from "../components/sections/OrderSection";
import UserSection from "../components/sections/UserSection";
import ProfileSection from "../components/sections/ProfileSection";
import LogsSection from "../components/sections/LogsSection";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route path="/dashboard" element={<Dashboardpage />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductSection />} />
          <Route path="categories" element={<CategoriesSection />} />
          <Route path="orders" element={<OrderSection />} />
          <Route path="users" element={<UserSection />} />
          <Route path="profile" element={<ProfileSection />} />
          <Route path="logs" element={<LogsSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;