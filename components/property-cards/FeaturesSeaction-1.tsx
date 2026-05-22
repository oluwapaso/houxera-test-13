"use client"

import { Helpers } from '@/_lib/helper';
import React from 'react'
import { BsStars } from 'react-icons/bs';
// import numeral from 'numeral';

const helper = new Helpers();
const FeaturesSeaction1 = ({ prop }: { prop: any }) => {


    const StatusBadge = (status: string) => {

        var bg = ""
        var text = ""
        var status_text = status

        if (status == "Active") {
            bg = "bg-green-600"
            text = "text-white"
        } else {
            bg = "bg-gray-800"
            text = "text-white"
        }

        return <div className={`${bg} ${text} px-5 py-1 h-7 rounded flex items-center justify-center text-sm font-md 
        cursor-pointer hover:shadow-2xl select-none`}>{status_text}</div>
    }

    return (
        <div className='section w-full mt-14' id='features'>
            <h1 className='w-full font-play-fair-display text-2xl'></h1>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <BsStars size={24} /> <span>Features</span>
            </h1>
            <div className='w-full mt-4 grid grid-cols-1 xs:grid-cols-2 gap-x-6 *:py-4 *:border-b *:border-gray-300'>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>MLS&reg; #</div>
                    <div className='font-normal text-base text-right'>{prop.mls_number}</div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Type</div>
                    <div className='font-normal text-base text-right'>
                        {prop.property_sub_type} ({prop.property_type})
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Monthly Rent</div>
                    <div className='font-normal text-base text-right'>{helper.formatCurrency(prop.listprice)}</div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Living Area</div>
                    <div className='font-normal text-base text-right'>{helper.formatWholeNumber(prop.square_meter)} sqm</div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Lot Size</div>
                    <div className='font-normal text-base text-right'>{helper.formatWholeNumber(prop.lot_size)}</div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Year Built</div>
                    <div className='font-normal text-base text-right'>{prop.year_built}</div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Pets Allowed</div>
                    <div className='font-normal text-base text-right'>{prop.pets_allowed}</div>
                </div>

                {(Array.isArray(prop.parking) && prop.parking.length > 0) &&
                    <div className='flex justify-between'>
                        <div className='font-semibold text-base'>Parking Available</div>
                        <div className='font-normal text-base text-right'>
                            {prop.parking.join(",")}
                        </div>
                    </div>
                }

                {prop.parking?.includes("Garage") &&
                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Garage Spaces:</div>
                        <div className=' text-gray-600'>{prop.garage_spaces}</div>
                    </div>
                }

                {prop.parking?.includes("Carport") &&
                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Carport Spaces:</div>
                        <div className=' text-gray-600'>{prop.carport_spaces}</div>
                    </div>
                }

                {prop.parking?.includes("Off-Street Parking") &&
                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Off-Street Parking Spaces:</div>
                        <div className=' text-gray-600'>{prop.off_street_parking_spaces}</div>
                    </div>
                }

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Utilities Per Month</div>
                    <div className='font-normal text-base text-right'>{helper.formatCurrency(prop.utilities_per_month)}</div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Status</div>
                    <div className={`text-sm text-right uppercase font-normal bg-white px-4 py-1 rounded-full`}>
                        {StatusBadge(prop.property_status)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FeaturesSeaction1
