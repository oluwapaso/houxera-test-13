"use client"

import { Helpers } from '@/_lib/helper';
import { hidePageLoader, showPageLoader } from '@/app/GlobalRedux/app/appSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import { updateUserInfo, updateUserWholeState } from '@/app/GlobalRedux/user/userSlice';
import FloatingInput from '@/components/FloatingInput';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import { UserInfo } from '@/components/types';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FaCloudArrowUp } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const helpers = new Helpers();
const PrefrencePage = () => {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);

    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [userInfo, setUserInfo] = useState<any>({} as UserInfo);
    const [userLoaded, setUserLoaded] = useState<boolean>(false);
    const [userError, setUserError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [reseting, setIsReseting] = useState(false);
    const [sub_to_updates, setSubToUpdates] = useState(false);
    const [sub_to_mailing_lists, setSubToMailingLists] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prev_state: any) => {
            return {
                ...prev_state,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;
        const isCurrency = e.target.dataset.isCurrency === 'true';
        const isNumber = e.target.dataset.isNumber === 'true';
        const isPhone = e.target.dataset.isPhone === 'true';
        const maxLen = parseInt(e.target.dataset.maxLen as string);
        // const minNumber = parseInt(e.target.dataset.min as string); 

        setUserInfo((prev_val: any) => {
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

    const LoadUSerInfo = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "user_uid": user.user_info?.user_uid,
            "fields": "*",
        }

        const response = await window.MLS_Util.LoadUserInfo(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setUserInfo(response.data.user_info);
            setSubToUpdates(response.data.user_info.sub_to_updates == "Yes" ? true : false);
            setSubToMailingLists(response.data.user_info.sub_to_mailing_lists == "Yes" ? true : false);
        } else {
            setUserError(resp_message);
        }

        setUserLoaded(true);

    }

    const handleUpdateInfo = async () => {

        toast.dismiss()
        var receive_updates = "No"
        var join_mailing_lists = "No"

        if (sub_to_updates) {
            receive_updates = "Yes"
        }

        if (sub_to_mailing_lists) {
            join_mailing_lists = "Yes"
        }

        try {
            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                "user_uid": user.user_info?.user_uid,
                ...userInfo,
                "sub_to_updates": receive_updates,
                "sub_to_mailing_lists": join_mailing_lists,
                "birthday": moment(userInfo.birthday).format("YYYY-MM-DD")
            }

            setIsSubmitting(true);
            dispatch(showPageLoader());
            const response = await window.MLS_Util.UpdateUserInfo(payload);

            let resp_message = response.message;
            let status_code = response.status_code;
            if (status_code == 200) {

                toast.success(`Account info successfully updated`, {
                    position: "top-center",
                    theme: "colored",
                });

                dispatch(updateUserInfo(userInfo));

            } else {
                toast.error(`${resp_message}`, {
                    position: "top-center",
                    theme: "colored",
                });
            }

        } catch (error) {
            toast.error(`${error}`, {
                position: "top-center",
                theme: "colored",
            });
        } finally {
            setIsSubmitting(false);
            dispatch(hidePageLoader());
        }

    }

    const resetPassword = async () => {

        toast.dismiss()
        try {
            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                "email": user.user_info?.email,
            }

            setIsSubmitting(true);
            dispatch(showPageLoader());
            const response = await window.MLS_Util.StartPasswordReset(payload);

            let resp_message = response.message;
            let status_code = response.status_code;
            if (status_code == 200) {

                toast.success(`Password reset link successfully sent to your email address`, {
                    position: "top-center",
                    theme: "colored",
                });

                dispatch(updateUserWholeState({ isLogged: false, user_info: {} }));
                router.push(`${themeSett.theme_prefix}/home`);
                dispatch(showPageLoader());

            } else {
                dispatch(hidePageLoader());
                toast.error(`${resp_message}`, {
                    position: "top-center",
                    theme: "colored",
                });
            }

        } catch (error) {
            dispatch(hidePageLoader());
            toast.error(`${error}`, {
                position: "top-center",
                theme: "colored",
            });
        } finally {
            setIsSubmitting(false);
        }

    }

    const deleteAccount = async () => {
        const result = await Swal.fire({
            title: "This action will be permanent and data cannot be recovered after deletion.",
            text: "Are you sure you want to proceed?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed',
        });

        if (result.isConfirmed) {

            toast.dismiss()
            try {
                const payload = {
                    "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                    "user_uid": user.user_info?.user_uid,
                    "email": user.user_info?.email,
                }

                setIsSubmitting(true);
                dispatch(showPageLoader());
                const response = await window.MLS_Util.DeleteUserAccount(payload);

                let resp_message = response.message;
                let status_code = response.status_code;
                if (status_code == 200) {

                    toast.success(`Account successfully deleted`, {
                        position: "top-center",
                        theme: "colored",
                    });

                    dispatch(updateUserWholeState({ isLogged: false, user_info: {} }));
                    router.push(`${themeSett.theme_prefix}/home`);
                    dispatch(showPageLoader());

                } else {
                    dispatch(hidePageLoader());
                    toast.error(`${resp_message}`, {
                        position: "top-center",
                        theme: "colored",
                    });
                }

            } catch (error) {
                dispatch(hidePageLoader());
                toast.error(`${error}`, {
                    position: "top-center",
                    theme: "colored",
                });
            } finally {
                setIsSubmitting(false);
            }

        } else {
            // Handle cancel action
            console.log('Canceled');
        }

    }

    useEffect(() => {

        dispatch(hidePageLoader());

        if (window.MLS_Util) {
            // window.MLS_Util.Init(process.env.NEXT_PUBLIC_API_KEY, process.env.NEXT_PUBLIC_ACCOUNT_ID);
            LoadUSerInfo();
        }

    }, [window.MLS_Util]);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (!themeSett) {
        return (<div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
            <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
        </div>)
    }

    if (themeSett) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <NavVar1 transparent={false} />
                <main className="w-full -mt-20">

                    <div className='container mx-auto flex items-center justify-center pt-32 pb-20'>

                        <div className=' flex flex-col w-full max-w-[750px]'>
                            <div className='w-full font-semibold text-xl xs:text-2xl mb-2'>Account Details</div>
                            <div className='w-full bg-white drop-shadow-2xl rounded py-8 px-6'>
                                <div className='w-full flex flex-col'>

                                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>

                                        <div className='col-span-1 sm:col-span-1'>
                                            <FloatingInput name='firstname' label='First Name' placeholder='First Name'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.firstname}
                                                handleBlur={(e) => handleInputBlur(e)} required />
                                        </div>

                                        <div className='col-span-1 sm:col-span-1'>
                                            <FloatingInput name='lastname' label='Last Name' placeholder='Last Name'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.lastname}
                                                handleBlur={(e) => handleInputBlur(e)} required />
                                        </div>

                                        <div className='col-span-1 sm:col-span-2'>
                                            <FloatingInput name='email' label='Primary Email' placeholder='Primary Email'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.email}
                                                handleBlur={(e) => handleInputBlur(e)} required />
                                        </div>

                                        <div className='col-span-1 sm:col-span-2'>
                                            <FloatingInput name='secondary_email' label='Secondary Email' placeholder='Secondary Email'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.secondary_email}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='phone_1' label='Phone 1' placeholder='Phone 1'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.phone_1}
                                                handleBlur={(e) => handleInputBlur(e)} required data-is-phone />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='phone_2' label='Phone 2' placeholder='Phone 2'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.phone_2}
                                                handleBlur={(e) => handleInputBlur(e)} data-is-phone />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='work_phone' label='Work Phone' placeholder='Work Phone'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.work_phone}
                                                handleBlur={(e) => handleInputBlur(e)} data-is-phone />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='birthday' label='Birthday' placeholder='Birthday'
                                                handleChange={(e) => handleInputChange(e)} value={moment(userInfo.birthday).format("DD-MM-YYYY")}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1 sm:col-span-2'>
                                            <FloatingInput name='street_address' label='Street Address' placeholder='Street Address'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.street_address}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='city' label='City' placeholder='City'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.city}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='state' label='State' placeholder='State'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.state}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='facebook' label='Facebook' placeholder='Facebook'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.facebook}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='linkedin' label='Linkedin' placeholder='Linkedin'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.linkedin}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='twitter' label='X(Twitter)' placeholder='X(Twitter)'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.twitter}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='tiktok' label='TikTok' placeholder='TikTok'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.tiktok}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='whatsapp' label='Whatsapp' placeholder='Whatsapp'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.whatsapp}
                                                handleBlur={(e) => handleInputBlur(e)} data-is-phone />
                                        </div>

                                        <div className='col-span-1'>
                                            <FloatingInput name='profession' label='Profession' placeholder='Profession'
                                                handleChange={(e) => handleInputChange(e)} value={userInfo.profession}
                                                handleBlur={(e) => handleInputBlur(e)} />
                                        </div>
                                    </div>

                                    <div className='w-full flex flex-col mt-10'>

                                        <h1 className='w-full font-play-fair-display text-2xl'>Subscription Information</h1>
                                        <div className='w-full mt-2'>

                                            <div className='w-full mt-2 mb-2 flex items-center select-none -ml-[10px]'>
                                                <input type='checkbox' className='styled-checkbox menu_cb' name={`sub_to_updates`} id={`sub_to_updates`}
                                                    onChange={(e) => setSubToUpdates(e.target.checked)} checked={sub_to_updates} />
                                                <label htmlFor='sub_to_updates' className='flex w-full'>
                                                    <span>Yes, I would like to receive listing updates matching my saved search criteria.</span>
                                                </label>
                                            </div>

                                            <div className='w-full mt-2 mb-2 flex items-center select-none -ml-[10px]'>
                                                <input type='checkbox' className='styled-checkbox menu_cb' name={`sub_to_mailing_lists`} id={`sub_to_mailing_lists`}
                                                    onChange={(e) => setSubToMailingLists(e.target.checked)} checked={sub_to_mailing_lists} />
                                                <label htmlFor='sub_to_mailing_lists' className='flex w-full'>
                                                    <div className=' flex flex-col'>
                                                        <span>I consent to receiving emails containing real estate related information from this site.</span>
                                                        <span>I understand that I can unsubscribe at any time.</span>
                                                    </div>
                                                </label>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='w-full border-b border-gray-200 dark:border-gray-600 my-10'></div>

                            <div className={` w-full flex justify-end`}>
                                <div className={`bg-${themeSett.secondary_color}-600 text-white flex items-center justify-center py-3 
                                    px-6 font-medium mr-2 hover:bg-${themeSett.secondary_color}-700 hover:drop-shadow-xl rounded 
                                    cursor-pointer`} onClick={() => { dispatch(showPageLoader()); router.back(); }}>
                                    <BsArrowLeftShort className='mr-1 !text-2xl' /> <span>Back</span> </div>

                                {!isSubmitting ?
                                    <div className={`bg-${themeSett.primary_color}-700 py-3 px-6 text-white float-right 
                                    hover:bg-${themeSett.primary_color}-600 hover:drop-shadow-md 
                                    rounded cursor-pointer flex items-center`} onClick={handleUpdateInfo}>
                                        <FaCloudArrowUp size={20} className='mr-2' /> <span>Update Info</span>
                                    </div>
                                    : <div className={`border-2 border-${themeSett.primary_color}-700 
                                        text-${themeSett.primary_color}-700 text-center py-4 px-4 rounded flex items-center 
                                        justify-center cursor-not-allowed font-medium`}>
                                        <span>Updating... Please Wait</span>
                                        <AiOutlineLoading3Quarters size={16} className='animate-spin ml-2' />
                                    </div>
                                }
                            </div>


                            <div className='spacer mt-16'></div>
                            <div className='w-full font-semibold text-xl xs:text-2xl mb-2'>Advanced Settings</div>
                            <div className='w-full bg-white drop-shadow-2xl rounded py-8 px-6'>
                                <div className='w-full flex flex-col'>

                                    <h1 className='w-full font-play-fair-display text-2xl'>Reset Password</h1>
                                    <div className='w-full'>
                                        <p className='mt-2 w-full'>If you would still like to send a request to have your account deleted you can click the "Delete My Account"
                                            button below.
                                        </p>
                                        <div className='w-full mt-4'>
                                            {!reseting
                                                ? <div className={`w-[200px] flex justify-center items-center py-3 px-4 bg-${themeSett.secondary_color}-600 
                                                text-white cursor-pointer hover:shadow-xl uppercase text-sm rounded`}
                                                    onClick={resetPassword}>Reset Password</div>
                                                : <div className='w-[200px] flex justify-center items-center py-3 px-4 bg-red-400 
                                                    text-white cursor-not-allowed uppercase text-sm'>
                                                    <AiOutlineLoading3Quarters size={17} className='mr-2' /> <span>Please wait...</span>
                                                </div>
                                            }

                                        </div>

                                    </div>

                                    <h1 className='w-full font-play-fair-display text-2xl md:text-2xl sm:text-2xl mt-10'>Delete Account</h1>
                                    <div className='w-full mt-2 font-normal'>
                                        <p className='w-full'>If you do not want to use this website anymore and you would like your account to be deleted, we're here to help.
                                            Please note: You will not be able to reactivate your account to access any data added to your account including
                                            saved searches, listings and messages.
                                        </p>
                                        <p className='mt-4 w-full'>If you would still like to send a request to have your account deleted you can click the "Delete My Account"
                                            button below.
                                        </p>

                                        <div className='w-full mt-4'>
                                            {!isDeleting
                                                ? <div className='w-[200px] flex justify-center items-center py-3 px-4 bg-red-600 text-white 
                                                    cursor-pointer hover:shadow-xl uppercase text-sm rounded' onClick={deleteAccount}>Delete My Account</div>
                                                : <div className='w-[200px] flex justify-center items-center py-3 px-4 bg-red-400 text-white 
                                                    cursor-not-allowed uppercase text-sm' onClick={deleteAccount}>
                                                    <AiOutlineLoading3Quarters size={17} className='mr-2' /> <span>Please wait...</span>
                                                </div>
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>


                <FooterVar1 />
            </div>
        )
    }
}

export default PrefrencePage
