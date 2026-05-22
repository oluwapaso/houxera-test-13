import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { FaTreeCity } from 'react-icons/fa6'

const ExteriorSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='exterior'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <FaTreeCity size={24} /> <span>Exterior Details</span>
            </h1>

            {(prop.property_type != "Land") &&
                <>
                    <PropFeatures1 title="Exterior Features" features={prop.exterior_features} />
                    <PropFeatures1 title="Exterior Material" features={prop.exterior_material} />
                    <PropFeatures1 title="Roof Type" features={prop.roof_type} />
                </>
            }

            <PropFeatures1 title="Lot Features" features={prop.lot_features} />
            {(prop.property_type !== "Multi-Unit") &&
                <PropFeatures1 title="Property View" features={prop.property_view} />
            }
        </div>
    )
}

export default ExteriorSection1