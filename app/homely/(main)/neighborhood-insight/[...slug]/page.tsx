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
import { BiCalendar, BiChart, BiRefresh } from 'react-icons/bi';
import { BsEyeFill, BsPercent } from 'react-icons/bs';
import { FaArrowLeftLong, FaArrowRightLong, FaChartArea, FaComments, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

import { BsTwitterX } from 'react-icons/bs';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import FooterVar1 from '@/components/footers/FooterVar-1';
import CommentCardVar2 from '@/components/blog-cards/CommentCardVar-2';
import CommentBox from '@/components/blog-cards/CommentBox';
import ReplyComment from '@/components/modals/ReplyComment';
import RecommendedNeighborhood from '@/components/neighborhood-cards/RecommendedNeighborhood';
import SideAds from '@/components/ads/SideAds';
import { HiHomeModern } from 'react-icons/hi2';
import PropCardVar1 from '@/components/property-cards/PropCardVar-1';
import CustomLinkMain from '@/components/CustomLink';
import InsigthCard1 from '@/components/insights-cards/InsigthCard-1';
import { PiChartLineDown, PiChartLineUp, PiInvoice } from 'react-icons/pi';

const helpers = new Helpers();
const NeighInfoPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const slug = params?.slug as string;
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [page_url, setPageURL] = useState("");

    const [neighInfo, setNeighInfo] = useState<any>({});
    const [neighInsight, setNeighInsight] = useState<any>({});
    const [neighProperties, setNeighProperties] = useState<any[]>([]);
    const [neighInfoLoaded, setNeighInfoLoaded] = useState<boolean>(false);
    const [neighInfoError, setNeighInfoError] = useState("");

    const [neighInfoComm, setNeighborhoodComm] = useState<any[]>([]);
    const [neighInfoCommLoaded, setNeighborhoodCommLoaded] = useState<boolean>(false);
    const [neighInfoCommError, setNeighborhoodCommError] = useState("");

    const [skip, setSkip] = useState(0);
    const [comment_resp, setCommResp] = useState("");
    const [has_more, setHasMore] = useState("No");
    const [rep_to_append, setRepToAppend] = useState<any>(null);
    const [curr_no_comms, setNoComms] = useState(0);

    const [keyword, setKeyword] = useState("");
    let all_comments: React.JSX.Element[] = [];

    const [showModal, setShowModal] = useState(false);
    const [modal_children, setModalChildren] = useState({} as React.ReactNode);

    const closeModal = () => {
        setShowModal(false);

        const body = document.querySelector("body");
        if (body) {
            body.style.overflow = "auto";
        }
    }

    const handleReply = (comment_uid: string) => { //, quoted_comments: string
        setModalChildren(<ReplyComment closeModal={closeModal} item_type="Neighborhood" item_uid={neighInfo.neighborhood_uid}
            comment_uid={comment_uid} setRepToAppend={setRepToAppend} setNoComms={setNoComms} />);
        setShowModal(true);

        const body = document.querySelector("body");
        if (body) {
            body.style.overflow = "hidden";
        }
    }

    const LoadNeighsDetails = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "slug": slug,
            "user_uid": user.user_info?.user_uid,
        }

        const response = await window.MLS_Util.LoadNeighborhoodDetails(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setNeighInfo(response.data.neighborhood);
            setNoComms(response.data?.neighborhood?.comments);
            setNeighInsight(response.data.insights);
            setNeighProperties(response.data.properties);
        } else {
            setNeighInfoError(resp_message)
        }

        setNeighInfoLoaded(true);

    }

    const LoadNeighsComments = async (skip: number) => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "neighborhood_uid": neighInfo.neighborhood_uid,
            "skip": skip || 0,
            "size": 5,//20
        }

        const response = await window.MLS_Util.LoadNeighborhoodComments(payload);
        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {

            setNeighborhoodComm((prev_comm: any[]) => [...prev_comm, ...response.data?.comments]);
            dispatch(hidePageLoader());
            setHasMore(response.data?.has_more);
            setSkip(skip);

        } else {
            setNeighborhoodCommError(resp_message);
            setHasMore("No");
        }

        setNeighborhoodCommLoaded(true);

    }

    const fetchMoreComments = async () => {
        const new_skip = skip + 1;
        LoadNeighsComments(new_skip);
    }

    const BuildSearchLink = (neighInfo: any) => {
        var link = "";
        var prop_delv = neighInfo.property_delivery;

        if (prop_delv.city && prop_delv.city != "") {
            link += `location=${prop_delv.city}&`;
        }

        if (Array.isArray(prop_delv.listing_type) && prop_delv.listing_type.length > 0) {
            link += `sales_type=${prop_delv.listing_type[0]}&`;
        }

        link = helpers.rTrim(link, "&");
        return link;
    }

    useEffect(() => {
        LoadNeighsComments(0);
    }, [neighInfo]);

    useEffect(() => {

        dispatch(hidePageLoader());
        if (window.MLS_Util) {
            LoadNeighsDetails();
        }

    }, [window.MLS_Util]);

    useEffect(() => {
        setPageURL(`${window.location.href}/neigh-info/${slug}`);
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
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    useEffect(() => {
        if (rep_to_append) {
            setNeighborhoodCommLoaded(false);

            const to = setTimeout(() => {
                setNeighborhoodComm((prev_comm: any[]) => [rep_to_append, ...prev_comm]);
                setNeighborhoodCommLoaded(true);
            }, 250)

            const to2 = setTimeout(() => {
                const parentElement = document.getElementById('comment_area') as HTMLDivElement;
                if (parentElement) {
                    var top = parentElement.offsetTop - 10;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }, 550)

            return () => {
                clearTimeout(to);
                clearTimeout(to2);
            }

        }
    }, [rep_to_append]);

    const crumb = <div className='font-play-fair-display text-4xl !text-white'>
        {
            neighInfoLoaded ? (
                neighInfo ? (
                    neighInfo.title
                ) : ""
            ) : ""
        }
    </div>;

    const no_comm_added = <div className='p-10 mt-2 text-red-600 flex flex-col justify-center items-center min-h-6'>
        <div className='w-full text-center'>No comment added yet. Be the first to leave a comments.</div>
    </div>

    if (Array.isArray(neighInfoComm)) {

        if (neighInfoComm.length > 0) {

            all_comments = neighInfoComm.map((comm) => {
                return (<CommentCardVar2 key={comm.comment_uid} comm={comm} handleReply={handleReply} />)
            })

        } else {

            //Making sure request has been sent
            if (neighInfoCommLoaded) {
                all_comments[0] = no_comm_added
            } else {
                all_comments[0] = <div className='w-full flex justify-center items-center min-h-60'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>
            }

        }

    }

    const share_title = `Check out this article i found on ${process.env.NEXT_PUBLIC_CHANNEL_WEBSITE}`;

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
                            backgroundImage: `url(${(neighInfo.header_image_large && neighInfo.header_image_large != "")
                                ? `../../${neighInfo?.header_image_large}` : "../no-neigh-image-added.png"})`, //Remove ../../, the  ../../ is added for testing
                        }}>

                        <div className={`container mx-auto max-w-[1200px] px-3 xl:px-0 text-left z-20 flex flex-col`}>
                            <div className={`w-full font-medium *:text-white xl:text-shadow-primary`}>{crumb}</div>
                            <div className={`w-full text-white line-clamp-2 `}>{neighInfo?.summary}</div>

                            <div className=' mt-8 flex justify-between'>
                                <div className=' flex space-x-3.5 text-white *:flex *:items-center *:space-x-1.5'>
                                    <div className=''>
                                        <span className='font-semibold flex items-center space-x-2'>
                                            <BiCalendar size={18} />
                                            <span>Posted On:</span>
                                        </span>
                                        <time>{moment(neighInfo.date_added).format("MMMM DD, YYYY")}</time>
                                    </div>

                                    <div className=''>
                                        <span className='font-semibold flex items-center space-x-2'>
                                            <BsEyeFill size={18} />
                                            <span>Views:</span>
                                        </span>
                                        <span>{neighInfo.views}</span>
                                    </div>

                                    <div className=''>
                                        <span className='font-semibold flex items-center space-x-2'>
                                            <FaComments size={18} />
                                            <span>Comments:</span>
                                        </span>
                                        <span>{curr_no_comms}</span>
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

                            {!neighInfoLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                            </div>}

                            {(neighInfoLoaded && neighInfo) &&
                                <div className='w-full grid grid-cols-1 lg:grid-cols-6 gap-6 mt-0'>
                                    <div className='lg:col-span-4'>
                                        {neighInfoError == "" &&
                                            <div className='w-full'>

                                                <div className='w-full'>
                                                    <ImageWithFallback key={neighInfo.info_id} width={1250} height={400}
                                                        src={`${(neighInfo.header_image_large && neighInfo.header_image_large != "")
                                                            ? `../../${neighInfo?.header_image_large}` : "../no-neigh-image-added.png"}`}
                                                        fallbackSrc={`../no-neigh-image-added.png`} alt={neighInfo.info_title} />
                                                </div>

                                                <div className='w-full font-normal mt-3 overflow-x-hidden'>
                                                    <div className='w-full ck-content' dangerouslySetInnerHTML={{ __html: neighInfo.descriptions }} />
                                                </div>

                                                <div className='w-full my-1 py-2 border-b border-gray-200 text-gray-600 font-normal'>
                                                    Added On <time>{moment(neighInfo.date_added).format("MMMM DD, YYYY")}</time>
                                                </div>

                                                <div className='mt-4 w-full font-medium'>Share This Page:</div>
                                                <div className={`w-full flex items-center *:flex *:items-center *:justify-center 
                                                    space-x-2 flex-wrap *:mb-2`}>

                                                    <FacebookShareButton url={page_url} title={share_title} className='*:p-4 *:rounded-md *:cursor-pointer'>
                                                        <div className={`bg-${themeSett.primary_color}-100 text-${themeSett.primary_color}-600`}>
                                                            <FaFacebook size={30} />
                                                        </div>
                                                    </FacebookShareButton>

                                                    <TwitterShareButton url={page_url} title={share_title} className='*:p-4 *:rounded-md *:cursor-pointer'>
                                                        <div className={`bg-${themeSett.primary_color}-100 text-${themeSett.primary_color}-600`}>
                                                            <BsTwitterX size={30} />
                                                        </div>
                                                    </TwitterShareButton>

                                                    <LinkedinShareButton url={page_url} title={share_title} className='*:p-4 *:rounded-md *:cursor-pointer'>
                                                        <div className={`bg-${themeSett.primary_color}-100 text-${themeSett.primary_color}-600`}>
                                                            <FaLinkedin size={30} />
                                                        </div>
                                                    </LinkedinShareButton>

                                                    <WhatsappShareButton url={page_url} title={share_title} className='*:p-4 *:rounded-md *:cursor-pointer'>
                                                        <div className={`bg-${themeSett.primary_color}-100 text-${themeSett.primary_color}-600`}>
                                                            <FaWhatsapp size={30} />
                                                        </div>
                                                    </WhatsappShareButton>

                                                </div>

                                                {(Array.isArray(neighProperties) && neighProperties.length > 0) &&
                                                    <div className='mt-6 w-full flex flex-col'>
                                                        <div className='w-full font-medium text-2xl flex items-center space-x-2.5'>
                                                            <span className={`bg-${themeSett.primary_color}-100 text-${themeSett.primary_color}-600 p-2 rounded`}>
                                                                <HiHomeModern size={25} />
                                                            </span>
                                                            <span>Properties In This Neighborhood</span>
                                                        </div>
                                                        <div className='w-full mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                                                            {neighProperties.map((prop) => <PropCardVar1 key={prop.draft_id} pro_info={prop} />)}
                                                        </div>

                                                        <div className=' col-span-full w-full mt-16 mb-16 flex justify-start'>
                                                            <CustomLinkMain href={`${themeSett.theme_prefix}/property-search?${BuildSearchLink(neighInfo)}`}
                                                                className={`px-8 py-5 bg-${themeSett.primary_color}-600 hover:bg-${themeSett.primary_color}-700 
                                                              text-white cursor-pointer flex items-center justify-center rounded space-x-2.5 
                                                              hover:shadow-2xl`}>
                                                                <span>Load More Properties</span>
                                                                <FaArrowRightLong size={18} />
                                                            </CustomLinkMain>
                                                        </div>

                                                    </div>
                                                }


                                                {(neighInsight?.aggregations && neighInsight?.aggregations != null) &&
                                                    <div className='mt-6 w-full flex flex-col'>
                                                        <div className='w-full font-medium text-2xl flex items-center space-x-2.5'>
                                                            <span className={`bg-${themeSett.primary_color}-100 text-${themeSett.primary_color}-600 p-2 rounded`}>
                                                                <BiChart size={25} />
                                                            </span>
                                                            <span>Neighborhood Insights</span>
                                                        </div>

                                                        <div>

                                                            {(neighInsight?.aggregations?.active?.price_stats) &&
                                                                <div className=" flex flex-col w-full mt-6 mb-8">
                                                                    <div className=" text-xl font-semibold">Active Listings Insights</div>
                                                                    <div className="w-full mt-2 grid grid-cols-2 gap-5 *:bg-white *:p-5 *:rounded *:shadow-xl
                                                                        *:flex *:flex-colx *:justify-start *:space-x-5 *:items-center *:border *:border-gray-300">

                                                                        <InsigthCard1 value={helpers.formatWholeNumber(neighInsight?.aggregations?.active?.price_stats?.count)} name={"Total Listings"}
                                                                            icon={<HiHomeModern size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.active?.price_stats?.avg, true)} name={"Avg. Price"}
                                                                            icon={<BsPercent size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.active?.price_stats?.min, true)} name={"Min. Price"}
                                                                            icon={<PiChartLineDown size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.active?.price_stats?.max, true)} name={"Max. Price"}
                                                                            icon={<PiChartLineUp size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.active?.price_stats?.sum, true)} name={"Total Sum"}
                                                                            icon={<PiInvoice size={55} className={`text-${themeSett.primary_color}-700`} />} />

                                                                    </div>
                                                                </div>
                                                            }


                                                            {(neighInsight?.aggregations?.sold?.price_stats) &&
                                                                <div className=" flex flex-col w-full mt-6">
                                                                    <div className=" text-xl font-semibold">Sold Listings Insights</div>
                                                                    <div className="w-full mt-2 grid grid-cols-2 gap-5 *:bg-white *:p-5 *:rounded *:shadow-xl
                                                                        *:flex *:flex-colx *:justify-start *:space-x-5 *:items-center *:border *:border-gray-300">

                                                                        <InsigthCard1 value={helpers.formatWholeNumber(neighInsight?.aggregations?.sold?.price_stats?.count)} name={"Total Listings"}
                                                                            icon={<HiHomeModern size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.sold?.price_stats?.avg, true)} name={"Avg. Price"}
                                                                            icon={<BsPercent size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.sold?.price_stats?.min, true)} name={"Min. Price"}
                                                                            icon={<PiChartLineDown size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.sold?.price_stats?.max, true)} name={"Max. Price"}
                                                                            icon={<PiChartLineUp size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                                                        <InsigthCard1 value={helpers.formatCurrency(neighInsight?.aggregations?.sold?.price_stats?.sum, true)} name={"Total Sum"}
                                                                            icon={<PiInvoice size={55} className={`text-${themeSett.primary_color}-700`} />} />

                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>

                                                        <div className=' col-span-full w-full mt-16 mb-16 flex justify-start'>
                                                            <CustomLinkMain href={`${themeSett.theme_prefix}/market-insights?location=${neighInfo?.property_delivery?.city}`}
                                                                className={`px-8 py-5 bg-${themeSett.primary_color}-600 hover:bg-${themeSett.primary_color}-700 
                                                              text-white cursor-pointer flex items-center justify-center rounded space-x-2.5 
                                                              hover:shadow-2xl`}>
                                                                <span>More Insights</span>
                                                                <FaArrowRightLong size={18} />
                                                            </CustomLinkMain>
                                                        </div>

                                                    </div>
                                                }

                                                <div className='w-full mt-10 flex flex-col'>

                                                    <div className='w-full font-semibold text-2xl'>Leave a Comment </div>
                                                    <CommentBox item_type="Neighborhood" item_uid={neighInfo?.neighborhood_uid} setRepToAppend={setRepToAppend}
                                                        setNoComms={setNoComms} />

                                                    <div className='w-full font-semibold text-2xl mt-14'>
                                                        {curr_no_comms} Comment{curr_no_comms > 1 ? "s" : ""}
                                                    </div>

                                                    <div className='w-full' id='comment_area'>{all_comments}</div>
                                                </div>

                                                {has_more == "Yes" &&
                                                    <div className={`w-full flex items-center justify-center mt-4`}>
                                                        <div className={`flex items-center justify-center px-4 py-3 cursor-pointer rounded 
                                                        bg-${themeSett?.secondary_color}-700 text-white hover:shadow-2xl hover:opacity-90`}
                                                            onClick={fetchMoreComments}>
                                                            <BiRefresh size={18} className='mr-2' /> <span>Load More Comments</span>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        }

                                        {neighInfoError != "" &&
                                            <div className='col-span-full h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                                {neighInfoError}
                                            </div>
                                        }
                                    </div>

                                    <div className='hidden lg:block lg:col-span-2'>
                                        <RecommendedNeighborhood neighborhood_uid={neighInfo?.neighborhood_uid} />

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
                <Modal show={showModal} children={modal_children} width={700} closeModal={closeModal} title=<div>Reply To Comment</div> />
            </div>
        )
    }
}

export default NeighInfoPage
