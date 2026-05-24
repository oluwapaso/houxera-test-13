"use client"

import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import { LoadThemeSettings, updateThemeSettings } from '@/app/GlobalRedux/theme/themeSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import path from 'path';
import { updateBrokerInfo } from '@/app/GlobalRedux/broker/BrokerSlice';
import { updateAgentInfo } from '@/app/GlobalRedux/broker/AgentSlice';

const ThemeSettings = ({ theme_name }: { theme_name: string }) => {

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const ACCOUNT_ID = process.env.NEXT_PUBLIC_ACCOUNT_ID;
    const CHANNEL_UID = process.env.NEXT_PUBLIC_CHANNEL_UID;
    const MLS_NUMBER = process.env.NEXT_PUBLIC_MLS_NUMBER;
    const PROPERTY_DETAILS_EP = process.env.NEXT_PUBLIC_PROPERTY_DETAILS_EP;
    const THEME_NAME = process.env.NEXT_PUBLIC_THEME_NAME;
    const theme = useSelector((state: RootState) => state.theme);
    const broker = useSelector((state: RootState) => state.broker);
    const dispatch = useDispatch<AppDispatch>();

    const [isThemeSettLoaded, setThemeSettLoaded] = useState<boolean>(false);
    const [themeSett, setThemeSett] = useState<any>({});
    const [isBrokerInfoLoaded, setBrokerInfoLoaded] = useState<boolean>(false);
    const [isAgentInfoLoaded, setAgentInfoLoaded] = useState<boolean>(false);

    const handleThemeSettings = async () => {

        // toast.dismiss();
        // setThemeSettLoaded(false);
        // const resp = await dispatch(LoadThemeSettings({ theme_name }))
        // if (resp.type == "theme/settings/rejected") {

        //     const cast_resp = resp as any
        //     toast.error(`${cast_resp.error.message || resp.payload}`, {
        //         position: "top-center",
        //         theme: "colored"
        //     });

        // } else if (resp.type == "theme/settings/fulfilled") {
        //     const payload = resp?.payload as any;
        //     setThemeSett(payload.data.theme_settings.default_settings);
        //     setThemeSettLoaded(true);
        // }

        var default_settings = {
            "is_default": "Yes",
            "bg_solid_primary_color": "bg-green-600",
            "blog_card": "BlogCard-1",
            "footer_component": "Footer-1",
            "footer_menu": [
                {
                    "sub_menu": [
                        {
                            "link": "/buying-homes-in-lekki",
                            "title": "Buying Homes"
                        },
                        {
                            "link": "/selling-homes-in-lekki",
                            "title": "Selling Homes"
                        }
                    ],
                    "title": "Discover Services"
                },
                {
                    "sub_menu": [
                        {
                            "link": "/buying-homes-in-lekki",
                            "title": "Buying Homes"
                        },
                        {
                            "link": "/selling-homes-in-lekki",
                            "title": "Selling Homes"
                        }
                    ],
                    "title": "Popular links"
                }
            ],
            "header_component": "Header-1",
            "name": "theme name here",
            "primary_color": "amber-400",
            "primary_font": "Poppins",
            "property_card": "PropertyCard-1",
            "secondary_color": "yellow-400",
            "secondary_font": "Jost",
            "service_card": "ServiceCard-1",
            "solid_primary_color": "sky-600",
            "solid_secondary_color": "blue-500",
            "solid_sencondary_color": "gray-800",
            "solid_tetiary_color": "amber-600",
            "tetiary_color": "fuchsia-500",
            "theme_prefix": "/homely",
            "top_menu": [
                {
                    "link": "/home",
                    "title": "Home"
                },
                {
                    "sub_menu": [
                        {
                            "link": "/buying-homes-in-lekki",
                            "title": "Buying Homes"
                        },
                        {
                            "link": "/selling-homes-in-lekki",
                            "title": "Selling Homes"
                        }
                    ],
                    "title": "Our Services"
                }
            ],
            "version": "1.0.1"
        }

        setThemeSett(default_settings);
        dispatch(updateThemeSettings(default_settings));
        setThemeSettLoaded(true);

    }

    const handleLoadBrokerInfo = async () => {
        if (window.MLS_Util) {
            // window.MLS_Util.Init(API_KEY, ACCOUNT_ID);

            const payload = {
                "account_id": ACCOUNT_ID,
                "fields": "*"
            }

            const response = await window.MLS_Util.GetBrokerInfo(payload);

            let resp_message = response.message;
            let status_code = response.status_code;
            if (status_code == 200) {
                dispatch(updateBrokerInfo(response.data));
            } else {
                console.log(resp_message)
            }

            setBrokerInfoLoaded(true);

        }
    }

    const handleLoadAgentInfo = async () => {
        if (window.MLS_Util) {
            // window.MLS_Util.Init(API_KEY, ACCOUNT_ID);

            const payload = {
                "account_id": ACCOUNT_ID,
                "fields": "*"
            }

            const response = await window.MLS_Util.GetAgentInfo(payload);
            let resp_message = response.message;
            let status_code = response.status_code;
            if (status_code == 200) {
                dispatch(updateAgentInfo(response.data.agent_info));
            } else {
                console.log(resp_message)
            }

            setAgentInfoLoaded(true);

        }
    }

    useEffect(() => {
        if (themeSett.primary_color) {

            const props = [themeSett.primary_color, themeSett.secondary_color, themeSett.tetiary_color];
            const content = props.join("\n");
            const filePath = path.join(process.cwd(), "../safelist.txt");
            // const fs = require("fs");
            // fs.writeFileSync(filePath, content); 
        }
    }, [themeSett]);

    useEffect(() => {
        console.log("isThemeSettLoaded", isThemeSettLoaded, "primary_color", theme.theme_settings.primary_color)
        if (!theme.theme_settings.primary_color && !isThemeSettLoaded) {
            console.log("handling handleThemeSettings()")
            handleThemeSettings();
        } else {
            console.log("just setting setThemeSett()", theme.theme_settings)
            setThemeSett(theme.theme_settings);
            setThemeSettLoaded(true);
        }
    }, [isThemeSettLoaded]);

    useEffect(() => {
        if (!broker.company_unique_id && window.MLS_Util && !isBrokerInfoLoaded) {
            handleLoadBrokerInfo();
        }
    }, [isBrokerInfoLoaded, window.MLS_Util, API_KEY, ACCOUNT_ID, CHANNEL_UID]);

    useEffect(() => {
        if (!broker.company_unique_id && window.MLS_Util && !isAgentInfoLoaded) {
            handleLoadAgentInfo();
        }
    }, [isAgentInfoLoaded, window.MLS_Util, API_KEY, ACCOUNT_ID, CHANNEL_UID]);

    //Initialise SDK
    useEffect(() => {
        if (window.MLS_Util) {
            window.MLS_Util.Init(API_KEY, ACCOUNT_ID, MLS_NUMBER, CHANNEL_UID, PROPERTY_DETAILS_EP, THEME_NAME);
        }
    }, [window.MLS_Util]);

    return <></>
}

export default ThemeSettings
