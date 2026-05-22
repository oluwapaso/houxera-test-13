import React from 'react'
import PropFeatures1 from './PropFeatures-1'
import { HiBanknotes } from 'react-icons/hi2'
import { Helpers } from '@/_lib/helper';

const helpers = new Helpers();
const FinancialSection1 = ({ prop }: { prop: any }) => {
    return (
        <div className='section w-full mt-14' id='financial'>
            <h1 className='w-full font-play-fair-display text-3xl mb-2 flex items-center space-x-2'>
                <HiBanknotes size={24} /> <span>Financial Details</span>
            </h1>

            {(prop.property_type != "Property-Unit") &&
                <div className='w-full mt-4 grid grid-cols-1 xs:grid-cols-2 gap-x-6 *:py-4 *:border-b *:border-gray-300'>
                    {(prop.listing_type != "For Rent") &&
                        <div className=' flex items-center space-x-2'>
                            <div className='font-semibold text-gray-800'>Property Taxes:</div>
                            <div className=' text-gray-600'>{helpers.formatCurrency(prop.property_taxes, true)}</div>
                        </div>
                    }

                    {((prop.property_type == "Residential" || prop.listing_type != "For Sale")
                        || (prop.property_type == "Multi-Unit" && prop.listing_type != "For Rent")
                    ) &&
                        <>
                            <div className=' flex items-center space-x-2'>
                                <div className='font-semibold text-gray-800'>HOA Fees:</div>
                                <div className=' text-gray-600'>{prop.hoa_fees}</div>
                            </div>

                            {(prop.hoa_fees == "Yes") &&
                                <>
                                    <div className=' flex items-center space-x-2'>
                                        <div className='font-semibold text-gray-800'>HOA Amount:</div>
                                        <div className=' text-gray-600'>{helpers.formatCurrency(prop.hoa_amount, true)}</div>
                                    </div>

                                    <div className=' flex items-center space-x-2'>
                                        <div className='font-semibold text-gray-800'>HOA Frequency:</div>
                                        <div className=' text-gray-600'>{prop.hoa_frequency}</div>
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
            }

            {(prop.property_type == "Rental" || prop.listing_type != "For Sale") &&
                <div className='w-full mt-4 grid grid-cols-1 xs:grid-cols-2 gap-x-6 *:py-4 *:border-b *:border-gray-300'>
                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Lease Duration:</div>
                        <div className=' text-gray-600'>{prop.lease_duration}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Security Deposit:</div>
                        <div className=' text-gray-600'>{helpers.formatCurrency(prop.lease_security_deposit, true)}</div>
                    </div>

                    <div className=' flex items-center space-x-2'>
                        <div className='font-semibold text-gray-800'>Pet Deposit:</div>
                        <div className=' text-gray-600'>{helpers.formatCurrency(prop.lease_pet_deposit, true)}</div>
                    </div>
                </div>
            }

            {(prop.property_type == "Rental" || prop.property_type == "Property-Unit" ||
                (prop.property_type == "Multi-Unit" && prop.listing_type != "For Rent") ||
                (prop.property_type == "Commercial" && prop.listing_type != "For Sale")) &&
                <>

                    {(prop.property_type == "Multi-Unit" && prop.listing_type != "For Rent") &&
                        <>
                            <div className=' flex items-center space-x-2'>
                                <div className='font-semibold text-gray-800'>Gross Income:</div>
                                <div className=' text-gray-600'>{helpers.formatCurrency(prop.gross_income, true)}</div>
                            </div>


                            <div className=' flex items-center space-x-2'>
                                <div className='font-semibold text-gray-800'>Gross Scheduled Income:</div>
                                <div className=' text-gray-600'>{helpers.formatCurrency(prop.gross_scheduled_income, true)}</div>
                            </div>


                            <div className=' flex items-center space-x-2'>
                                <div className='font-semibold text-gray-800'>Operating Expense:</div>
                                <div className=' text-gray-600'>{helpers.formatCurrency(prop.operating_expense, true)}</div>
                            </div>

                            <div className=' col-span-full !mt-3 !border-0'>
                                <div className='w-full flex flex-col *:pb-5 *:pt-5 *:border-b *:border-dashed *:border-gray-300'>

                                    <PropFeatures1 title="Income Includes" features={prop.income_includes} />
                                    <PropFeatures1 title="Operating Expense Includes" features={prop.operating_expense_includes} />

                                    {(prop.property_type != "Multi-Unit") &&
                                        <>
                                            <PropFeatures1 title="Owner Pays" features={prop.owner_pays} />
                                            <PropFeatures1 title="Tenant Pays" features={prop.tenant_pays} />
                                        </>
                                    }
                                </div>
                            </div>

                        </>
                    }
                </>

            }

            {(prop.listing_type == "For Sale") &&
                <PropFeatures1 title="Financial Options" features={prop.financial_options} />
            }
        </div>
    )
}

export default FinancialSection1