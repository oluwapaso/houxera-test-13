"use client"

import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import { updateDataCounts } from '@/app/GlobalRedux/user/userSlice';
import FooterVar1 from '@/components/footers/FooterVar-1';
import NavVar1 from '@/components/navs/NavVar-1';
import ReactivePagination from '@/components/ReactivePagination';
import SearchCardVar1 from '@/components/SavedSearches/SearchCardVar1';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { hidePageLoader, showPageLoader } from '@/app/GlobalRedux/app/appSlice';
import Modal from '@/components/modals/Modal';
import { BiEdit } from 'react-icons/bi';
import EditSavedSearch from '@/components/modals/EditSavedSearch';

const SavedSearchesPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const page_size = 20; //20 
    const curr_page = parseInt(searchParams?.get("page") as string) || 1;

    const [saved_searches, setSavedSearches] = useState<any[]>([]);
    const [tour_fetched, setTourFetched] = useState(false);
    const [searchesError, setTourError] = useState("");
    const [currPage, setCurrPage] = useState(curr_page);
    const [total_records, setTotalRecords] = useState(0);
    const [total_page, setTotalPage] = useState(0);
    const [all_searches, setAllsearches] = useState<React.JSX.Element[]>([]);
    const [is_menu_shown, setIsMenuShown] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [refresh_page, setRefreshPage] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modal_title, setModalTitle] = useState(<></>);
    const [modal_children, setModalChildren] = useState({} as React.ReactNode);

    const closeModal = () => {
        setShowModal(false);
    }

    const no_tour_added = <div className='w-full text-red-600 flex justify-center items-center min-h-30'>
        No search saved yet
    </div>

    const Loadsearches = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "user_uid": user.user_info?.user_uid,
            "size": page_size,
            "skip": curr_page - 1
        }

        const response = await window.MLS_Util.LoadSavedSearches(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {

            setSavedSearches(response.data.saved_searches);
            setTotalRecords(response.data.total_records);

            if (status == "Upcoming") {
                dispatch(updateDataCounts({ "upcoming_searches": response.data.total_records }));
            }

        } else {
            setTourError(resp_message);
        }

        setTourFetched(true);

    }

    const handleDelete = async (search_uid: any) => {

        toast.dismiss();
        const result = await Swal.fire({
            title: "Are you sure you want to delete this search?",
            text: "This can not be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Continue',
        });

        if (result.isConfirmed) {

            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                "user_uid": user.user_info?.user_uid,
                "search_uid": search_uid,
            }

            dispatch(showPageLoader());
            const response = await window.MLS_Util.DeleteSavedMLSSearch(payload);

            let resp_message = response.message;
            let status_code = response.status_code;
            if (status_code == 200) {

                toast.success(`Saved search successfully deleted.`, {
                    position: "top-center",
                    theme: "colored"
                });

                saved_searches.forEach((ss) => {
                    const elem = document.getElementById(`saved_search_${search_uid}`) as HTMLDivElement;
                    if (elem) {
                        setSavedSearches((prevItems: any[]) =>
                            prevItems.filter((f: any) => f.search_uid != search_uid)
                        );
                        // setTimeout(() => elem.remove(), 500)
                    }
                });

            } else {
                toast.error(resp_message, {
                    position: "top-center",
                    theme: "colored"
                });
            }

            dispatch(hidePageLoader());

        } else {
            // Handle cancel action
            console.log('Canceled');
        }

    }

    const handleEdit = (search_info: any) => {
        setModalTitle(<div className=' flex items-center'><BiEdit size={15} className='mr-1' /> Edit Search</div>)
        setModalChildren(<EditSavedSearch closeModal={closeModal} search_info={search_info} />);
        setShowModal(true);
    }

    useEffect(() => {
        if (Array.isArray(saved_searches)) {

            setTourError("")
            if (total_records > 0) {

                const total_returned = saved_searches.length;
                setTotalPage(Math.ceil(total_records / page_size));

                if (total_records > 0 && total_returned > 0) {
                    setAllsearches(saved_searches.map((tour, index) => {
                        return <SearchCardVar1 key={index} search_info={tour} handleDelete={handleDelete} handleEdit={handleEdit} />
                    }));
                } else {
                    setAllsearches(() => [no_tour_added])
                }

            } else {

                //Making sure request has been sent
                if (tour_fetched) {
                    setAllsearches(() => [no_tour_added])
                } else {
                    setAllsearches(() => [<div className='w-full flex justify-center items-center min-h-60'>
                        <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                    </div>])
                }

            }

        } else {
            //Making sure request has been sent
            if (tour_fetched) {
                setAllsearches(() => [no_tour_added])
            } else {
                setAllsearches(() => [<div className='w-full flex justify-center items-center min-h-60'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>])
            }
        }
    }, [saved_searches]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            Loadsearches();
        }
    }, [window.MLS_Util, searchParams]);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    useEffect(() => {
        if (refresh_page) {
            Loadsearches();
        }
    }, [refresh_page]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuShown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    if (!user.isLogged) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                <main className="w-full flex flex-col min-h-[55dvh]">
                    <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                        You need to login to access this page.
                    </div>
                </main>

                <FooterVar1 />
            </div>
        )
    }

    if (themeSett && themeSett != null) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                <main className="w-full flex flex-col min-h-[55dvh]">
                    {/**  ======================= Contact Area Starts ====================== **/}
                    <div className="w-full relative py-16">
                        <div className="container mx-auto max-w-[1150px]">

                            <div className=' flex justify-between mb-4'>
                                <div className=' flex flex-col'>
                                    <div className='font-semibold text-3xl'>Saved Searches</div>
                                    <div className='font-medium text-lg'>Manage your saved searches.</div>
                                </div>

                            </div>

                            {!tour_fetched && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(tour_fetched) &&
                                <div className='w-full'>
                                    {(searchesError == "" && Array.isArray(saved_searches)) &&
                                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                                            {all_searches}
                                        </div>
                                    }

                                    {(searchesError == "" && total_page > 0) &&
                                        <ReactivePagination totalPage={total_page} curr_page={curr_page} changeTigger={setCurrPage}
                                            trigger_loader={setTourFetched} url_path={`${themeSett.theme_prefix}/scheduled-searches?status=${status}&`} />
                                    }

                                    {searchesError != "" &&
                                        <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                            {searchesError}
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </main>

                <FooterVar1 />
                <Modal show={showModal} children={modal_children} width={550} closeModal={closeModal} title={modal_title} />
            </div>
        )
    }
}

export default SavedSearchesPage