import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "@/components/NotFound";
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import RegisterPage from "@/pages/auth/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import BookAppointment from "@/containers/BookAppointment";
import Appointments from "@/containers/Appointments";
const AdminRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoutes />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;
