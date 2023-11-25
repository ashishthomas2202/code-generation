"use client";
import React, { useState } from "react";
import { Page } from "@/components/ui/page";
import { Card } from "@/components/ui/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters long"),
});
export default function SignIn() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("data:", data);
    const fieldData = {
      email: data.email,
      password: data.password,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin`, fieldData)
      .then((res) => {
        toast.success(res.data.message);
        router.replace("/dashboard");
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  return (
    <Page className="flex justify-center items-center">
      <Card className="w-[95vw] sm:w-9/12 lg:w-1/2 p-10 rounded-lg bg-gray-100 dark:bg-white">
        <h1 className="font-semibold text-3xl mb-4 text-center">Sign In</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-2">
            <div>
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
                placeholder="Email Address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <div>
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
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <div
                  className="px-2"
                  onClick={() => setVisible((prevState) => !prevState)}
                >
                  {visible ? <BsEyeSlash /> : <BsEye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </fieldset>
          <button
            className="w-full px-3 py-2 rounded-lg bg-indigo-500 text-white mt-2"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </Card>
    </Page>
  );
}
