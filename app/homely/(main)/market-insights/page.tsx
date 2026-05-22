"use client"
import { hidePageLoader, showPageLoader } from "@/app/GlobalRedux/app/appSlice";
import { RootState } from "@/app/GlobalRedux/store";
import FooterVar1 from "@/components/footers/FooterVar-1";
import NavVar1 from "@/components/navs/NavVar-1";
import BathsDD from "@/components/search-components/BathsDD";
import BedsDD from "@/components/search-components/BedsDD";
import LocationLookupInput from "@/components/search-components/LocationLookupInput";
import PropertyTypeDD from "@/components/search-components/PropertyTypeDD";
import StatusDD from "@/components/search-components/StatusDD";
import { useEffect, useRef, useState } from "react";
import { FaChartArea } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import DateRangeInput from "@/components/search-components/DateRangeInput";
import CategoryDD from "@/components/search-components/CategoryDD";
import { NonResidentialProperty } from "@/_lib/data";
import { Helpers } from "@/_lib/helper";
import InsigthCard1 from "@/components/insights-cards/InsigthCard-1";
import { HiHomeModern } from "react-icons/hi2";
import { PiChartLineDown, PiChartLineUp, PiInvoice } from "react-icons/pi";
import { BsPercent } from "react-icons/bs";

const helper = new Helpers();
const MarketInsightsPage = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const [formData, setFormData] = useState<any>({
        "sales_type": "For Sale",
        "status": "Listed",
        "beds": "Any",
        "baths": "Any"
    });

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate());

    const [from_date, setFromDate] = useState(moment(moment().add("-30", "days")).format("MM/DD/YYYY"));
    const [to_date, setToDate] = useState(moment().format("MM/DD/YYYY"));
    const [range_shown, setRangeShown] = useState(false);
    const dateBoxRef = useRef<HTMLDivElement>(null);
    const [insights, setInsights] = useState<any>({});
    const [ins_fetched, setInsightFetched] = useState(false);
    const [fetching_ins, setFetchinIns] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const defaultRange = {
        startDate: from_date,
        endDate: to_date,
        key: 'selection'
    }
    const [dates, setDates] = useState<any>([defaultRange]);

    //const { is1Xm, is2Xm, isXs, isSm, isMd, isTab } = useCurrentBreakpoint();
    let calendar_dir: "vertical" | "horizontal" | undefined = "horizontal";

    const PropertyTypeDD_Data: any = {
        form_data: formData,
        set_form_data: setFormData,
        property_type: formData.property_type,
        property_sub_type: formData.property_sub_type,
    }

    const LoadInsights = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "location": formData.location,
            "sales_type": formData.sales_type,
            "status": formData.status,
            "from_date": moment(from_date).format("YYYY-MM-DD"),
            "to_date": moment(to_date).format("YYYY-MM-DD"),
            "property_type": formData.property_type,
            "property_sub_type": formData.property_sub_type,
            "beds": formData.beds,
            "baths": formData.baths
        }

        setFetchError("");
        setFetchinIns(true);
        dispatch(showPageLoader());

        const response = await window.MLS_Util.LoadMarketInsights(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setInsights(response?.data?.insights?.aggregations);
        } else {
            setFetchError(resp_message);
        }

        setInsightFetched(true);
        dispatch(hidePageLoader());
        setFetchinIns(false);

    }

    const showDateRange = () => {
        setRangeShown(true);
    }


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dateBoxRef.current && !dateBoxRef.current.contains(e.target as Node)) {
                setRangeShown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dateBoxRef]);

    useEffect(() => {
        if (dates && dates.length) {

            const date_data = dates[0];
            if (date_data.startDate && date_data.startDate != "") {
                setFromDate(moment(date_data.startDate?.toString()).format("MM/DD/YYYY"));
                setToDate(moment(date_data.endDate?.toString()).format("MM/DD/YYYY"));
            }

        } else {
            console.log("No startDate")
        }

    }, [dates]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett && themeSett != null) {
        return (
            <div className="flex flex-col min-h-screen" >
                <NavVar1 transparent={false} />

                <main className="w-full flex flex-col min-h-[55dvh] bg-gray-50 relative z-20">
                    <div className="container mx-auto max-w-[1450px] py-12">

                        <div className=' mx-auto w-[950px] '>
                            <div className='col-span-full flex flex-col mb-4'>
                                <div className='font-semibold text-3xl'>Market Insights</div>
                            </div>
                        </div>

                        <div className=' mx-auto w-[950px] z-30 px-5 py-5 rounded-2xl rounded-tl-none mt-8
                            grid grid-cols-3 gap-3.5 *:flex *:flex-col bg-white drop-shadow-2xl'>

                            <div className=''>
                                <div className='font-semibold text-base'>Location</div>
                                <div className='w-full border-b border-gray-200'>
                                    <LocationLookupInput props={PropertyTypeDD_Data} setFormData={setFormData} />
                                </div>
                            </div>

                            <div className=' col-span-1'>
                                <div className='font-semibold text-base'>Category</div>
                                <div className='w-full border-b border-gray-200'>
                                    <CategoryDD props={PropertyTypeDD_Data} via="Insights" />
                                </div>
                            </div>

                            <div className=''>
                                <div className='font-semibold text-base'>Property Type</div>
                                <div className='w-full border-b border-gray-200'>
                                    <PropertyTypeDD props={PropertyTypeDD_Data} />
                                </div>
                            </div>

                            <div className=' col-span-1'>
                                <div className='font-semibold text-base'>Status</div>
                                <div className='w-full border-b border-gray-200'>
                                    <StatusDD props={PropertyTypeDD_Data} via="Insight" />
                                </div>
                            </div>


                            {(!NonResidentialProperty.includes(formData.property_sub_type)) &&
                                <>
                                    <div className=' col-span-1'>
                                        <div className='font-semibold text-base'>Beds</div>
                                        <div className='w-full border-b border-gray-200'>
                                            <BedsDD props={PropertyTypeDD_Data} />
                                        </div>
                                    </div>

                                    <div className=' col-span-1'>
                                        <div className='font-semibold text-base'>Baths</div>
                                        <div className='w-full border-b border-gray-200'>
                                            <BathsDD props={PropertyTypeDD_Data} />
                                        </div>
                                    </div>
                                </>
                            }

                            <div className=' col-span-1'>
                                <div className='font-semibold text-base'>
                                    {formData.status} Between
                                </div>
                                <div ref={dateBoxRef} className='w-full relative border-b border-gray-200' onClick={() => { showDateRange() }}>
                                    <DateRangeInput name='range' label='Select Transaction Range' placeholder='Select Transaction Range'
                                        value={`${moment(from_date.toString()).format("DD/MM/YYYY")} - ${moment(to_date.toString()).format("DD/MM/YYYY")}`}
                                        handleChange={() => null} />

                                    {range_shown && <DateRangePicker
                                        editableDateInputs={false}
                                        className="z-[110] left-0 absolute top-[0px] lg:top-[calc(100%+2px)] !bg-white border border-gray-300 shadow-xl"
                                        onChange={(item) => setDates([item.selection])}
                                        showPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        months={2}
                                        direction={calendar_dir}
                                        showDateDisplay={false}
                                        preventSnapRefocus={true}
                                        maxDate={maxDate}
                                    />}
                                </div>
                            </div>

                            <div className=' col-span-full !flex-row !justify-end'>
                                <div className={`w-fit bg-${themeSett.primary_color}-600 hover:bg-${themeSett.primary_color}-700 
                                    px-8 py-2 rounded flex items-center justify-center text-white cursor-pointer hover:shadow-2xl `}
                                    onClick={() => LoadInsights()}>
                                    <FaChartArea size={18} className="mr-1.5" />
                                    <span>Load Insights</span>
                                </div>
                            </div>

                        </div>

                        {(fetchError != "") &&
                            <div className='mx-auto w-[950px] h-[150px] bg-white text-red-600 flex items-center justify-center'>
                                {fetchError}
                            </div>
                        }

                        <div className='mx-auto w-[950px] flex flex-col justify-center mt-20 space-y-12'>
                            {(insights?.active?.price_stats) &&
                                <div className=" flex flex-col w-full">
                                    <div className=" text-xl font-semibold">Active Listings Insights</div>
                                    <div className="w-full mt-2 grid grid-cols-2 gap-11 *:bg-white *:p-8 *:rounded *:shadow-2xl
                                    *:flex *:flex-colx *:justify-start *:space-x-5 *:items-center *:border *:border-gray-300">

                                        <InsigthCard1 value={helper.formatWholeNumber(insights?.active?.price_stats?.count)} name={"Total Listings"}
                                            icon={<HiHomeModern size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.active?.price_stats?.avg, true)} name={"Avg. Price"}
                                            icon={<BsPercent size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.active?.price_stats?.min, true)} name={"Min. Price"}
                                            icon={<PiChartLineDown size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.active?.price_stats?.max, true)} name={"Max. Price"}
                                            icon={<PiChartLineUp size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.active?.price_stats?.sum, true)} name={"Total Sum"}
                                            icon={<PiInvoice size={55} className={`text-${themeSett.primary_color}-700`} />} />

                                    </div>
                                </div>
                            }

                            {(insights?.sold?.price_stats) &&
                                <div className=" flex flex-col w-full">
                                    <div className=" text-xl font-semibold">Sold Listings Insights</div>
                                    <div className="w-full mt-2 grid grid-cols-2 gap-11 *:bg-white *:p-8 *:rounded *:shadow-2xl
                                    *:flex *:flex-colx *:justify-start *:space-x-5 *:items-center *:border *:border-gray-300">

                                        <InsigthCard1 value={helper.formatWholeNumber(insights?.sold?.price_stats?.count)} name={"Total Listings"}
                                            icon={<HiHomeModern size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.sold?.price_stats?.avg, true)} name={"Avg. Price"}
                                            icon={<BsPercent size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.sold?.price_stats?.min, true)} name={"Min. Price"}
                                            icon={<PiChartLineDown size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.sold?.price_stats?.max, true)} name={"Max. Price"}
                                            icon={<PiChartLineUp size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.sold?.price_stats?.sum, true)} name={"Total Sum"}
                                            icon={<PiInvoice size={55} className={`text-${themeSett.primary_color}-700`} />} />

                                    </div>
                                </div>
                            }

                            {(insights?.rented?.price_stats) &&
                                <div className=" flex flex-col w-full">
                                    <div className=" text-xl font-semibold">Rented Listings Insights</div>
                                    <div className="w-full mt-2 grid grid-cols-2 gap-11 *:bg-white *:p-8 *:rounded *:shadow-2xl
                                    *:flex *:flex-colx *:justify-start *:space-x-5 *:items-center *:border *:border-gray-300">

                                        <InsigthCard1 value={helper.formatWholeNumber(insights?.rented?.price_stats?.count)} name={"Total Listings"}
                                            icon={<HiHomeModern size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.rented?.price_stats?.avg, true)} name={"Avg. Price"}
                                            icon={<BsPercent size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.rented?.price_stats?.min, true)} name={"Min. Price"}
                                            icon={<PiChartLineDown size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.rented?.price_stats?.max, true)} name={"Max. Price"}
                                            icon={<PiChartLineUp size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.rented?.price_stats?.sum, true)} name={"Total Sum"}
                                            icon={<PiInvoice size={55} className={`text-${themeSett.primary_color}-700`} />} />

                                    </div>
                                </div>
                            }

                            {(insights?.leased?.price_stats) &&
                                <div className=" flex flex-col w-full">
                                    <div className=" text-xl font-semibold">Leased Listings Insights</div>
                                    <div className="w-full mt-2 grid grid-cols-2 gap-11 *:bg-white *:p-8 *:rounded *:shadow-2xl
                                    *:flex *:flex-colx *:justify-start *:space-x-5 *:items-center *:border *:border-gray-300">

                                        <InsigthCard1 value={helper.formatWholeNumber(insights?.leased?.price_stats?.count)} name={"Total Listings"}
                                            icon={<HiHomeModern size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.leased?.price_stats?.avg, true)} name={"Avg. Price"}
                                            icon={<BsPercent size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.leased?.price_stats?.min, true)} name={"Min. Price"}
                                            icon={<PiChartLineDown size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.leased?.price_stats?.max, true)} name={"Max. Price"}
                                            icon={<PiChartLineUp size={55} className={`text-${themeSett.primary_color}-700`} />} />
                                        <InsigthCard1 value={helper.formatCurrency(insights?.leased?.price_stats?.sum, true)} name={"Total Sum"}
                                            icon={<PiInvoice size={55} className={`text-${themeSett.primary_color}-700`} />} />

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

export default MarketInsightsPage
