"use client";

import { useRegister } from "@/Apis/Auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Page = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = data;
  const [isShow, setIsShow] = useState(false);

  const registerMutation = useRegister();

  const handleData = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(data);
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <form
        className="p-4 rounded-2xl shadow-2xl bg-white border border-blue-600 flex flex-col gap-4 w-[20rem] max-sm:w-[90%] items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold">Register</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          className="w-full outline-none border border-blue-600 rounded-xl px-4 py-2"
          onChange={handleData}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Page;
