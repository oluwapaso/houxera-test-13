"use client"

import CustomLink from '@/components/CustomLink'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/GlobalRedux/store'
import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice'
import { updateDataCounts, updateFavorites, updateTours, updateUserInfo, updateUserWholeState } from '@/app/GlobalRedux/user/userSlice'
import FloatingInput from '@/components/FloatingInput'
import { BiLogIn } from 'react-icons/bi'
import CustomLinkMain from '@/components/CustomLink'
import Image from 'next/image'

const LoginPage = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const redirect = searchParams?.get("redirect") as string || "/home";

    const dispatch = useDispatch<AppDispatch>();
    const auth_params = {
        username: "",
        password: ""
    }

    const [AuthParams, setAuthParams] = useState(auth_params);
    const [themeSett, setThemeSett] = useState<any | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthParams((prev_state) => {
            return {
                ...prev_state,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleLogin = async () => {
        if (window.MLS_Util) {

            toast.dismiss();
            window.MLS_Util.Init(process.env.NEXT_PUBLIC_API_KEY, process.env.NEXT_PUBLIC_ACCOUNT_ID, process.env.NEXT_PUBLIC_MLS_NUMBER, process.env.NEXT_PUBLIC_PROPERTY_DETAILS_EP);

            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                ...AuthParams,
            }

            try {

                dispatch(updateUserWholeState({ isLogginIn: true }));
                const response = await window.MLS_Util.UserLogin(payload);

                let resp_message = response.message;
                let status_code = response.status_code;
                if (status_code == 200) {

                    dispatch(updateUserInfo(response.data.user_info));
                    dispatch(updateFavorites(response.data.user_favorites || []));
                    dispatch(updateTours(response.data.user_tours || []));

                    dispatch(updateDataCounts({
                        "favorites": response.data.total_favorites,
                        "upcoming_tours": response.data.upcoming_tours
                    }));

                    dispatch(updateUserWholeState({ isLogged: true }));
                    router.push(`${themeSett.theme_prefix}/${redirect}`);

                } else {
                    dispatch(updateUserWholeState({ isLogged: false }));
                    toast.error(`${resp_message || resp_message.message}`, {
                        position: "top-center",
                        theme: "colored"
                    });
                }

            } catch (error) {
                dispatch(updateUserWholeState({ isLogged: false }));
                toast.error(`${error}`, {
                    position: "top-center",
                    theme: "colored"
                });
            } finally {
                dispatch(updateUserWholeState({ isLogginIn: false }));
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
                                backgroundImage: "url('/ave-maria_low.jpg')",
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
                                <div className='w-full font-medium text-xl xs:text-2xl mb-2'>Log into your account</div>
                                <div className='bg-white'>
                                    <div className='w-full flex flex-col'>

                                        <div className='w-full'>
                                            <FloatingInput name='username' label='Email' placeholder='Email'
                                                handleChange={(e) => handleChange(e)} value={AuthParams.username} required />
                                        </div>

                                        <div className='w-full mt-4'>
                                            <FloatingInput type='password' name='password' label='Password' placeholder='Password'
                                                handleChange={(e) => handleChange(e)} value={AuthParams.password} required />
                                        </div>

                                        <div className='w-full mt-8'>
                                            {!user.isLogginIn ?
                                                <button className={`w-full cursor-pointer bg-${themeSett.primary_color}-700 text-white 
                                                flex items-center justify-center py-4 px-4 rounded space-x-1.5 font-medium 
                                                hover:shadow-2xl hover:bg-${themeSett.primary_color}-800`}
                                                    onClick={handleLogin}> <span>Login</span> <BiLogIn size={16} /> </button> :
                                                <div className={`w-full border-2 border-${themeSett.primary_color}-700 
                                                text-${themeSett.primary_color}-700 text-center py-4 px-4 rounded flex items-center 
                                                justify-center cursor-not-allowed font-medium`}>
                                                    <span>Login In... Please Wait</span> <AiOutlineLoading3Quarters size={16}
                                                        className='animate-spin ml-2' />
                                                </div>
                                            }
                                        </div>

                                        <div className='w-full mt-8'>
                                            <CustomLink href={`${themeSett.theme_prefix}/forgot-password`} className='text-sky-700'>Forgot password?</CustomLink>
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

export default LoginPage