"use client"

import React, { JSX } from 'react'
import { Helpers } from "@/_lib/helper";

const helper = new Helpers();
const InsigthCard1 = ({ name, value, icon }: { name: string, value: any, icon?: JSX.Element }) => {
    return (
        <div>
            <div className=''>{icon}</div>
            <div className="flex flex-col justify-center">
                <div className=" text-2xl font-medium">
                    {value}
                </div>
                <div>{name}</div>
            </div>
        </div>
    )
}

export default InsigthCard1