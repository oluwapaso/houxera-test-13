import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { LuDoorOpen } from 'react-icons/lu'

const InteriorSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='interior'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <LuDoorOpen size={24} /> <span>Interior Details Features</span>
            </h1>

            {(prop.property_type != "Commercial") &&
                <div className="w-full mb-10 grid grid-cols-1 xs:grid-cols-2 gap-x-6 *:py-4 *:border-b *:border-gray-300">
                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold'>Bedrooms:</div>
                        <div className=''>{prop.bedrooms}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold'>Bathrooms:</div>
                        <div className=''>{prop.bathrooms}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold'>Half Bathrooms:</div>
                        <div className=''>{prop.half_bathrooms}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold'>Full Bathrooms:</div>
                        <div className=''>{prop.full_bathrooms}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold'>Total Rooms:</div>
                        <div className=''>{prop.total_rooms}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold'>Basement:</div>
                        <div className=''>{prop.basement}</div>
                    </div>
                </div>
            }

            <PropFeatures1 title="Interior Features" features={prop.interior_features} />
            <PropFeatures1 title="Flooring" features={prop.flooring} />
            <PropFeatures1 title="Kitchen Features" features={prop.kitchen_features} />
            <PropFeatures1 title="Heating Features" features={prop.heating} />
            <PropFeatures1 title="Cooling Features" features={prop.cooling} />

            {(prop.property_type == "Commercial") &&
                <PropFeatures1 title="Building Exterior Features" features={prop.office_features} />
            }
        </div>
    )
}

export default InteriorSection1