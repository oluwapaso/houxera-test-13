"use client"

import React, { useEffect } from 'react'

const PopUpAds = () => {

    //Initialize Ads
    useEffect(() => {
        if (window.MLS_Util) {
            const to = setTimeout(() => {
                window.MLS_Util.InitializePopupAds();
            }, 1500);

            return () => clearTimeout(to);
        }
    }, [window.MLS_Util]);

    return <div id="popup-ad-slot-1" data-pop-up-ad-slot></div>
}

export default PopUpAds
