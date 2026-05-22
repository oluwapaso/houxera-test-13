"use client"

import { updateUserInfo, updateUserWholeState } from "@/app/GlobalRedux/user/userSlice";
import { RootState } from "@/app/GlobalRedux/store";
import CustomLink from "@/components/CustomLink";
import { UserInfo } from "@/components/types";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helpers } from "@/_lib/helper";
import { hidePageLoader } from "@/app/GlobalRedux/app/appSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { BiReset } from "react-icons/bi";
import FloatingInput from "@/components/FloatingInput";
import CustomLinkMain from "@/components/CustomLink";
import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";

const helpers = new Helpers()
const ResetPasswordPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useSelector((state: RootState) => state.user);

    const theme = useSelector((state: RootState) => state.theme);
    const account_email = searchParams?.get("email") as string;
    const token = searchParams?.get("token") as string;

    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfPass] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordReset = async () => {
        if (window.MLS_Util) {

            toast.dismiss();
            window.MLS_Util.Init(process.env.NEXT_PUBLIC_API_KEY, process.env.NEXT_PUBLIC_ACCOUNT_ID, process.env.NEXT_PUBLIC_MLS_NUMBER, process.env.NEXT_PUBLIC_PROPERTY_DETAILS_EP);

            toast.dismiss();
            if (!helpers.validateEmail(account_email) || token == "") {
                toast.error("Account email or token is missing", {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            let error_msg: string = ""
            if (password.length < 5) {
                error_msg = "Password can't be less that 5 characters"
            } else if (password != confirm_password) {
                error_msg = "Password must match"
            }

            if (error_msg != "") {
                toast.error(error_msg, {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                "email": account_email,
                "reset_token": token,
                "password": password,
                "confirm_password": confirm_password,
            }

            try {

                setIsSubmitting(true);
                const response = await window.MLS_Util.UpdateUserPassword(payload);

                let resp_message = response.message;
                let status_code = response.status_code;
                if (status_code == 200) {

                    toast.success("Password successfully updated.", {
                        position: "top-center",
                        theme: "colored"
                    });

                    dispatch(updateUserInfo({} as UserInfo));
                    dispatch(updateUserWholeState({ isLogged: false }));
                    setPassword("");
                    setConfPass("");

                } else {
                    setIsSubmitting(false);
                    toast.error(`${resp_message || resp_message.message}`, {
                        position: "top-center",
                        theme: "colored"
                    });
                }

            } catch (error) {
                setIsSubmitting(false);
                toast.error(`${error}`, {
                    position: "top-center",
                    theme: "colored"
                });
            } finally {
                setIsSubmitting(false);
            }

        }
    }

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    useEffect(() => {
        dispatch(hidePageLoader());
    }, []);

    if (user.isLogged) {
        router.push(`${themeSett.theme_prefix}/home`);
    } else {

        if (themeSett) {

            return (
                <section className='w-full h-svh'>

                    <div className='w-full grid grid-cols-2 min-h-full bg-gray-50-'>
                        <div data-has-bg="yes" className="h-[100dvh] sticky top-0"
                            style={{
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                backgroundRepeat: `no-repeat`,
                                backgroundImage: "url('/green-bay-jpg.jpg')",
                            }}>

                            <div className='w-full p-5 relative z-20'>
                                <CustomLinkMain href={`${themeSett.theme_prefix}/home`} className="font-medium text-2xl">
                                    <Image src={`/logo-light.png`} height={50} width={150} className="" alt="Nigeria MLS and IDX provider" />
                                </CustomLinkMain>
                            </div>

                            <div className="absolute w-full top-0 bottom-0 h-full z-10 bg-gradient-to-t from-transparent to-black/50 from-80%"></div>
                            <div className="absolute w-full top-0 bottom-0 h-full z-10 bg-gradient-to-b from-transparent to-black/50 from-80%"></div>
                        </div>

                        <div className='container mx-auto flex items-center justify-center py-16'>

                            <div className=' flex flex-col w-full max-w-[550px]'>
                                <div className='w-full font-medium text-xl xs:text-2xl mb-2'>Set new password</div>
                                <div className='bg-white'>
                                    <div className='w-full flex flex-col'>

                                        <div className='w-full'>
                                            <FloatingInput name='password' label='New Password' placeholder='New Password' type="password"
                                                handleChange={(e) => setPassword(e.target.value)} value={password} required />
                                        </div>

                                        <div className='w-full mt-4'>
                                            <FloatingInput name='confirm_password' label='Confirm New Password' type="password" required
                                                placeholder='onfirm New Password' handleChange={(e) => setConfPass(e.target.value)}
                                                value={confirm_password} />
                                        </div>

                                        <div className='w-full mt-8'>
                                            {!isSubmitting ?
                                                <button className={`w-full cursor-pointer bg-${themeSett.primary_color}-700 text-white 
                                                flex items-center justify-center py-4 px-4 rounded space-x-1.5 font-medium 
                                                hover:shadow-2xl hover:bg-${themeSett.primary_color}-800`}
                                                    onClick={handlePasswordReset}> <FiUploadCloud size={18} /> <span>Update Password</span> </button> :
                                                <div className={`w-full border-2 border-${themeSett.primary_color}-700 
                                                text-${themeSett.primary_color}-700 text-center py-4 px-4 rounded flex items-center 
                                                justify-center cursor-not-allowed font-medium`}>
                                                    <span>Updating Password... Please Wait</span> <AiOutlineLoading3Quarters size={16}
                                                        className='animate-spin ml-2' />
                                                </div>
                                            }
                                        </div>

                                        <div className='w-full mt-8'>
                                            Done updating your
                                            password? <CustomLink href={`${themeSett.theme_prefix}/login`} className='text-sky-700'>
                                                Click here to login
                                            </CustomLink>
                                        </div>

                                        <div className='w-full mt-4'>
                                            Don't have an account
                                            yet? <CustomLink href={`${themeSett.theme_prefix}/sign-up`}
                                                className='text-sky-700'>Click here to sign up</CustomLink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
            )
        }
    }
}

export default ResetPasswordPage