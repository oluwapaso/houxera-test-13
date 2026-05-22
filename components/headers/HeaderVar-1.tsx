
'use client';

import React, { useEffect, useState } from 'react'
import { BsGear } from 'react-icons/bs';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { RiShakeHandsLine } from 'react-icons/ri';
import { HiHomeModern } from 'react-icons/hi2';
import HeroSearch_1 from '../search-components/HeroSearch_1';

const HeaderVar1 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const handleSettingsClick = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "header",
                    "type": "section",
                    "name": "HeaderVar1",
                }
            },
            '*' // In production, replace '*' with your parent URL for security
        );
    };

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett) {
        return <header className="w-full -mt-20 grid grid-cols-2 min-h-[95dvh] bg-gray-100 relative">
            <div className="w-full flex flex-col justify-center space-y-4 px-20 pt-24 pb-12">
                <div className="font-medium text-6xl capitalize">Find Your</div>
                <div className="font-medium text-6xl capitalize flex items-center">
                    <div className=' px-3 py-3 bg-gray-200 mr-2 font-medium drop-shadow-lg rounded-md'>Dream</div> <div>Home</div>
                </div>
                <div className="font-medium text-lg capitalize mt-4 ">
                    <p>Our website make it easy for you to find your dream home.</p>
                    <p>Search by location, price, and other criteria to find the perfect home for you.</p>
                </div>

                <div className="mt-8 flex items-center">
                    <HeroSearch_1 />
                </div>

                <div className=' grid grid-cols-3 mt-14 *:grid *:grid-cols-[50px_1fr] *:gap-3'>
                    <div>
                        <div className={`bg-${themeSett.primary_color}/20 text-${themeSett.primary_color} flex 
                            items-center justify-center px-2 rounded-md drop-shadow-xl`}>
                            <RiShakeHandsLine size={50} />
                        </div>
                        <div className=' co-s flex flex-col'>
                            <div className='font-semibold text-3xl'>800+</div>
                            <div>Sold Properties</div>
                        </div>
                    </div>

                    <div>
                        <div className={`bg-${themeSett.primary_color}/20 text-${themeSett.primary_color} flex 
                            items-center justify-center px-2 rounded-md drop-shadow-xl`}>
                            <HiHomeModern size={50} />
                        </div>
                        <div className=' co-s flex flex-col'>
                            <div className='font-semibold text-3xl'>86k+</div>
                            <div>Active Listings</div>
                        </div>
                    </div>

                    <div>
                        <div className={`bg-${themeSett.primary_color}/20 text-${themeSett.primary_color} flex 
                            items-center justify-center px-2 rounded-md drop-shadow-xl`}>
                            <BiHappyHeartEyes size={50} />
                        </div>
                        <div className=' co-s flex flex-col'>
                            <div className='font-semibold text-3xl'>1200+</div>
                            <div>Happy Clients</div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-has-bg="yes" className="relative"
                style={{
                    backgroundSize: `cover`,
                    backgroundRepeat: `none`,
                    backgroundImage: "url('/ave-maria_low.jpg')",
                }}>

                <div className="absolute w-full h-full z-10 bg-gradient-to-t from-transparent to-black/50 from-80%"></div>
                <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent to-black/50 from-80%"></div>
            </div>

            {is_theme && (
                <div id='editor_settings' className=' absolute z-[1000] right-1.5 top-1.5 bg-gray-200 text-gray-800 flex items-center 
                    justify-center p-2 rounded cursor-pointer hover:shadow-2xl'
                    onClick={handleSettingsClick}>
                    <BsGear size={17} />
                </div>
            )}
        </header>
    }
}

export default HeaderVar1