import React from 'react'

const SalesTypeBadge = ({ sales_type }: { sales_type: string }) => {

    let bg_color = ""
    let txt_color = ""
    if (sales_type == "For Sale") {
        bg_color = "green-600"
        txt_color = "white"
    } else if (sales_type == "For Rent") {
        bg_color = "sky-600"
        txt_color = "white"
    } else if (sales_type == "For Lease") {
        bg_color = "pink-600"
        txt_color = "white"
    }

    return (
        <div className='p-1 bg-white/50 rounded-md'>
            <div className={`bg-${bg_color} text-${txt_color} px-3 py-0.5 rounded text-sm font-medium`}>
                {sales_type}
            </div>
        </div>
    )

}

export default SalesTypeBadge
