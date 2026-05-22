import { RootState } from '@/app/GlobalRedux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const PropFeatures1 = ({ title, features }: { title: string, features: any }) => {
    if (!Array.isArray(features) || features.length < 1) return null;

    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett && themeSett != null) {
        return (
            <div className='w-full mb-10'>
                <h1 className='w-full text-xl'>{title}</h1>
                <div className='w-full flex items-center flex-wrap !border-transparent mt-1'>
                    {features.map((feature: any, index: any) => {
                        return <div key={index} className={`bg-${themeSett.primary_color}-200 text-${themeSett.primary_color}-700 flex 
                    mr-2 mb-2 rounded items-center justify-center px-4 py-2 cursor-pointer hover:drop-shadow-lg`}>{feature}</div>
                    })}
                </div>
            </div>
        );
    }
};

export default PropFeatures1
