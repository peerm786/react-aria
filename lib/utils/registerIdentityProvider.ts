"use server";
import { AxiosService } from "./axiosService";
import { cookies } from "next/headers";

export async function setServerCookie(key: string, value: string) {
  const cookieStore = cookies();
  cookieStore.set(key, value);
}

export async function getServerCookie(key: string) {
  const cookieStore = cookies();
  return cookieStore.get(key);
}

export async function registerIdentityProviderUser(user: any, account: any) {
  try {
    const res = await AxiosService.post("/tp/auth/identityprovider", {
      client: "ABC",
      role: "seniordev",
      user,
      account,
    });
    return res.data;
  } catch (err) {
    return "error";
  }
}
