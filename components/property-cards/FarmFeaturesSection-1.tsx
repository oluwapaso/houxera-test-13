import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { GiFarmTractor } from 'react-icons/gi'

const FarmFeaturesSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='farm'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <GiFarmTractor size={24} /> <span>Farm Features</span>
            </h1>

            <PropFeatures1 title="Agricultural Features" features={prop.agricultural_features} />
            <PropFeatures1 title="Agricultural Operations" features={prop.agricultural_operations} />
            <PropFeatures1 title="Land & Terrain" features={prop.land_and_terrain} />
            <PropFeatures1 title="Recreational Features" features={prop.recreational_features} />
        </div>
    )
}

export default FarmFeaturesSection1