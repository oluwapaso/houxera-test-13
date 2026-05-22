import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { LuUtilityPole } from 'react-icons/lu'

const UtilitiesSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='utilities'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <LuUtilityPole size={24} />
                <span>{(prop.property_type == "Multi-Unit") ? <span>Shared Utilities</span> : <span>Utilities</span>}</span>
            </h1>

            {(prop.property_type !== "Farm/Ranch") &&
                <div className='w-full mt-4 grid grid-cols-1 xs:grid-cols-2 gap-x-6 *:py-4 *:border-b *:border-gray-300 mb-10'>
                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Electricity:</div>
                        <div className=' text-gray-600'>{prop.electricity}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Gas:</div>
                        <div className=' text-gray-600'>{prop.gas}</div>
                    </div>
                </div>
            }

            {(prop.property_type == "Farm/Ranch") &&
                <PropFeatures1 title="Energy & Sustainability" features={prop.energy_and_sustainability} />
            }

            <PropFeatures1 title="Water Source" features={prop.water_source} />
            <PropFeatures1 title="Sewer" features={prop.sewer} />
            <PropFeatures1 title="Internet Access" features={prop.internet} />
            <PropFeatures1 title="Utilities Available at Site" features={prop.utilities_at_site} />

            {(prop.property_type == "Multi-Unit") &&
                <PropFeatures1 title="Common Areas" features={prop.common_areas} />
            }

            {(prop.property_type == "Farm/Ranch") &&
                <PropFeatures1 title="Fuel & Storage" features={prop.fuel_and_storage} />
            }
        </div>
    )
}

export default UtilitiesSection1