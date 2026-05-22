"use client"

import { Helpers } from '@/_lib/helper';
import { hidePageLoader, showPageLoader } from '@/app/GlobalRedux/app/appSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import ImageWithFallback from '@/components/ImageWithFallback';
import Modal from '@/components/modals/Modal';
import NavVar1 from '@/components/navs/NavVar-1';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiCalendar, BiRefresh } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import { FaArrowLeftLong, FaComments, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

import { BsTwitterX } from 'react-icons/bs';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import FooterVar1 from '@/components/footers/FooterVar-1';
import CommentCardVar2 from '@/components/blog-cards/CommentCardVar-2';
import CommentBox from '@/components/blog-cards/CommentBox';
import SideAds from '@/components/ads/SideAds';

const helpers = new Helpers();
const ServiceDetailsPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const slug = params?.slug as string;
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [page_url, setPageURL] = useState("");

    const [serviceInfo, setServiceInfo] = useState<any>({});
    const [serviceInfoLoaded, setServiceInfoLoaded] = useState<boolean>(false);
    const [serviceInfoError, setServiceInfoError] = useState("");

    const LoadServicesDetails = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "slug": slug,
            "user_uid": user.user_info?.user_uid,
        }

        const response = await window.MLS_Util.LoadServiceDetails(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setServiceInfo(response.data.service);
        } else {
            setServiceInfoError(resp_message)
        }

        setServiceInfoLoaded(true);

    }

    useEffect(() => {

        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            LoadServicesDetails();
        }

    }, [window.MLS_Util]);

    useEffect(() => {
        setPageURL(`${window.location.href}/service-details/${slug}`);
    }, []);

    //Initialize Ads
    useEffect(() => {
        if (window.MLS_Util) {
            const to = setTimeout(() => {
                window.MLS_Util.InitializeSideAds();
            }, 1500);

            return () => clearTimeout(to);
        }
    }, [window.MLS_Util]);

    useEffect(() => {
        //Always start at page top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    const crumb = <div className='font-play-fair-display text-4xl !text-white'>
        {
            serviceInfoLoaded ? (
                serviceInfo ? (
                    serviceInfo.title
                ) : ""
            ) : ""
        }
    </div>;

    if (themeSett && themeSett != null) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                {/**  ======================= Header Area Starts ====================== **/}
                <header className="w-full h-[35dvh] bg-gray-100 relative">

                    <div data-has-bg="yes" className=" h-full flex flex-col justify-end pb-6"
                        style={{
                            backgroundSize: `cover`,
                            backgroundPosition: `center`,
                            backgroundRepeat: `none`,
                            backgroundImage: `url(${(serviceInfo.header_image_large && serviceInfo.header_image_large != "")
                                ? `../../${serviceInfo?.header_image_large}` : "../no-service-image-added.png"})`, //Remove ../../, the  ../../ is added for testing
                        }}>

                        <div className={`container mx-auto max-w-[1200px] px-3 xl:px-0 text-left z-20 flex flex-col`}>
                            <div className={`w-full font-medium *:text-white xl:text-shadow-primary`}>{crumb}</div>
                            <div className={`w-full text-white line-clamp-2 `}>{serviceInfo?.excerpt}</div>

                            <div className=' mt-8 flex justify-between'>
                                <div className=' flex space-x-3.5 text-white *:flex *:items-center *:space-x-1.5'>
                                    <div className=''>
                                        <span className='font-semibold flex items-center space-x-2'>
                                            <BiCalendar size={18} />
                                            <span>Posted On:</span>
                                        </span>
                                        <time>{moment(serviceInfo.date_added).format("MMMM DD, YYYY")}</time>
                                    </div>
                                </div>

                                <div>
                                    <div className={`bg-${themeSett?.primary_color}-600 text-white w-fit px-5 py-2 flex items-center 
                                    space-x-2 rounded cursor-pointer`} onClick={() => { dispatch(showPageLoader()); router.back(); }}>
                                        <FaArrowLeftLong size={18} />
                                        <span>Go Back</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="absolute top-0 w-full h-full z-10 bg-gradient-to-b from-transparent to-black/80 from-10%"></div>
                </header>
                {/**  ======================= Header Area Ends ====================== **/}

                <main className="w-full flex flex-col min-h-[55dvh]">
                    {/**  ======================= Contact Area Starts ====================== **/}
                    <div className="w-full relative py-16">
                        <div className="container mx-auto max-w-[1200px]">

                            {!serviceInfoLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(serviceInfoLoaded && serviceInfo) &&
                                <div className='w-full grid grid-cols-1 lg:grid-cols-6 gap-6 mt-0'>
                                    <div className='lg:col-span-4'>
                                        {serviceInfoError == "" &&
                                            <div className='w-full'>

                                                <div className='w-full'>
                                                    <ImageWithFallback key={serviceInfo.info_id} width={1250} height={400}
                                                        src={`${(serviceInfo.header_image_large && serviceInfo.header_image_large != "")
                                                            ? `../../${serviceInfo?.header_image_large}` : "../no-service-image-added.png"}`}
                                                        fallbackSrc={`../no-service-image-added.png`} alt={serviceInfo.info_title} />
                                                </div>

                                                <div className='w-full font-normal mt-3 overflow-x-hidden'>
                                                    <div className='w-full ck-content' dangerouslySetInnerHTML={{ __html: serviceInfo.descriptions }} />
                                                </div>

                                            </div>
                                        }

                                        {serviceInfoError != "" &&
                                            <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                                {serviceInfoError}
                                            </div>
                                        }
                                    </div>

                                    <div className='hidden lg:block lg:col-span-2'>
                                        {/* <RecommendedService service_uid={serviceInfo?.service_uid} /> */}

                                        <div className='w-full mt-12 flex flex-col space-y-8 *:border *:border-gray-100 *:shadow-lg'>
                                            <SideAds no_ads={4} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </main>

                <FooterVar1 />
            </div>
        )
    }
}

export default ServiceDetailsPage
