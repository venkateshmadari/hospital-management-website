import Preloader from "@/components/loaders/Preloader";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Preloader />;
  if (!user) return <Navigate to="/auth/login" state={{ from: location }} />;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateRoutes;
