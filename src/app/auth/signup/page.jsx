"use client";
import React, { useState } from "react";
import Page from "@/components/ui/Page";
import { Input } from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
export default function SignUp() {
  const [step, setStep] = useState({ current: 1, total: 2 });
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <Page className="">
      <Card className="w-1/2 rounded-lg p-10">
        <h1 className="font-semibold text-3xl mb-4">Sign Up</h1>
        <form>
          {/* <fieldset>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </fieldset> */}
          {step.current == 1 && (
            <fieldset>
              <h3 className="font-semibold text-2xl text-indigo-500 mb-3">
                Let's start with your name
              </h3>
              <label className="text-sm text-gray-700">
                Enter your First Name:
              </label>
              <Input
                className="w-full rounded-lg"
                border="border-2"
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
          <Button></Button>
        </form>
      </Card>
    </Page>
  );
}
