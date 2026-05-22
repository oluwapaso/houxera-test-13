import { Helpers } from '@/_lib/helper'
import React from 'react'
import { BsBuildings } from 'react-icons/bs'
import { CgShoppingCart } from 'react-icons/cg'
import { GiIsland } from 'react-icons/gi'
import { IoConstructOutline } from 'react-icons/io5'
import { LiaBathSolid } from 'react-icons/lia'
import { LuBedDouble, LuReceipt } from 'react-icons/lu'
import { MdPets } from 'react-icons/md'
import { TbCalendarDollar, TbMoneybag } from 'react-icons/tb'
import numeral from 'numeral';

const helper = new Helpers();
const AboutSection1 = ({ prop }: { prop: any }) => {

    return (
        <div className="section w-full" id='about'>

            <h1 className='w-full text-3xl md:text-4xl'>About {prop.title}</h1>
            <h1 className='w-full text-xl'>{prop.address} {prop.neighborhood}, {prop.city}, {prop.state}</h1>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 *:rounded'>
                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    <BsBuildings size={25} className='mr-2' />
                    <span> {prop.property_type}</span>
                </div>

                {(prop.listing_type == "For Rent" || prop.listing_type == "For Lease") &&
                    <div className='py-4 px-4 bg-gray-100 flex items-center'>
                        <TbCalendarDollar size={25} className='mr-2' />
                        <span>{numeral(prop.listing_price).format("₦0,0")}/{prop.property_type == "For Rent" ? "mo" : "yr"}</span>
                        {/* <span>{helper.formatCurrency(prop.listing_price, true)}/{prop.property_type == "For Rent" ? "mo" : "yr"}</span> */}
                    </div>
                }

                {(prop.listing_type == "For Sale") &&
                    <div className='py-4 px-4 bg-gray-100 flex items-center'>
                        <TbMoneybag size={25} className='mr-2' />
                        {/* <span>{numeral(prop.listing_price).format("$0,0")}</span> */}
                        <span>{helper.formatCurrency(prop.listing_price, true)}</span>
                    </div>
                }

                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    <CgShoppingCart size={25} className='mr-2' /> <span>{prop.listing_type}</span>
                </div>

                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    {/* <LuBedDouble size={25} className='mr-2' /> <span>Beds {numeral(prop.bedrooms).format("0,0")}</span> */}
                    <LuBedDouble size={25} className='mr-2' /> <span>Beds {helper.formatWholeNumber(prop.bedrooms)}</span>
                </div>

                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    {/* <LiaBathSolid size={25} className='mr-2' />  <span>Baths {numeral(prop.bathrooms).format("0,0")}</span> */}
                    <LiaBathSolid size={25} className='mr-2' />  <span>Baths {helper.formatWholeNumber(prop.bathrooms)}</span>
                </div>

                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    <IoConstructOutline size={25} className='mr-2' />  <span>Built in {prop.year_built}</span>
                </div>

                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    <GiIsland size={25} className='mr-2' />
                    {/* <span>{prop.square_meter ? numeral(prop.square_meter).format("0,0") : "--"} sqm</span> */}
                    <span>{prop.square_meter ? helper.formatWholeNumber(prop.square_meter) : "--"} sqm</span>
                </div>

                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    {prop.pets_allowed == "Yes"
                        ? <MdPets size={25} className='mr-2' />
                        : <div className='mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512">
                                <path d="M210.61 116c21.56 0 39.04 26.79 39.04 59.83s-17.48 59.83-39.04 59.83-39.04-26.79-39.04-59.83S189.05 116 210.61 116zm49.63 144.83c45.71.1 51.39 30.37 89.94 82.21 19.2 37.71-5.74 61.49-48.49 51.3-19.38-9.88-33.04-13.38-46.72-12.9-23.7.84-29.68 16.47-57.27 15.36-21.29-.58-30.85-9.49-32.72-23.08-1.98-14.44 3.58-23.57 10.36-35.52 26.36-46.48 53.63-83.18 84.89-77.37h.01zm-125.04-56.1c-16.12 6.37-21.26 31.56-11.49 56.26 9.77 24.7 30.75 39.55 46.86 33.17 16.12-6.36 21.26-31.56 11.49-56.25-9.76-24.7-30.75-39.56-46.86-33.18zm241.6 0c16.11 6.37 21.26 31.56 11.49 56.26-9.77 24.7-30.76 39.55-46.87 33.17-16.11-6.36-21.26-31.56-11.49-56.25 9.77-24.7 30.76-39.56 46.87-33.18zm-76.11-89.59c21.55 0 39.04 26.8 39.04 59.83 0 33.04-17.49 59.83-39.04 59.83-21.56 0-39.04-26.79-39.04-59.83s17.48-59.83 39.04-59.83z" />
                                <path fill="#D92D27" fill-rule="nonzero" d="M256 0c34.61 0 67.67 6.9 97.86 19.41 31.4 13 59.6 32.01 83.16 55.57a256.57 256.57 0 0 1 55.57 83.16C505.1 188.34 512 221.39 512 256s-6.91 67.66-19.41 97.86a256.57 256.57 0 0 1-55.57 83.16 256.463 256.463 0 0 1-83.16 55.57C323.67 505.1 290.61 512 256 512s-67.66-6.9-97.86-19.41a256.463 256.463 0 0 1-83.16-55.57 256.41 256.41 0 0 1-55.57-83.16C6.9 323.66 0 290.61 0 256s6.9-67.67 19.41-97.86c13.01-31.4 32.01-59.6 55.57-83.16a256.304 256.304 0 0 1 83.16-55.57C188.33 6.9 221.39 0 256 0zm167.68 137.2L137.2 423.67c15.54 11.04 32.65 19.96 50.92 26.35 21.19 7.41 44.03 11.44 67.88 11.44 27.89 0 54.44-5.53 78.61-15.54 25.07-10.38 47.69-25.66 66.67-44.64 18.99-18.99 34.26-41.6 44.65-66.68 10.01-24.16 15.53-50.71 15.53-78.61h.04c0-23.76-4.04-46.61-11.48-67.87-6.39-18.27-15.31-35.38-26.34-50.92zM99.84 389.57 389.57 99.84c-16.99-14.55-36.35-26.37-57.42-34.78-23.48-9.37-49.17-14.52-76.15-14.52-27.9 0-54.45 5.52-78.61 15.53-25.08 10.39-47.69 25.66-66.68 44.64-18.98 18.99-34.25 41.6-44.64 66.68-10 24.16-15.53 50.71-15.53 78.61 0 26.97 5.15 52.67 14.53 76.15 8.4 21.06 20.22 40.43 34.77 57.42z" />
                            </svg>
                        </div>
                    }

                    <span>{prop.pets_allowed == "Yes" ? `Pets Allowed` : "No Pets"}</span>
                </div>


                <div className='py-4 px-4 bg-gray-100 flex items-center'>
                    <LuReceipt size={25} className='mr-2' />
                    {/* <span>Utilities {numeral(prop.utilities_per_month).format("$0,0")}/mo</span> */}
                    <span>Utilities {helper.formatCurrency(prop.utilities_per_month, true)}/mo</span>
                </div>

            </div>

            <h1 className='w-full text-2xl mt-10'>Description</h1>
            <div className='w-full mt-2 leading-8 font-normal'>{prop.property_description}</div>

        </div>
    )
}

export default AboutSection1