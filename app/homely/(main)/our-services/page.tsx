"use client"

import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import ReactivePagination from '@/components/ReactivePagination';
import OurServicesCardVar2 from '@/components/services-cards/OurServicesCardVar-2';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const OurServicesPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const page_size = 20; //20 
    const curr_page = parseInt(searchParams?.get("page") as string) || 1;

    const [our_services, setOurServices] = useState<any[]>([]);
    const [services_fetched, setServicesFetched] = useState(false);
    const [our_servicesError, setOurServicesError] = useState("");
    const [currPage, setCurrPage] = useState(curr_page);
    const [all_our_services, setAllOurServices] = useState<React.JSX.Element[]>([]);
    const [total_records, setTotalRecords] = useState(0);
    const [total_page, setTotalPage] = useState(0);

    const no_services_added = <div className='w-full text-red-600 flex justify-center items-center min-h-30'>
        No services added yet
    </div>

    const LoadOurServices = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "size": page_size,
            "skip": curr_page - 1,
            "fields": "services_uid,excerpt,header_image_large,header_image_small,insight_type,slug,title,views,comments"
        }

        const response = await window.MLS_Util.LoadOurServices(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setOurServices(response.data.services);
            setTotalRecords(response.data.total_records);
        } else {
            setOurServicesError(resp_message);
        }

        setServicesFetched(true);

    }

    useEffect(() => {

        if (Array.isArray(our_services)) {

            setOurServicesError("");
            if (total_records > 0) {

                const total_returned = our_services.length;
                setTotalPage(Math.ceil(total_records / page_size));

                if (total_records > 0 && total_returned > 0) {
                    setAllOurServices(our_services.map((services, index) => {
                        return <OurServicesCardVar2 key={index} service_info={services} />
                    }));
                } else {
                    setAllOurServices(() => [no_services_added]);
                }

            } else {

                //Making sure request has been sent
                if (services_fetched) {
                    setAllOurServices(() => [no_services_added]);
                } else {
                    setAllOurServices(() => [<div className='w-full flex justify-center items-center min-h-60'>
                        <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                    </div>])
                }

            }

        } else {
            //Making sure request has been sent
            if (services_fetched) {
                setAllOurServices(() => [no_services_added]);
            } else {
                setAllOurServices(() => [<div className='w-full flex justify-center items-center min-h-60'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>]);
            }
        }

    }, [our_services]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            LoadOurServices();
        }
    }, [window.MLS_Util, searchParams]);


    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett && themeSett != null) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                {/**  ======================= Header Area Starts ====================== **/}
                <header className="w-full h-[25dvh] bg-gray-100 relative">

                    <div data-has-bg="yes" className=" h-full flex flex-col justify-end pb-6"
                        style={{
                            backgroundSize: `cover`,
                            backgroundPosition: `center`,
                            backgroundRepeat: `none`,
                            backgroundImage: `url(${(themeSett.our_services_header_image && themeSett.our_services_header_image != "")
                                ? `../../${themeSett?.our_services_header_image}` : "../gradient-background.jpg"})`, //Remove ../../, the  ../../ is added for testing
                        }}>

                        <div className={`container mx-auto max-w-[1200px] px-3 xl:px-0 text-left relative z-20 flex flex-col`}>
                            <div className={`w-full font-medium text-white text-4xl`}>Our Services</div>
                        </div>
                    </div>

                    <div className="absolute top-0 w-full h-full z-10 bg-gradient-to-b from-transparent to-black/80 from-10%"></div>
                </header>
                {/**  ======================= Header Area Ends ====================== **/}

                <main className="w-full flex flex-col min-h-[55dvh] bg-gray-50">
                    {/**  ======================= Contact Area Starts ====================== **/}
                    <div className="w-full relative py-16">
                        <div className="container mx-auto max-w-[1200px]">

                            {!services_fetched && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(services_fetched) &&
                                <div className='w-full'>
                                    {(our_servicesError == "" && Array.isArray(our_services)) &&
                                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                            {all_our_services}
                                        </div>
                                    }

                                    {(our_servicesError == "" && total_page > 0) &&
                                        <ReactivePagination totalPage={total_page} curr_page={curr_page}
                                            changeTigger={setCurrPage} trigger_loader={setServicesFetched}
                                            url_path={`${themeSett.theme_prefix}/our_services?`} />
                                    }

                                    {our_servicesError != "" &&
                                        <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                            {our_servicesError}
                                        </div>
                                    }
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

export default OurServicesPage