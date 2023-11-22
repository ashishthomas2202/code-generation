"use client";
import React, { useState } from "react";
import { Input } from "src/components/ui/Input.jsx";
export default function SignUp() {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex justify-center items-center">
      <div className="dark:bg-white">
        <h1 className="text-4xl font-semibold dark:text-black">Sign Up</h1>
        <form>
          {/* <fieldset>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </fieldset> */}
          {step == 1 && (
            <fieldset>
              <h3 className="text-2xl text-black">
                Let's start with your name
              </h3>
              <Input
                value={fields.firstName}
                name="firstName"
                id="firstName"
                onChange={(e) =>
                  setFields((prevFields) => ({
                    ...prevFields,
                    firstName: e.target.value,
                  }))
                }
                placeholder="First Name"
              />
            </fieldset>
          )}
        </form>
      </div>
    </div>
  );
}
