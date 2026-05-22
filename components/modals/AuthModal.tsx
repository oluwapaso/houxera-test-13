"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '@/app/GlobalRedux/store'

import { MdClose } from 'react-icons/md';
import { BsInfoSquare } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { toggleAuthModal } from '@/app/GlobalRedux/user/userSlice';
import { BiLogIn, BiRefresh, BiUserPlus } from 'react-icons/bi';

const AuthModal = () => {

    const dispatch = useDispatch();
    const auth_modal = useSelector((state: RootState) => state.user.auth_modal);
    const [component, setComponent] = useState(<></>);

    useEffect(() => {
        const body = document.querySelector("body");
        if (auth_modal && auth_modal?.shown) {
            if (body) {
                body.style.overflow = "hidden";
            }
        } else {
            if (body) {
                body.style.overflow = "auto";
            }
        }
    }, [auth_modal]);

    const closeModal = () => {
        dispatch(toggleAuthModal({ shown: false }));
        toast.dismiss();
        const body = document.querySelector("body");
        if (body) {
            body.style.overflow = "auto";
        }
    }

    const PageIcon = () => {
        if (auth_modal.page == "Login") {
            return <BiLogIn size={18} />
        } else if (auth_modal.page == "Register") {
            return <BiUserPlus size={18} />
        } else if (auth_modal.page == "Reset Password") {
            return <BiRefresh size={18} />
        }
    }

    useEffect(() => {
        if (auth_modal.page == "Login") {
            setComponent(<>Login</>)
        } else if (auth_modal.page == "Register") {
            setComponent(<>Register</>)
        } else if (auth_modal.page == "Reset Password") {
            setComponent(<>Reset Password</>)
        }
    }, [auth_modal.page]);

    return ((auth_modal && auth_modal?.shown) ?
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-[150] overflow-auto backdrop-blur flex 
            justify-end items-start">
            <div className={`w-[650px] absolute top-0 right-0 bg-white m-auto h-[100dvh] overflow-hidden max-w-[95%] flex flex-col`}>
                <div className="w-full px-6 py-4 flex justify-between items-center relative bg-gray-50
                 border-b-2 border-gray-300">
                    <h2 className="font-semibold text-md flex-grow flex items-center">
                        <span className='w-full flex items-center space-x-2.5'>
                            {PageIcon()}
                            {auth_modal?.title}
                        </span>
                    </h2>

                    <div className="text-black flex justify-center items-center cursor-pointer self-start py-1 px-2 
                    bg-red-600 rounded hover:shadow-2xl"
                        onClick={closeModal}>
                        <MdClose size={25} className="font-bold text-white duration-300" />
                    </div>
                </div>

                <div className="flex flex-col items-center w-full mt-2-mb-2 overflow-x-hidden overflow-y-auto
                    scrollbar scrollbar-w-[12px] scrollbar-thumb-rounded-full scrollbar-thumb-amber-500 cursor-pointer"
                    id='lead_modal_scroll_area'>
                    {component}
                </div>
            </div>
        </dialog> : null
    )
}

export default AuthModal
