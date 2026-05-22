"use client"

import React, { useEffect, useState } from 'react'
import CustomLinkMain from '../CustomLink';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';
import { FaArrowRightLong } from 'react-icons/fa6';

const RecommendedNeighborhood = ({ neighborhood_uid }: { neighborhood_uid: string }) => {

    const [neighborhoods, setNeighborhoods] = useState<any[]>([]);
    const [neighLoaded, setNeighLoaded] = useState<boolean>(false);
    const [neighError, setNeighError] = useState("");
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const FetchNeighborhoods = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "neighborhood_uid": neighborhood_uid,
        }

        const response = await window.MLS_Util.LoadRecommendedNeighborhoods(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setNeighborhoods(response.data.neighborhoods);
        } else {
            setNeighError(resp_message);
        }

        setNeighLoaded(true);

    }

    useEffect(() => {
        FetchNeighborhoods();
    }, []);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    return (
        <div className='w-full mb-5'>
            <div className='w-full font-play-fair-display text-xl'>Recommended Neighborhoods</div>

            {!neighLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
            </div>}

            {(neighLoaded && neighborhoods) &&
                <ul className='w-full *:border-b *:border-gray-300 *:cursor-pointer *:px-1 *:py-3'>
                    {neighborhoods.map((neigh) => {
                        //../../ in `../${blog_neigh.header_image_large}` is for testing, remove this in production
                        const header_image_large = neigh.header_image_large ? `../../${neigh.header_image_large}` : "../../no-image-found.jpg"
                        return (<CustomLinkMain href={`${themeSett.theme_prefix}/neighborhood-insight/${neigh.slug}`} key={neigh.neighborhood_uid}
                            className={`w-full grid grid-cols-10 gap-2 text-base font-normal hover:bg-gray-50`}>
                            <div className={` col-span-4 h-[85px] relative z-10 bg-center bg-cover bg-no-repeat cursor-pointer`}
                                style={{ backgroundImage: `url('${header_image_large}')` }}>
                            </div>
                            <div className=' col-span-6 flex flex-col'>
                                <span className='ml-1 flex-grow font-semibold text-sm'>{neigh.title}</span>
                                <span className='ml-1 flex-grow line-clamp-4 text-sm'>{neigh.excerpt}</span>

                                <div className={`px-2 mt-1 mb-2`}>
                                    <div className={`w-fit px-4 py-1 mt-1 text-sm bg-white border-1 border-${themeSett.primary_color}-600 flex 
                                    items-center justify-center hover:bg-${themeSett.primary_color}-600 text-${themeSett.primary_color}-600 
                                    hover:text-white cursor-pointer rounded space-x-2.5 hover:shadow-2xl`}>
                                        <span>Explore Neighborhood</span>
                                        <FaArrowRightLong size={18} />
                                    </div>
                                </div>
                            </div>
                        </CustomLinkMain>)
                    })
                    }
                </ul>
            }

            {(neighLoaded && neighError != "") &&
                <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                    {neighError}
                </div>
            }
        </div>
    )
}

export default RecommendedNeighborhood