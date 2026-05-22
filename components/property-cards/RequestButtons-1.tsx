import usePropertyModal from '@/_hooks/usePropertyModal';
import { RootState } from '@/app/GlobalRedux/store';
import React, { useEffect, useState } from 'react'
import { BiEnvelopeOpen, BiShare, BiWalk } from 'react-icons/bi'
import { useSelector } from 'react-redux';

const RequestButtons1 = ({ prop }: { prop: any }) => {

    const [modal_page, setModalPage] = useState<"Enquiry" | "Tour" | "Share" | null>(null);
    const prop_modal = useSelector((state: RootState) => state.user.prop_modal);

    usePropertyModal({ page: modal_page, property_info: prop });

    useEffect(() => {
        if (!prop_modal.shown) {
            setModalPage(null);
        }
    }, [prop_modal.shown]);

    return (
        <div className=' w-full mt-10 *:flex *:items-center *:space-x-2 *:px-4 *:py-3 *:cursor-pointer *:border 
            *:border-gray-900 *:rounded space-y-2.5'>
            <div className=' hover:bg-gray-200' onClick={() => setModalPage("Enquiry")}>
                <BiEnvelopeOpen size={20} />
                <div>Make Enquiry</div>
            </div>

            <div className=' hover:bg-gray-200' onClick={() => setModalPage("Tour")}>
                <BiWalk size={20} />
                <div>Schedule a Tour</div>
            </div>

            <div className=' hover:bg-gray-200' onClick={() => setModalPage("Share")}>
                <BiShare size={20} />
                <div>Share Listing</div>
            </div>
        </div>
    )
}

export default RequestButtons1