import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { AxiosService } from "./lib/utils/axiosService";
import { sign } from "jsonwebtoken";
import {
  getServerCookie,
  registerIdentityProviderUser,
} from "./lib/utils/registerIdentityProvider";

const PUBLICK_KEY =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4nxzwnTeXFaMypqO8dU7F9FlDLyXMzQka+u5X6WBIhnDD5pGm6pt2okZ1wxHva2Qh6cXmpSL+dQ45+slIQ97MO28lmNqGtwA95DwxBL/glixaheBHpebTYfUQYE3bfu7bztnzSdkI1sAFRzKB1690VQK5t4To3sonYWMG+WcfimL6IMLd1BIUbamn15D1t2PQ1rcD+oOPbW29e1Or15u3NhAlEqGRvvVNoIhNleNz6IQoZtbwE3zfkFytHIFKlTeaLswdnss5i0DZR0saymiag08guIcJzSjhNe0F0/XUh4m9kvrsHLVOi1t/NbxRSQRWuXYJR5obC6MpM4oz97k4QIDAQAB";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { client, username, password } = credentials;
        const data = {
          client: client,
          role: "seniordev",
          username: username,
          password: password,
          type: "c",
        };
        // Return the promise from the axios.post() call
        const res = await AxiosService.post(`/tp/signin`, data);
        if (res.status == 201) {
          return res.data;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log(user, account);

      if (account?.type == "credentials") {
        return true; //false;
      } else {
        await registerIdentityProviderUser(user, account);
        return true;
      }
    },

    async jwt({ token, user }) {
      if (token) {
        // Check if token exists
        if (user) {
          token.user = user;
          if (user.image) {
            const role =
              (await getServerCookie("role").then((res) => res?.value)) ?? "";
            const client =
              (await getServerCookie("client").then((res) => res?.value)) ?? "";
            const payload = {
              loginId: token?.name ?? "",
              firstName: token?.name ?? "",
              lastName: token?.name ?? "",
              email: token?.email ?? "",
              mobile: "",
              "2FAFlag": "N",
              role,
              client: client,
              scope: "social profile",
            };

            const updatedToken = {
              ...token,
              ...payload,
            };
            const access_token = sign(updatedToken, PUBLICK_KEY, {
              expiresIn: "10m",
            });
            token.acc = access_token;
          }
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && token.user) {
        // Check if token and user exist
        session.user = token.user;
        if (token.user.image) {
          session.user.token = token.acc;
        }
      }
      return session;
    },
  },
});
