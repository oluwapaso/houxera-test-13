'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import CustomLinkMain from '../CustomLink';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';

const NeighCardVar1 = ({ neigh_info, is_theme = false }: { neigh_info: any, is_theme?: boolean }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    //../ in `../${neigh_info.header_image_large}` is for testing, remocve this in production
    const header_image_large = neigh_info.header_image_large ? `../${neigh_info.header_image_large}` : "../no-image-found.jpg"
    if (themeSett && themeSett != null) {
        return (
            <CustomLinkMain href={`${themeSett.theme_prefix}/neighborhood-insight/${neigh_info.slug}`} is_theme={is_theme}
                className={`h-[250px] relative shadow-lg z-10 bg-center bg-cover bg-no-repeat border border-gray-200 cursor-pointer 
                rounded-2xl overflow-hidden hover:shadow-2xl`}
                style={{ backgroundImage: `url('${header_image_large}')` }}>
                <div className=' w-full absolute top-4 flex items-center px-3 space-x-2 z-20'>
                    <div className='font-medium text-white text-sm'>
                        {neigh_info.title}
                    </div>
                </div>

                <div className=' w-full absolute bottom-3 px-3 grid grid-cols-[1fr_50px] z-20'>
                    <div className=' flex items-center text-white'>
                        <span className='text-base font-medium flex items-center space-x-2.5'>
                            <span>Explore Neighborhoods</span>
                            <FaArrowRightLong size={18} />
                        </span>
                    </div>
                </div>

                <div className="absolute w-full h-full z-10 bg-gradient-to-t from-transparent to-black/80 from-75%"></div>
                <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent to-black/80 from-75%"></div>
            </CustomLinkMain>
        )
    }
}

export default NeighCardVar1