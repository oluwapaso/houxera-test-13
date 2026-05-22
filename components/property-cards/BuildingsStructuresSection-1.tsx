import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { BiBuildings } from 'react-icons/bi'

const BuildingsStructuresSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='buildings'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <BiBuildings size={24} /> <span>Buildings & Structures</span>
            </h1>

            <PropFeatures1 title="Buildings & Structures" features={prop.buildings_structures} />
            <PropFeatures1 title="Fencing" features={prop.fencing} />
            <PropFeatures1 title="Land & Terrain" features={prop.land_and_terrain} />
            <PropFeatures1 title="Access & Infrastructure" features={prop.access} />
        </div>
    )
}

export default BuildingsStructuresSection1