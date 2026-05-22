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
import FloatingInput from "@/components/FloatingInput";
import CustomLinkMain from "@/components/CustomLink";
import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
import useRequiredFields from "@/_hooks/useReqiredFields";

const helpers = new Helpers()
const SignUpPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);

    const theme = useSelector((state: RootState) => state.theme);

    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reg_params = {
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
    }

    const [RegParams, setRegParams] = useState(reg_params);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegParams((prev_state) => {
            return {
                ...prev_state,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;
        const isCurrency = e.target.dataset.isCurrency === 'true';
        const isNumber = e.target.dataset.isNumber === 'true';
        const isPhone = e.target.dataset.isPhone === 'true';
        const maxLen = parseInt(e.target.dataset.maxLen as string);
        // const minNumber = parseInt(e.target.dataset.min as string); 

        setRegParams((prev_val: any) => {
            const prevVal = { ...prev_val }

            let newValue = value;
            if (isNumber) {
                newValue = helpers.formatWholeNumber(value); ///minNumber.toString() 
            } else if (isPhone && value != "") {
                newValue = helpers.format_Nigeria_PhoneNumber(value);
            }

            if (maxLen && maxLen > 0) {
                newValue = newValue.substring(0, maxLen);
            }

            return {
                ...prevVal,
                [e.target.name]: newValue,
            }
        })
    }

    const handleRegister = async () => {
        if (window.MLS_Util) {

            toast.dismiss();
            const { validateFields, errorFields } = useRequiredFields();
            window.MLS_Util.Init(process.env.NEXT_PUBLIC_API_KEY, process.env.NEXT_PUBLIC_ACCOUNT_ID, process.env.NEXT_PUBLIC_MLS_NUMBER, process.env.NEXT_PUBLIC_PROPERTY_DETAILS_EP);

            toast.dismiss();
            if (!helpers.validateEmail(RegParams.email)) {
                errorFields(["email"]);
                toast.error("Provide a valid email address", {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            let error_msg: string = ""
            if (RegParams.password.length < 5) {
                error_msg = "Password can't be less that 5 characters"
                errorFields(["password"]);
            } else if (RegParams.password != RegParams.confirm_password) {
                error_msg = "Password must match"
                errorFields(["password", "confirm_password"]);
            }

            if (error_msg != "") {
                toast.error(error_msg, {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            var fields = ['firstname', 'lastname', 'phone_number'];
            const isValid = validateFields(fields);

            if (!isValid) {
                toast.error("Required field can't be empty", {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                "firstname": RegParams.firstname,
                "lastname": RegParams.lastname,
                "email": RegParams.email,
                "phone_number": RegParams.phone_number,
                "password": RegParams.password,
                "confirm_password": RegParams.confirm_password,
            }

            try {

                setIsSubmitting(true);
                const response = await window.MLS_Util.RegisterUser(payload);

                let resp_message = response.message;
                let status_code = response.status_code;
                if (status_code == 200) {

                    toast.success("Account registered successfully, you can now login with your credentials.", {
                        position: "top-center",
                        theme: "colored"
                    });

                    dispatch(updateUserInfo({} as UserInfo));
                    dispatch(updateUserWholeState({ isLogged: false }));
                    setRegParams(reg_params);

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
                                backgroundImage: "url('/lehigh-cers-jpeg.jpg')",
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
                                <div className='w-full font-medium text-xl xs:text-2xl mb-2'>Sign Up</div>
                                <div className='bg-white'>
                                    <div className='w-full flex flex-col'>

                                        <div className="w-full mt-4 grid grid-cols-2 gap-4">
                                            <div className=''>
                                                <FloatingInput name='firstname' label='Firstname' placeholder='Firstname'
                                                    handleChange={(e) => handleChange(e)} value={RegParams.firstname} required />
                                            </div>

                                            <div className=''>
                                                <FloatingInput name='lastname' label='Lastname' placeholder='Lastname'
                                                    handleChange={(e) => handleChange(e)} value={RegParams.lastname} required />
                                            </div>
                                        </div>

                                        <div className='w-full mt-4'>
                                            <FloatingInput name='email' label='Email Adddress' placeholder='Email Adddress'
                                                handleChange={(e) => handleChange(e)} value={RegParams.email} required />
                                        </div>

                                        <div className='w-full mt-4'>
                                            <FloatingInput name='phone_number' label='Phone Number' placeholder='Phone Number'
                                                handleChange={(e) => handleChange(e)} value={RegParams.phone_number}
                                                handleBlur={(e) => handleBlur(e)} required data-is-phone />
                                        </div>

                                        <div className='w-full mt-4'>
                                            <FloatingInput name='password' label='Password' placeholder='Password' type="password"
                                                handleChange={(e) => handleChange(e)} value={RegParams.password} required />
                                        </div>

                                        <div className='w-full mt-4'>
                                            <FloatingInput name='confirm_password' label='Confirm Password' type="password" required
                                                placeholder='onfirm New Password' handleChange={(e) => handleChange(e)}
                                                value={RegParams.confirm_password} />
                                        </div>

                                        <div className='w-full mt-8'>
                                            {!isSubmitting ?
                                                <button className={`w-full cursor-pointer bg-${themeSett.primary_color}-700 text-white 
                                                flex items-center justify-center py-4 px-4 rounded space-x-1.5 font-medium 
                                                hover:shadow-2xl hover:bg-${themeSett.primary_color}-800`}
                                                    onClick={handleRegister}> <FiUploadCloud size={18} /> <span>Register</span> </button> :
                                                <div className={`w-full border-2 border-${themeSett.primary_color}-700 
                                                text-${themeSett.primary_color}-700 text-center py-4 px-4 rounded flex items-center 
                                                justify-center cursor-not-allowed font-medium`}>
                                                    <span>Signing Up... Please Wait</span> <AiOutlineLoading3Quarters size={16}
                                                        className='animate-spin ml-2' />
                                                </div>
                                            }
                                        </div>

                                        <div className='w-full mt-8'>
                                            Already have an
                                            account? <CustomLink href={`${themeSett.theme_prefix}/login`} className='text-sky-700'>
                                                Click here to login
                                            </CustomLink>
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

export default SignUpPage