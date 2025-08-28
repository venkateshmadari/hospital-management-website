import { Toaster } from "react-hot-toast";
import AdminRoutes from "./Routes/AdminRoutes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <AdminRoutes />
    </AuthProvider>
  );
};

export default App;
