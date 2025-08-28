import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Preloader from "@/components/loaders/Preloader";
import axiosInstance from "@/instance/instance";
import { AxiosResponse } from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
};

interface AuthContextType {
  user: User | null;
  setUser: any;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  registerUser: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => Promise<AxiosResponse<any>>;
  logout: () => void;
  getUserData: () => Promise<void>;
  updatedProfileData: (credentials: {
    name: string;
    email: string;
    phoneNumber?: string;
  }) => void;
  updateProfileImage: any;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/getUserData");
      if (response?.status === 200) {
        setUser(response?.data?.patient);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      console.log(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        await getUserData();
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      throw errorMessage;
    }
  };

  const registerUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });
      return res;
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      throw errorMessage;
    }
  };

  const updateProfileImage = async (file: File) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosInstance.post(
        `/doctors/${user?.id}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setUser((prevUser: any) => ({
          ...prevUser,
          image: response.data.data.image,
        }));
        return response;
      }
    } catch (error: any) {
      console.error("Error updating profile image:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      throw errorMessage;
    } finally {
      setLoading(false);
    }
  };

  const updatedProfileData = async ({
    name,
    email,
    phoneNumber,
  }: {
    name: string;
    email?: string;
    phoneNumber?: string;
  }) => {
    try {
      console.log(user?.id, {
        name,
        email,
        phoneNumber,
      });
      const response = await axiosInstance.put(`/profile/${user?.id}`, {
        name,
        email,
        phoneNumber,
      });

      if (response.status === 200) {
        setUser((prevUser: any) => ({
          ...prevUser,
          name,
          email,
          phoneNumber,
        }));
        return response;
      }
    } catch (error: any) {
      console.error("Error updating profile image:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      throw errorMessage;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [getUserData]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      login,
      logout,
      getUserData,
      registerUser,
      updateProfileImage,
      updatedProfileData,
    }),
    [
      user,
      setUser,
      loading,
      login,
      logout,
      getUserData,
      registerUser,
      updateProfileImage,
      updatedProfileData,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Preloader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
