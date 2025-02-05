"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "react-aria-components";
import { Input, Label } from "react-aria-components";
import { toast } from "react-toastify";
import { login, socialLogin } from "../../../lib/utils/login";
import {
  Gitbutton,
  Googlebutton,
  TorusLogo,
} from "../../constants/svgApplications";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { DEFAULT_LOGIN_REDIRECT } from "../../../lib/utils/routes";
import { AxiosService } from "../../../lib/utils/axiosService";
import DropDown from "../multiDropdownnew";
import ProgressButton from "../progressbar";
import TorusToast from "../torusComponents/torusToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";

interface LoginFormProps {
  variant?: "TP" | "CG";
}

function LoginForm({ variant = "TP" }: LoginFormProps) {
  const [clientList, setClientList] = useState<string[]>([]);
  const [client, setClient] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [selectedOption, setSelectedOption] = useState<"Individual" | "Teams">(
    "Individual"
  );
  const [wordLength, setWordLength] = useState(0);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);

  const fetchClients = async () => {
    try {
      const res = await AxiosService.get("/tp/getClientTenant?type=c");
      if (res.status == 200) {
        setClientList(res.data);
      }
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Error fetching clients`,
          closeButton: false,
        } as any
      );
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const { username, password } = formData;

      if (client && username && password) {
        const res = await login({ client, username, password });
        if (res?.error) {
          setLoading(false);
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error",
              text: `Failed to login, check credentials`,
              closeButton: false,
            } as any
          );
        } else {
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "success",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Success",
              text: `Logged in successfully`,
              closeButton: false,
            } as any
          );
          setLoading(false);
        }
      } else {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "warning",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Warning",
            text: `Please fill all the fields`,
            closeButton: false,
          } as any
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const passwordvisible = () => {
    setShowPassword(!showPassword);
  };

  const handlesociallogin = async (social: "google" | "github") => {
    console.log(social);
    const res = await socialLogin(social);
    console.log(res);
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full flex justify-between py-[2vw] flex-col bg-[#FFFFFF] border-none dark:bg-[#000000]">
      <h2 className="flex leading-[2.6vh] text-[1.25vw] p-3 items-center font-medium text-black dark:text-white transition-transform duration-700 ease-in-out">
        <TorusLogo /> TORUS
      </h2>
      <div className="flex flex-col gap-[2vw] px-[16.5%]">
        <div className="flex flex-col">
          <h1 className="text-[2vw] leading-[4.4vh] font-semibold text-black dark:text-white">
            Log in
          </h1>
          <p className="text-[#000000]/35 dark:text-white/35 pt-[0.6vw] text-[0.8vw] leading-[1.7vh]">
            Enter your details to get started
          </p>
        </div>

        <div className="flex w-full bg-[#F4F5FA] dark:bg-[#161616] rounded-lg p-[0.3vw] ">
          <Button
            onPress={() => setSelectedOption("Individual")}
            className={`py-[0.5vw] w-1/2 transition-colors duration-700 ease-in-out text-[0.8vw]  leading-[1.8vh] rounded-md
                             ${
                               selectedOption === "Individual"
                                 ? "bg-[#FFFFFF] dark:bg-[#000] outline-none font-medium"
                                 : " bg-inherit font-semibold"
                             } dark:text-white text-black outline-none`}
          >
            Individual
          </Button>
          <Button
            onPress={() => setSelectedOption("Teams")}
            className={`py-2 w-1/2 transition-colors duration-700 ease-in-out text-[0.8vw]  leading-[1.8vh] rounded-md
                            ${
                              selectedOption === "Teams"
                                ? "bg-[#FFFFFF] dark:bg-[#000]  font-medium"
                                : " bg-inherit outline-none font-semibold"
                            } dark:text-white text-black outline-none`}
          >
            Team
          </Button>
        </div>
        <Form className="flex flex-col h-full justify-evenly transition-all duration-700 ease-in-out gap-[1vw]">
          {selectedOption === "Teams" && (
            <div className="flex flex-col">
              <Label
                htmlFor="tenant"
                className="text-[#000000] dark:text-white mb-1 text-[0.8vw] font-medium leading-[1.7vh]"
              >
                Client
              </Label>
              <DropDown
                triggerButton="Select Client"
                selectedKeys={client}
                setSelectedKeys={(client) => setClient(client)}
                items={clientList}
                classNames={{
                  triggerButton:
                    "w-full bg-[#F4F5FA] text-black rounded-lg text-[0.8vw] font-medium leading-[1.7vh] py-[1vw] mt-2 dark:bg-[#171717] dark:text-[#FFFFFF] ",
                  popover: "w-[20%]",
                  listboxItem: "text-[0.8vw] text-center",
                }}
              />
            </div>
          )}

          <div className="flex flex-col focus:outline-none">
            <Label
              htmlFor="Email or Username"
              className="text-black dark:text-white mb-2 text-[0.8vw] font-medium leading-[1.7vh]"
            >
              Email or Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              onChange={handleFormDataChange}
              placeholder="eg:support@torus.com"
              className="bg-[#F4F5FA] text-[0.8vw] font-medium leading-[1.7vh] outline-none pl-3 dark:bg-[#171717] dark:text-[#FFFFFF] text-[#000000] py-[1vw] rounded-md w-full "
            />
          </div>
          <div className="flex flex-col relative">
            <Label
              htmlFor="Password"
              className="text-black dark:text-white mb-2 text-[0.8vw] font-medium leading-[1.7vh]"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              onChange={handleFormDataChange}
              type={showPassword ? "text" : "password"}
              onKeyUp={(e) => e.key === "Enter" && handleFormSubmit()}
              placeholder="Enter Password"
              className="bg-[#F4F5FA] pl-3 outline-none text-[0.8vw] font-medium leading-[1.7vh] dark:text-[#FFFFFF] text-[#000000] dark:bg-[#171717] py-[1vw] rounded-md w-full"
            />
            <span
              className="absolute bottom-[2.5vw] right-[1.25vw] cursor-pointer"
              onClick={passwordvisible}
            >
              {showPassword ? (
                <BsEyeFill fill={isDarkMode ? "#FFFFFF" : "#000000"} />
              ) : (
                <BsEyeSlash fill={isDarkMode ? "#FFFFFF" : "#000000"} />
              )}
            </span>
            <p className="text-black/35 dark:text-white  text-[0.8vw] font-medium leading-[1.7vh] mt-3">
              Forgot Password?
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              onPress={handleFormSubmit}
              isDisabled={loading}
              className={`bg-[#0736C4] w-full flex justify-center text-white ${
                loading ? "py-[0.4vw]" : "py-[1.3vw]"
              } text-[0.8vw] font-semibold leading-[1.7vh] disabled:bg-[#8c9ac4] disabled:cursor-not-allowed focus:outline-none rounded-lg`}
            >
              {loading ? <ProgressButton isIndeterminate /> : "Sign In"}
            </Button>
          </div>
        </Form>
        {selectedOption == "Individual" && (
          <div className="flex items-center justify-center dark:text-white w-full">
            <span className="h-px bg-black/15 w-[50%] "></span>
            <span className="dark:text-white px-2 text-[0.8vw] leading-[1.7vh]">
              Or
            </span>
            <span className="h-px bg-black/15 w-[50%]"></span>
          </div>
        )}
        {selectedOption === "Individual" && (
          <div className="flex w-full justify-between gap-[0.5vw]">
            <Button
              onPress={() => handlesociallogin("github")}
              className="bg-[#F4F5FA] w-full py-[1vw] dark:bg-[#171717] dark:text-white text-[0.8vw] font-medium leading-[1.7vh] px-6 flex items-center justify-center focus:outline-none rounded-lg"
            >
              <Gitbutton fill={isDarkMode ? "white" : "black"} />
              GitHub
            </Button>
            <Button
              onPress={() => handlesociallogin("google")}
              className="bg-[#F4F5FA] w-full py-[1vw] text-[0.8vw] font-medium leading-[1.7vh] dark:bg-[#171717] dark:text-white px-6 flex items-center justify-center focus:outline-none rounded-lg"
            >
              <Googlebutton />
              Google
            </Button>
          </div>
        )}
      </div>
      <div className="text-center text-[0.8vw] leading-[1.7vh]">
        <p className="text-black/35 dark:text-white">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-black dark:text-white font-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
