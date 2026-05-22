import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const AddressSection1 = ({ prop }: { prop: any }) => {
    return (

        <div className='section w-full mt-14' id='address'>
            <h1 className='w-full font-play-fair-display text-2xl'></h1>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <FaMapMarkerAlt size={24} /> <span>Property Address</span>
            </h1>
            <div className='w-full mt-4 grid grid-cols-1 xs:grid-cols-2 gap-x-6 *:py-4 *:border-b *:border-gray-300'>

                <div className='flex justify-between col-span-full'>
                    <div className='font-semibold text-base'>Street Address:</div>
                    <div className='font-normal text-base text-right'>{prop.street_address}</div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>City</div>
                    <div className='font-normal text-base text-right'> {prop.city} </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>State</div>
                    <div className='font-normal text-base text-right'> {prop.state} </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>L.G.A</div>
                    <div className='font-normal text-base text-right'> {prop.local_government} </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Postal Code</div>
                    <div className='font-normal text-base text-right'> {prop.postal_code} </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Neighborhood</div>
                    <div className='font-normal text-base text-right'> {prop.neighborhood} </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Sub-Division</div>
                    <div className='font-normal text-base text-right'> {prop.subdivision} </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Parcel Number</div>
                    <div className='font-normal text-base text-right'> {prop.parcel_number} </div>
                </div>

                {
                    (prop.property_type == "Residential" || prop.property_type == "Rental") &&
                    <div className='flex justify-between'>
                        <div className='font-semibold text-base'>School District</div>
                        <div className='font-normal text-base text-right'> {prop.school_district} </div>
                    </div>
                }

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Latitude</div>
                    <div className='font-normal text-base text-right'> {prop.latitude} </div>
                </div>

                <div className='flex justify-between'>
                    <div className='font-semibold text-base'>Longitude</div>
                    <div className='font-normal text-base text-right'> {prop.longitude} </div>
                </div>

                <div className='flex justify-between col-span-full'>
                    <div className='font-semibold text-base'>Directions</div>
                    <div className='font-normal text-base text-right'> {prop.directions} </div>
                </div>
            </div>
        </div>
    )
}

export default AddressSection1