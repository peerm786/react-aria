
"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-aria-components"
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
    const [data, setData] = useState<any>({
        client: "",
        username: "",
        password: "",
    });


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
            const client = formData.get("client");
            const username = formData.get("username");
            const password = formData.get("password");

            if (client && username && password) {
                const res = await login({ client, username, password });
                console.log(res, "dfgfd")
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
        <div className="min-h-screen w-full justify-center flex items-center bg-[#FFFFFF] border-none dark:bg-[#000000]">
            <Form action={handleFormSubmit} className="mr-11 " >
                <div className="ml-11 mb-3">
                    <h2 className=" flex text-2xl font-bold text-black dark:text-white" >
                        <TorusLogo /> TORUS
                    </h2>
                </div>

                <div className=" flex flex-col mb-6 gap-1 ml-14">
                    <h1 className="text-xl font-bold text-black dark:text-white ml-5 ">
                        Log in
                    </h1>
                    <p className="text-[#000000] dark:text-white text-sm ml-5">Enter your details to get started</p>
                </div>
                <div className="space-y-4 ml-12">
                    <div className="flex flex-col">
                        <Label htmlFor="tenant" className="text-black dark:text-white mb-1 text-sm ml-5">
                            Client
                        </Label>
                        <DropDown
                            triggerButton="Select Client"
                            selectedKeys={client}
                            setSelectedKeys={(client) => setClient(client)}
                            items={clientList}

                            classNames={{
                                triggerButton: "w-[90%] bg-[#D9D9D9] ml-5 rounded-lg text-sm ${client ? 'text-black' : 'text-gray-400'} text-gray-400 font-medium mt-2 dark:bg-[#171717] dark:text-[#FFFFFF] ",
                                popover: "w-[20%]",
                                // listbox: "w-60 h-40 overflow-y-auto",
                                listboxItem: "",
                            }}

                        />
                    </div>
                    <div className="flex flex-col focus:outline-none">
                        <Label
                            htmlFor="Email or Username"
                            className="text-black dark:text-white mb-1 text-sm ml-5"
                        >
                            Email or Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="eg:support@torus.com"
                            className=" text-sm pl-3 bg-[#D9D9D9] dark:bg-[#171717] dark:text-[#FFFFFF] text-[#000000] py-2 rounded-md w-[90%] ml-5"
                        />
                    </div>
                    <div className="flex flex-col relative">
                        <Label htmlFor="Password" className="text-black dark:text-white mb-1 text-sm ml-7">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className=" text-sm pl-3 bg-[#D9D9D9] dark:text-[#FFFFFF] text-[#000000] dark:bg-[#171717]  py-2 rounded-md w-[90%] ml-5"
                        />
                        <span
                            className="absolute bottom-2 right-6 "
                            onClick={passwordvisible}
                        >
                            {showPassword ? <BsEyeFill fill={getCookie("isDarkMode") ? "#FFFFFF" : "#000000"} /> : <BsEyeSlash fill={getCookie("isDarkMode") ? "#FFFFFF" : "#000000"} />}
                        </span>
                    </div>
                </div>

                <p className="text-black dark:text-white text-sm ml-20  mt-5">Forgot Password?</p>
                <div className="flex justify-center ml-14 mt-5 ">
                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="bg-[#0736C4] text-white px-4 py-2 w-[90%] disabled:bg-[#8c9ac4]  focus:outline-none"
                    >
                        Sign In
                    </Button>
                </div>
                <div className="flex items-center justify-center dark:text-white ml-[62px] mt-5">
                    <span className="h-px bg-gray-400 w-[40%] "></span>
                    <span className="text-gray-700 dark:text-white px-2">Or</span>
                    <span className="h-px bg-gray-400 w-[40%]"></span>
                </div>

                <TorusDialog
                    triggerElement={
                        <div className="flex flex-row items-center gap-5 ml-5 mt-5 ">
                            <Button
                                onPress={() => {
                                    setSocial("github");
                                    setOpen(true);
                                }}
                                className="bg-[#D9D9D9] py-2 dark:bg-[#171717] dark:text-white text-sm text-black px-6 ml-14 flex items-center justify-center  focus:outline-none"
                            >
                                <Gitbutton fill={getCookie("isDarkMode") ? "white" : "black"} />
                                GitHub
                            </Button>
                            <Button
                                onPress={() => {
                                    setSocial("google");
                                    setOpen(true);
                                }}
                                className="bg-[#D9D9D9] py-2 text-black text-sm dark:bg-[#171717] dark:text-white px-6 mr-4 flex items-center justify-center  focus:outline-none"
                            >
                                <Googlebutton />
                                Google
                            </Button>
                        </div>

                    }
                    classNames={{ dialogClassName: "w-[405px]  bg-white focus:outline-none" }}
                >
                    <Heading slot="title" className="text-xl font-bold ml-28 mb-10 ">Login with {social}</Heading>

                    <DropDown
                        triggerButton="Select Client"
                        selectedKeys={client}
                        setSelectedKeys={(client) => setClient(client)}
                        items={clientList}

                        classNames={{
                            triggerButton: "w-[90%] ml-5 rounded-lg text-sm  mt-2 bg-[#D9D9D9] dark:text-[#FFFFFF] text-[#000000] dark:bg-[#171717]  ",
                            popover: "w-[10%]",
                            listboxItem: "",
                        }}

                    />
                    <div className="flex mt-11 justify-between ml-44 ">
                        <Button
                            onPress={handlesociallogin}
                            className="bg-gray-500 text-white text-sm px-4 py-2 rounded  hover:bg-gray-600  focus:outline-none"
                        >
                            Submit
                        </Button>

                    </div>
                </TorusDialog>

                <div className="text-center ml-11 mt-5 ">
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

