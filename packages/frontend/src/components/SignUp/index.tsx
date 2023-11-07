"use client";
import { signupSubmit } from "./serverFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from "../Forms/Textfield";
import { SubmitBtn } from "../Forms/SubmitBtn";

export const SignUp = () => {
  const signupSchema = z.object({
    email: z.string().max(256),
    userName: z.string().max(64),
    password: z.string().max(256),
  });
  const formMethods = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(
          (fields) => {
            signupSubmit(fields);
          },
          (error) => {
            console.log("woopsy doo");
            console.log(error);
          }
        )}
      >
        <TextField
          id="email"
          required={true}
          placeholderText="Email Address"
          label="Email"
        />
        <TextField
          id="userName"
          required={true}
          placeholderText="User Name"
          label="User Name"
        />
        <TextField
          id="password"
          required={true}
          placeholderText="Password"
          label="Password"
          isPassword={true}
        />
        <SubmitBtn label="Submit" />
      </form>
    </FormProvider>
  );
};
