import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { BsTools } from 'react-icons/bs'

const AmmenitiesSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='ammenities'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <BsTools size={24} />
                <span>{(prop.property_type == "Multi-Unit") ? <span>Shared Ammenities</span> : <span>Ammenities</span>}</span>
            </h1>

            {(prop.property_type != "Land" && prop.property_type != "Farm/Ranch") &&
                <PropFeatures1 title="Accessibility Features" features={prop.accessibility_features} />
            }

            <PropFeatures1 title="Green Features" features={prop.green_features} />
            <PropFeatures1 title="Security Features" features={prop.security_features} />

            {(prop.property_type != "Land" && prop.property_type != "Farm/Ranch") &&
                <>
                    <PropFeatures1 title="Community Amenities" features={prop.community_amenities} />
                    <PropFeatures1 title="Restrictions" features={prop.restrictions} />
                </>
            }

            {(prop.property_type == "Land") &&
                <PropFeatures1 title="Farm Features" features={prop.farm_features} />
            }

            {(prop.property_type == "Farm/Ranch") &&
                <>
                    <PropFeatures1 title="Lifestyle & Comfort" features={prop.lifestyle_comfort} />
                    <PropFeatures1 title="Technology & Equipment" features={prop.technology_equipment} />
                </>
            }

        </div>
    )
}

export default AmmenitiesSection1