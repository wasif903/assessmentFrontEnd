"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useLogin } from "@/Apis/Auth";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState({
    identifier: "", // Change 'username' to 'identifier'
    password: "",
  });
  const { identifier, password } = data;
  const [isShow, setIsShow] = useState(false);

  const handleData = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await res.json();

  //     if (res.ok) {
  //       // Store the tokens (access and refresh)
  //       Cookies.set("accessToken", result.accessToken);
  //       localStorage.setItem("refreshToken", result.refreshToken);

  //       // Redirect to notes page
  //       router.push("/notes");
  //     } else {
  //       alert(result.message || "Login failed");
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //   }
  // };

  const loginMutation = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginMutation.mutate(data);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <form
        className="p-4 rounded-2xl shadow-2xl bg-white border border-blue-600 flex flex-col gap-4 w-[20rem] max-sm:w-[90%] items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold">Login</h1>
        <input
          type="text"
          placeholder="Email or Username"
          name="identifier" // Update to 'identifier' for the login API
          value={identifier} // Bind with 'identifier'
          className="w-full outline-none border border-blue-600 rounded-xl px-4 py-2"
          onChange={handleData}
        />
        <div className="w-full border border-blue-600 rounded-xl px-4 py-2 flex items-center justify-between">
          <input
            type={isShow ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            className="w-full outline-none border-none"
            onChange={handleData}
          />
          {isShow ? (
            <FaEye
              className="cursor-pointer"
              onClick={() => setIsShow(!isShow)}
            />
          ) : (
            <FaEyeSlash
              className="cursor-pointer"
              onClick={() => setIsShow(!isShow)}
            />
          )}
        </div>
        <button
          className="bg-blue-600 rounded-2xl cursor-pointer text-white text-base font-medium px-4 py-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;
