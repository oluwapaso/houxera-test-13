import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { FiAlertTriangle } from 'react-icons/fi'

const DisclosuresSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='disclosures'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <FiAlertTriangle size={24} /> <span>Disclosures</span>
            </h1>

            {(prop.property_type != "Farm/Ranch" && prop.property_type != "Land") &&
                <PropFeatures1 title="Seller Disclosure" features={prop.seller_disclosure} />
            }

            <div className='w-full mt-4 grid grid-cols-1 gap-x-6 *:py-4 mb-10'>
                <div className=' flex flex-col mb-10'>
                    <h1 className='w-full text-2xl'>Special Assessments</h1>
                    <div className='w-full mt-2 leading-8 font-normal'>{prop.special_assessments}</div>
                </div>

                <div className=' flex flex-col'>
                    <h1 className='w-full text-2xl'>Environmental Hazards</h1>
                    <div className='w-full mt-2 leading-8 font-normal'>{prop.special_assessments}</div>
                </div>
            </div>


        </div>
    )
}

export default DisclosuresSection1