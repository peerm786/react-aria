"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "react-aria-components";
import { Input, Label } from "react-aria-components";
import { toast } from "react-toastify";
import { login } from "../../../lib/utils/login";
import {
  Gitbutton,
  Googlebutton,
  TorusLogo,
} from "../../constants/svgApplications";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { setServerCookie } from "../../../lib/utils/registerIdentityProvider";
import { DEFAULT_LOGIN_REDIRECT } from "../../../lib/utils/routes";
import TorusDialog from "../../components/torusdialogmodal";
import { signIn } from "next-auth/react";
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
  const [social, setSocial] = useState("");
  const [open, setOpen] = useState(false);
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
            <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error",
              text: `Failed to login, check credentials`,
              closeButton: false,
            } as any
          )
        } else {
          toast(
            <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
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
        )
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const passwordvisible = () => {
    setShowPassword(!showPassword);
  };

  const handlesociallogin = async () => {
    await signIn(social, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] border-none dark:bg-[#000000]">
      <h2 className="flex leading-[2.6vh] text-[1.25vw] p-3 items-center font-medium text-black dark:text-white">
        <TorusLogo /> TORUS
      </h2>

      <Form className="flex flex-col h-full space-y-4 justify-center px-12 transition-all duration-700 ease-in-out">
        <div className="flex flex-col pt-10">
          <h1 className="text-[2vw] leading-[4.4vh] font-semibold text-black dark:text-white">
            Log in
          </h1>
          <p className="text-[#000000]/35 dark:text-white/35 pt-2 text-[0.8vw] leading-[1.7vh]">
            Enter your details to get started
          </p>
        </div>
        <div className="flex w-full bg-[#F4F5FA] dark:bg-[#161616] rounded-lg p-1 mt-6">
          <Button
            onPress={() => setSelectedOption("Individual")}
            className={`py-2 w-1/2 transition-colors duration-700 ease-in-out text-[0.8vw] font-medium leading-[1.8vh]
                             ${selectedOption === "Individual"
                ? "bg-[#FFFFFF] dark:bg-[#000] outline-none"
                : " bg-inherit outline-none"
              } dark:text-white text-black`}
          >
            Individual
          </Button>
          <Button
            onPress={() => setSelectedOption("Teams")}
            className={`py-2 w-1/2 transition-colors duration-700 ease-in-out text-[0.8vw] font-medium leading-[1.8vh]
                            ${selectedOption === "Teams"
                ? "bg-[#FFFFFF] dark:bg-[#000] outline-none"
                : " bg-inherit outline-none"
              } dark:text-white text-black`}
          >
            Team
          </Button>
        </div>

        <div className="space-y-4 ">
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
                    "w-full bg-[#F4F5FA] text-black rounded-lg text-[0.8vw] font-medium leading-[1.7vh] py-3 mt-2 dark:bg-[#171717] dark:text-[#FFFFFF] ",
                  popover: "w-[20%]",
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
              className="bg-[#F4F5FA] text-[0.8vw] font-medium leading-[1.7vh] outline-none pl-3 dark:bg-[#171717] dark:text-[#FFFFFF] text-[#000000] py-3 rounded-md w-full "
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
              className="bg-[#F4F5FA] pl-3 outline-none text-[0.8vw] font-medium leading-[1.7vh] dark:text-[#FFFFFF] text-[#000000] dark:bg-[#171717] py-3 rounded-md w-full"
            />
            <span
              className="absolute bottom-8 right-4 "
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
        </div>
        <div className="flex justify-center mt-5 ">
          <Button
            onPress={handleFormSubmit}
            isDisabled={loading}
            className="bg-[#0736C4] w-full flex justify-center text-white px-4 py-4 text-[0.8vw] font-semibold leading-[1.7vh] disabled:bg-[#8c9ac4] disabled:cursor-not-allowed focus:outline-none rounded-lg"
          >
            {loading ? <ProgressButton isIndeterminate /> : "Sign In"}
          </Button>
        </div>
        {selectedOption == "Individual" && (
          <div className="flex items-center justify-center dark:text-white mt-5 w-full">
            <span className="h-px bg-black/15 w-[50%] "></span>
            <span className="dark:text-white px-2 text-[0.8vw] leading-[1.7vh]">Or</span>
            <span className="h-px bg-black/15 w-[50%]"></span>
          </div>
        )}
        {selectedOption === "Individual" && (
          <div className="flex w-full justify-between ">
            <Button
              onPress=
              {handlesociallogin}

              className="bg-[#F4F5FA] py-3 dark:bg-[#171717] dark:text-white text-[0.8vw] font-medium leading-[1.7vh] px-6 flex items-center justify-center focus:outline-none rounded-lg"
            >
              <Gitbutton fill={isDarkMode ? "white" : "black"} />
              GitHub
            </Button>
            <Button
              onPress={handlesociallogin}
              className="bg-[#F4F5FA] py-3 text-[0.8vw] font-medium leading-[1.7vh] dark:bg-[#171717] dark:text-white px-6 flex items-center justify-center focus:outline-none rounded-lg"
            >
              <Googlebutton />
              Google
            </Button>
          </div>
        )}
        <div className="text-center text-[0.8vw] leading-[1.7vh]">
          <p className="text-black/35 dark:text-white">
            Don't have an account?{" "}
            <a href="#" className="text-black dark:text-white font-bold">
              Sign Up
            </a>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
