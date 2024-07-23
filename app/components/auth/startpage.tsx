
"use client";
import React, { useEffect, useState } from "react";
import { Form, TabList, Tabs } from "react-aria-components"
import { Button } from "react-aria-components"
import { Heading, Input, Label } from "react-aria-components";
import { toast } from "react-toastify";
import { login } from "../../../lib/utils/login";
import { Gitbutton, Googlebutton, TorusLogo } from "../../constants/svgApplications";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { getCookie } from "../../../lib/utils/cookiemgmt";
import { setServerCookie } from "../../../lib/utils/registerIdentityProvider"
import { DEFAULT_LOGIN_REDIRECT } from "../../../lib/utils/routes";
import TorusDialog from "../../components/torusdialogmodal"
import { signIn } from "next-auth/react";
import { AxiosService } from "../../../lib/utils/axiosService";
import DropDown from "../multiDropdownnew";
import { Tab, TabPanel } from 'react-aria-components';

interface LoginFormProps {
    variant?: "TP" | "CG";
}

function LoginForm({ variant = "TP" }: LoginFormProps) {
    const [clientList, setClientList] = useState<string[]>([]);
    const [client, setClient] = useState<any>("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [social, setSocial] = useState("");
    const [socialclient, setsocialclient] = useState<any>("");
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<"Individual" | "Teams">("Individual");


    const fetchClients = async () => {
        try {
            const res = await AxiosService.get(
                "/tp/getClientTenant?type=c"
            );
            if (res.status == 200) {
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
            const username = formData.get("username");
            const password = formData.get("password");

            if (client && username && password) {
                const res = await login({ client, username, password });
                if (res?.error) {
                    setLoading(false);
                    toast.error("failed to login , check credentials", {
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

    const passwordvisible = () => {
        setShowPassword(!showPassword);
    };
    const handlesociallogin = async () => {
        console.log(client, "dsfsdf", social);

        if (client) {
            console.log(client, "dsfsdf")
            await setServerCookie("client", client);

            await signIn(social, {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
            setOpen(false);
        }
        else {
            toast.error("No response")
        }

    };


    return (
        <div className="min-h-screen w-full bg-[#FFFFFF] border-none dark:bg-[#000000]">

            <h2 className="flex text-xl p-3 font-bold text-black dark:text-white" >
                <TorusLogo /> TORUS
            </h2>

            <Form action={handleFormSubmit} className="flex flex-col space-y-4 justify-center px-12">

                <div className="mt-8">
                    <h1 className="text-2xl font-bold text-black dark:text-white">
                        Log in
                    </h1>
                    <p className="text-[#000000] dark:text-white text-sm ">Enter your details to get started</p>
                </div>
                <div className="flex w-full bg-[#F4F5FA] rounded-lg p-1">
                    <Button
                        onPress={() => setSelectedOption("Individual")}
                        className={`px-4 py-2 w-1/2 transition-colors duration-700 ease-in-out ${selectedOption === "Individual" ? "bg-[#FFFFFF] text-black text-sm outline-none" : " text-black text-sm outline-none"}`}
                    >
                        Individual
                    </Button>
                    <Button
                        onPress={() => setSelectedOption("Teams")}
                        className={`px-4 py-2 w-1/2 transition-colors duration-700 ease-in-out ${selectedOption === "Teams" ? "bg-[#FFFFFF] text-black text-sm outline-none" : "] text-black text-sm outline-none"}`}
                    >
                        Team
                    </Button>
                </div>


                <div className="space-y-4 ">

                    {selectedOption === "Teams" && (
                        <div className="flex flex-col">
                            <Label htmlFor="tenant" className="text-[#000000] dark:text-white mb-1 text-sm">
                                Client
                            </Label>
                            <DropDown
                                triggerButton="Select Client"
                                selectedKeys={client}
                                setSelectedKeys={(client) => setClient(client)}
                                items={clientList}

                                classNames={{
                                    triggerButton: "w-full bg-[#D9D9D9] text-black rounded-lg text-sm font-medium mt-2 dark:bg-[#171717] dark:text-[#FFFFFF] ",
                                    popover: "w-[20%]",
                                }}

                            />

                        </div>
                    )}

                    <div className="flex flex-col focus:outline-none">
                        <Label
                            htmlFor="Email or Username"
                            className="text-black dark:text-white mb-1 text-sm "
                        >
                            Email or Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="eg:support@torus.com"
                            className=" bg-[#D9D9D9] text-sm outline-none pl-3  dark:bg-[#171717] dark:text-[#FFFFFF] text-[#000000] py-2 rounded-md w-full "
                        />
                    </div>
                    <div className="flex flex-col relative">
                        <Label htmlFor="Password" className="text-black dark:text-white mb-1 text-sm">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className=" bg-[#D9D9D9] pl-3 outline-none text-sm dark:text-[#FFFFFF] text-[#000000] dark:bg-[#171717]  py-2 rounded-md w-full"
                        />
                        <span
                            className="absolute bottom-8 right-4 "
                            onClick={passwordvisible}
                        >
                            {showPassword ? <BsEyeFill fill={getCookie("isDarkMode") ? "#FFFFFF" : "#000000"} /> : <BsEyeSlash fill={getCookie("isDarkMode") ? "#FFFFFF" : "#000000"} />}
                        </span>
                        <p className="text-black/35 dark:text-white text-sm">Forgot Password?</p>
                    </div>
                </div>


                <div className="flex justify-center mt-5 ">
                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="bg-[#0736C4] w-full text-white px-4 py-3 text-base disabled:bg-[#8c9ac4]  focus:outline-none rounded-lg"
                    >
                        Sign In
                    </Button>
                </div>
                {selectedOption == "Individual" && <div className="flex items-center justify-center dark:text-white mt-5 w-full">
                    <span className="h-px bg-gray-400 w-[40%] "></span>
                    <span className="text-gray-700 dark:text-white px-2">Or</span>
                    <span className="h-px bg-gray-400 w-[40%]"></span>
                </div>}
                {selectedOption === "Individual" && (

                    <TorusDialog
                        triggerElement={
                            <div className="flex w-full justify-between ">
                                <Button
                                    onPress={() => {
                                        setSocial("github");
                                        setOpen(true);
                                    }}
                                    className="bg-[#D9D9D9] py-2 dark:bg-[#171717] dark:text-white text-sm text-black px-6 flex items-center justify-center  focus:outline-none rounded-lg"
                                >
                                    <Gitbutton fill={getCookie("isDarkMode") ? "white" : "black"} />
                                    GitHub
                                </Button>
                                <Button
                                    onPress={() => {
                                        setSocial("google");
                                        setOpen(true);
                                    }}
                                    className="bg-[#D9D9D9] py-2 text-black text-sm dark:bg-[#171717] dark:text-white px-6 flex items-center justify-center  focus:outline-none rounded-lg"
                                >
                                    <Googlebutton />
                                    Google
                                </Button>
                            </div>

                        }
                        classNames={{ dialogClassName: "w-[405px] dark:bg-[#212121] dark:text-[#FFFFFF] p-4 rounded-xl bg-white focus:outline-none" }}
                    >
                        <Heading slot="title" className="text-xl font-bold text-center mb-10 ">Login with {social}</Heading>

                        <DropDown
                            triggerButton="Select Client"
                            selectedKeys={client}
                            setSelectedKeys={(client) => setClient(client)}
                            items={clientList}
                            classNames={{
                                triggerButton: "w-[90%] bg-[#D9D9D9] text-black rounded-lg text-sm font-medium mt-2 dark:bg-[#171717] dark:text-[#FFFFFF] ",
                                popover: "w-[20%] bg-[#F4F5FA] dark:bg-[#212121]",
                                listboxItem: "dark:bg-[#212121] dark:text-[#FFFFFF] ",
                            }}
                        />
                        <div className="flex justify-end mt-4">
                            <Button
                                onPress={handlesociallogin}
                                className="bg-gray-500 text-white text-sm  py-2 px-4  rounded  hover:bg-gray-600  focus:outline-none"
                            >
                                Submit
                            </Button>

                        </div>
                    </TorusDialog>
                )}
                <div className="text-center mt-5 ">
                    <p className="text-black dark:text-white text-sm">
                        Don't have an account?{" "}
                        <a href="#" className="text-black dark:text-white font-bold gap">
                            Sign Up
                        </a>
                    </p>
                </div>
            </Form>


        </div>
    );
}

export default LoginForm;



