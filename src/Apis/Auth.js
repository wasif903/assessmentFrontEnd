"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ username, email, password }) => {
      const response = await axios.post(`${baseUrl}/api/register`, {
        username,
        email,
        password,
      });
      console.log("API Response:", response);
      return response.data;
    },
    onSuccess: (result) => {
      alert("Registered successfully!");
      Cookies.set("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      router.push("/notes");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      alert(error?.response?.data?.message || "Registration failed. Try again.");
    },
  });
};


export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ identifier, password }) => {
      const response = await axios.post(`${baseUrl}/api/login`, {
        identifier,
        password,
      });
      return response.data;
    },
    onSuccess: (result) => {
      // Store the tokens
      Cookies.set("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      
      // Redirect to notes page
      router.push("/notes");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert(error?.response?.data?.message || "Login failed. Try again.");
    },
  });

}


export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(accessToken, "----");
      const response = await axios.post(
        `${baseUrl}/api/logout`,
        { token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      );

      return response.data;
    },
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("refreshToken")
      router.push("/login");
    },
    onError: error => {
      console.error("Logout failed:", error);
    }
  });
};


