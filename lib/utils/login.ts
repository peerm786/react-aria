"use server";
import { signIn } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../constants/routes";
import { AuthError } from "next-auth";

export const login = async (values: any) => {
  try {
    const { client, username, password } = values;
    await signIn("credentials", {
      client,
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
};
