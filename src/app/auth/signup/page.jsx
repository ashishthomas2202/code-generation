"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/page";
import toast from "react-hot-toast";
import axios from "axios";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password must match Password"),
});

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);

  const onSubmit = async (data) => {
    console.log("data:", data);
    const fieldData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`, fieldData)
      .then((res) => {
        console.log("res:", res);
        toast.success("Sign Up Successful");
        router.replace("/auth/signin");
      })
      .catch((err) => {
        console.log("err:", err.response.data.errors[0]);
        let error = err.response.data.errors[0];
        setError(error.field, {
          type: "custom",
          message: error.message,
        });
        toast.error("Error Signing Up");
      });
  };

  return (
    <Page className="flex justify-center items-center">
      <Card className="w-[95vw] sm:w-9/12 lg:w-1/2 p-10 rounded-lg bg-gray-100 dark:bg-white">
        <h1 className="font-semibold text-3xl mb-4 text-center">SignUp</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-3 md:gap-5 sm:flex-row">
            <div className="flex-1">
              <label
                className={`text-sm ${
                  errors.firstName ? "text-red-500" : "text-indigo-500"
                }`}
              >
                First Name:
              </label>
              <input
                className={`w-full px-3 py-2 mt-1 outline outline-2 rounded-lg ${
                  errors.firstName ? "outline-red-500" : "outline-indigo-500"
                }`}
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                className={`text-sm ${
                  errors.lastName ? "text-red-500" : "text-indigo-500"
                }`}
              >
                Last Name:
              </label>
              <input
                className={`w-full px-3 py-2 mt-1 outline outline-2 rounded-lg ${
                  errors.lastName ? "outline-red-500" : "outline-indigo-500"
                }`}
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-3 ">
            <div className="w-full">
              <label
                className={`text-sm ${
                  errors.email ? "text-red-500" : "text-indigo-500"
                }`}
              >
                Email Address:
              </label>
              <input
                className={`w-full px-3 py-2 mt-1 outline outline-2 rounded-lg ${
                  errors.email ? "outline-red-500" : "outline-indigo-500"
                }`}
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-3 md:gap-5 sm:flex-row">
            <div className="flex-1">
              <label
                className={`text-sm ${
                  errors.password ? "text-red-500" : "text-indigo-500"
                }`}
              >
                Password:
              </label>
              <div
                className={`flex items-center justify-between mt-1 rounded-lg bg-white outline outline-2 ${
                  errors.password ? "outline-red-500" : "outline-indigo-500"
                }`}
              >
                <input
                  className={`w-full px-3 py-2 outline-none`}
                  type={visible.password ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <div
                  className="px-2"
                  onClick={() => {
                    setVisible((prevState) => ({
                      ...prevState,
                      password: !prevState.password,
                    }));
                  }}
                >
                  {visible.password ? (
                    <BsEyeSlash className="text-xl" />
                  ) : (
                    <BsEye className="text-xl" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                className={`text-sm ${
                  errors.confirmPassword ? "text-red-500" : "text-indigo-500"
                }`}
              >
                Confirm Password:
              </label>
              <div
                className={`flex items-center justify-between mt-1 rounded-lg bg-white outline outline-2 ${
                  errors.confirmPassword
                    ? "outline-red-500"
                    : "outline-indigo-500"
                }`}
              >
                <input
                  className={`w-full px-3 py-2 outline-none`}
                  type={visible.confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <div
                  className="px-2"
                  onClick={() => {
                    setVisible((prevState) => ({
                      ...prevState,
                      confirmPassword: !prevState.confirmPassword,
                    }));
                  }}
                >
                  {visible.confirmPassword ? (
                    <BsEyeSlash className="text-xl" />
                  ) : (
                    <BsEye className="text-xl" />
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </fieldset>

          <button
            className="w-full px-3 py-2 rounded-lg bg-indigo-500 text-white mt-2"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </Card>
    </Page>
  );
}
