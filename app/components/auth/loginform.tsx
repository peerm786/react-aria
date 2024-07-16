"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "react-aria-components";
import { Input, Label } from "react-aria-components";
import { toast } from "react-toastify";
import { login } from "../../../lib/utils/login";
import { useDarkMode } from "../../../lib/utils/useDarkmode";
import DropDown from "../multiDropdownnew";
import { AxiosService } from "../../../lib/utils/axiosService";


interface LoginFormProps {
  variant?: "TP" | "CG";
}

function LoginForm({ variant = "TP" }: LoginFormProps) {
  const [clientList, setClientList] = useState<string[]>([]);
  const [client, setClient] = useState<any>("");
  const [loading, setLoading] = useState(false);
  console.log(client, "dsfsdf");

  const { isDarkMode } = useDarkMode();

  const fetchClients = async () => {
    try {
      const res = await AxiosService.get(
        "/tp/getClientTenant?type=c"
      );
      if (res.status === 200) {
        setClientList(res.data);
      }
    } catch (error) {
      toast.error("Error fetching clients");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const client = formData.get("client");
      const username = formData.get("username");
      const password = formData.get("password");

      if (client && username && password) {
        const res = await login({ client, username, password });
        if (res?.error) {
          setLoading(false);
          toast.error("Failed to login, check credentials", {
            autoClose: 2000,
          });
        } else {
          setLoading(false);
          toast.success("Logged in successfully");
        }
      } else {
        alert("Please fill all the fields");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`min-h-screen w-full justify-center flex items-center bg-white p-11 dark:bg-slate-500 `}>
      <Form action={handleFormSubmit} className="w-3/4 ">
        <div className=" flex flex-col mb-6 gap-3">
          <h1 className={`text-xl font-bold ml-5`}>
            Welcome to Torus Platform
          </h1>
          <p className={`text-[#000000] text-sm ml-5 `}>Let's get started!</p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="tenant" className={`text-black mb-1 text-sm ml-5 `}>
              Client
            </Label>
            {/* <Select
              selectedKey={client}
              onSelectionChange={(client) => setClient(client)}
              name="client"
              // label="Select Client"
              className={`text-sm pl-3 bg-[#D9D9D9]  py-2 rounded-md w-[90%] ml-5`}
            > */}

            <DropDown
              triggerButton="Select Client"
              selectedKeys={client}
              setSelectedKeys={(client) => setClient(client)}
              items={clientList}

              classNames={{
                triggerButton: `w-[90%] bg-[#D9D9D9] ml-5 rounded-lg text-sm ${client ? 'text-black' : 'text-gray-400'} text-gray-400 font-medium mt-2 dark:bg-[#171717] dark:text-[#FFFFFF]`,
                popover: "w-[20%]",
                // listbox: "w-60 h-40 overflow-y-auto",
                listboxItem: "",
              }}
            />
            {/* </Select> */}
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="Email or Username"
              className={`text-black mb-1 text-sm ml-5 `}
            >
              Email or Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="eg:support@torus.com"
              className={`text-sm pl-3 bg-[#D9D9D9] py-2 rounded-md w-[90%] ml-5`}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="Password" className={`text-black mb-1 text-sm ml-5 `}>
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="Password"
              placeholder="Enter Password"
              className={`text-sm pl-3 bg-[#D9D9D9]  py-2 rounded-md w-[90%] ml-5`}
            />
          </div>
        </div>

        <p className={`text-black text-sm ml-5 `}>Forgot Password?</p>
        <div className="flex justify-center ">
          <Button
            type="submit"
            isDisabled={loading}
            className={`bg-[#0736C4] text-white px-4 py-2 w-[90%] disabled:bg-[#8c9ac4]`}
          >
            Sign In
          </Button>
        </div>
        <div className="flex items-center justify-center ">
          <span className="h-px bg-gray-400 w-[40%] "></span>
          <span className={`text-gray-700 px-2 `}>Or</span>
          <span className="h-px bg-gray-400 w-[40%]"></span>
        </div>
        <div className="flex flex-row items-center gap-10 ">
          <Button className={`bg-[#D9D9D9] w-[40%] h-[50px]  text-black px-4 ml-7 flex items-center justify-center `}>
            <svg
              className="mr-2"
              width="20"
              height="24"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3657 0.904846C5.60951 0.904846 0.947266 5.248 0.947266 10.6046C0.947266 14.891 3.93215 18.5259 8.07087 19.8074C8.59179 19.8987 8.78279 19.5985 8.78279 19.341C8.78279 19.1107 8.77411 18.5004 8.76977 17.6918C5.87171 18.2766 5.2605 16.3905 5.2605 16.3905C4.78646 15.271 4.10145 14.9716 4.10145 14.9716C3.15771 14.3703 4.17438 14.3826 4.17438 14.3826C5.22056 14.4501 5.77013 15.382 5.77013 15.382C6.69911 16.8651 8.20891 16.4366 8.8045 16.189C8.89827 15.5613 9.16654 15.1344 9.46433 14.8918C7.15057 14.6491 4.71874 13.815 4.71874 10.0987C4.71874 9.04004 5.12245 8.17469 5.79097 7.49608C5.67376 7.25095 5.32214 6.26469 5.88213 4.92884C5.88213 4.92884 6.75467 4.66891 8.7472 5.92333C9.58067 5.70782 10.4662 5.60088 11.3518 5.59595C12.2374 5.60088 13.1229 5.70782 13.9564 5.92333C15.9359 4.66891 16.8085 4.92884 16.8085 4.92884C17.3685 6.26469 17.0168 7.25095 16.9126 7.49608C17.5768 8.17469 17.9805 9.04004 17.9805 10.0987C17.9805 13.8249 15.5452 14.645 13.2271 14.8836C13.5918 15.1747 13.9304 15.7695 13.9304 16.6784C13.9304 17.9764 13.9173 19.0194 13.9173 19.3345C13.9173 19.5886 14.0997 19.8922 14.6336 19.7951C18.8019 18.5218 21.7841 14.8844 21.7841 10.6046C21.7841 5.248 17.1193 0.904846 11.3657 0.904846Z"
                fill="black"
              />
            </svg>
            Github
          </Button>
          <Button className={`bg-[#D9D9D9] w-[40%] h-[50px] text-black px-4 mr-4  flex items-center justify-center `}>
            <svg
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2836 10.3563H20.1354V10.3483H12V13.6517H16.6821C16.3531 15.2039 15.1882 16.3563 13.6359 16.9039V19.1072H16.8236C19.2114 17.5449 20.7049 14.9039 20.7049 11.9999C20.7049 11.6073 20.6775 11.213 20.6237 10.8249L20.2836 10.3563Z"
                fill="#4285F4"
              />
              <path
                d="M12 20.5C14.73 20.5 16.9504 19.5666 18.4748 17.9855L15.2871 15.7812C14.5155 16.3265 13.5364 16.615 12.5386 16.615C10.849 16.615 9.38958 15.4978 8.79945 13.9427H5.8656V16.2155C7.40649 18.6243 9.99821 20.5 12 20.5Z"
                fill="#34A853"
              />
              <path
                d="M8.79953 13.9427C8.43849 12.7461 8.43849 11.5415 8.79953 10.3449V8.07213H5.86568C4.49781 10.8939 4.49781 14.3938 5.86568 17.2155L8.79953 13.9427Z"
                fill="#FBBC05"
              />
              <path
                d="M12 7.38498C13.0312 7.38498 14.006 7.76991 14.7474 8.49799L17.0073 6.23801C15.568 4.87469 13.7345 4.10723 12 4.10723C9.9982 4.10723 7.40648 5.98301 5.8656 8.07213L8.79945 10.345C9.38958 8.78999 10.849 7.38498 12 7.38498Z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </div>
        <div className="text-center ">
          <p className={`text-black  text-sm`}>
            Don't have an account?{" "}
            <a href="#" className="text-black font-bold gap">
              Sign Up
            </a>
          </p>

        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
