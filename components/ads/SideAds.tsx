"use client"

import React, { useEffect } from 'react'
const SideAds = ({ no_ads }: { no_ads: number }) => {

    var adslots: React.JSX.Element[] = [];
    for (let index = 1; index <= no_ads; index++) {
        adslots.push(<div key={index} id={`side-ad-slot-${index}`} data-side-ad-slot></div>)
    }

    //Initialize Ads
    useEffect(() => {
        if (window.MLS_Util && no_ads > 0) {
            const to = setTimeout(() => {
                window.MLS_Util.InitializeSideAds();
            }, 1500);

            return () => clearTimeout(to);
        }
    }, [window.MLS_Util]);

    return adslots.map((slot_comp) => slot_comp)
}

export default SideAds
