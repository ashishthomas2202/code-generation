"use client";
import React, { useState } from "react";
import Page from "src/components/ui/page.jsx";
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
    <Page className="">
      <div className="dark:bg-white p-10 rounded-lg">
        <h1 className="text-3xl font-semibold dark:text-black text-center mb-3">
          Sign Up
        </h1>
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
              <h3 className="text-xl text-black">Let's start with your name</h3>
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
    </Page>
  );
}
