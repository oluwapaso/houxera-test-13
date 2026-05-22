"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hidePageLoader } from '../../../GlobalRedux/app/appSlice'
import Footer from '@/components/Footer'
import NavVar1 from '@/components/navs/NavVar-1'
import { Helpers } from '@/_lib/helper'
import FloatingInput from '@/components/FloatingInput'
import { PiMathOperations, PiMathOperationsDuotone } from 'react-icons/pi'
import { RootState } from '@/app/GlobalRedux/store'

const helpers = new Helpers();
const MortgageCalculatorPage = () => {

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const empty_form_data = {
        property_price: helpers.formatCurrency("100000000", true),
        downpay_dollar: helpers.formatCurrency("25000000", true),
        downpay_percent: "25%",
        length_of_mortgage: 30,
        interest_rate: 10,
    }

    const [monthly_payment, setMonthlyPayment] = useState("0");
    const [show_calc, setShowCalc] = useState(false);
    const [calc_data, setCalcData] = useState(empty_form_data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCalcData((prev_data) => {
            return {
                ...prev_data,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleDpChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name == "downpay_dollar") {

            let value = (100 * (parseFloat(helpers.formatMoneyToNumber(e.target.value)) / parseFloat(helpers.formatMoneyToNumber(calc_data.property_price)))).toFixed(2).toString()
            if (Number.isNaN(value)) {
                value = "0"
            }

            value = value.replace(".00", "").replace("₦", "").replace("NGN", "").replace("%", "");
            value = `${helpers.formatFraction(value)}%`;

            setCalcData((prev_data: any) => {
                return {
                    ...prev_data,
                    [e.target.name]: e.target.value,
                    ["downpay_percent"]: value
                }
            })

        } else if (e.target.name == "downpay_percent") {

            let value = parseFloat(helpers.formatMoneyToNumber(calc_data.property_price)) * (parseFloat(helpers.formatMoneyToNumber(e.target.value)) / 100)

            setCalcData((prev_data: any) => {
                return {
                    ...prev_data,
                    [e.target.name]: e.target.value,
                    ["downpay_dollar"]: helpers.formatCurrency(value.toFixed(2), true)
                }
            })

        }

    }

    const handleShowCalc = () => {

        setShowCalc(!show_calc)
        if (show_calc) {
            const monthly_breakdown = document.getElementById("monthly_breakdown");
            if (monthly_breakdown) {
                monthly_breakdown.innerHTML = "";
            }
        } else {
            var to = setTimeout(CalculateMortagage, 250);
            return () => clearTimeout(to);
        }

    }

    const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> |
        React.ChangeEvent<HTMLTextAreaElement>
    ) => {

        var value = e.target.value;
        const isCurrency = e.target.dataset.isCurrency === 'true';
        const isNumber = e.target.dataset.isNumber === 'true';
        const maxLen = parseInt(e.target.dataset.maxLen as string);
        const maxVal = parseInt(e.target.dataset.maxVal as string);
        const minVal = parseInt(e.target.dataset.minVal as string);
        const isPercent = e.target.dataset.isPercent === 'true';
        // const minNumber = parseInt(e.target.dataset.min as string); 

        setCalcData((prev_val: any) => {
            const prevVal = { ...prev_val }

            let newValue = value;
            if (isCurrency) {
                newValue = helpers.formatCurrency(value, true); ///minNumber.toString() 
            }

            if (isNumber) {
                newValue = helpers.formatWholeNumber(value); ///minNumber.toString() 
            }

            if (maxLen && maxLen > 0) {
                newValue = newValue.substring(0, maxLen);
            }

            if (parseInt(newValue) > maxVal) {
                newValue = maxVal.toString();
            }

            if (parseInt(newValue) < minVal) {
                newValue = minVal.toString();
            }

            if (isPercent) {
                newValue = newValue.replace(".00", "").replace("₦", "").replace("NGN", "").replace("%", "");
                if (parseFloat(newValue) < 0) {
                    newValue = "0";
                }

                if (parseFloat(newValue) > 100) {
                    newValue = "100";
                }

                newValue = `${helpers.formatFraction(newValue)}%`; ///minNumber.toString() 
            }

            return {
                ...prevVal,
                [e.target.name]: newValue,
            }
        })
    }

    const CalculateMortagage = () => {

        const downPayment = parseFloat(helpers.formatMoneyToNumber(calc_data.downpay_dollar));
        const propertyPrice = parseFloat(helpers.formatMoneyToNumber(calc_data.property_price));
        const interestRate = parseFloat(calc_data.interest_rate.toString()) / 100;
        const mortgageLength = parseFloat(calc_data.length_of_mortgage.toString());
        const monthlyInterestRate = interestRate / 12;
        const numberOfPayments = mortgageLength * 12;
        const principal = propertyPrice - downPayment;
        const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        // setMonthlyPayment(new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'NGN'
        // }).format(monthlyPayment))

        setMonthlyPayment(helpers.formatCurrency(monthlyPayment.toString()));

        let appendTo = document.getElementById("further_brk_dwn")
        if (appendTo) {

            appendTo.innerHTML = `
            <li><strong>The down payment</strong> = The price of the home multiplied by the percentage down
            divided by 100 (for ${calc_data.downpay_percent} down ,<br/> becomes ${calc_data.downpay_percent}/100 or ${parseFloat(calc_data.downpay_percent) / 100}) 
            ${helpers.formatCurrency(downPayment.toString(), true)} = ${helpers.formatCurrency((propertyPrice - downPayment).toString())} X (${calc_data.downpay_percent} / 100)
            </li>

            <li><strong>The interest rate</strong> = The annual interest percentage divided by 100 <br/>
            ${interestRate / 100} = ${interestRate}% / 100
            </li>

            <li><strong>The monthly interest rate</strong> = The annual interest rate divided by 12 (for the 12 months in a year)<br/>
            ${(interestRate / 100) / 12} = ${interestRate / 100} / 12
            </li>

            <li><strong>The month term of the loan in months</strong> = The number of years you've taken the loan out for times 12<br/>
            ${numberOfPayments} Months = ${mortgageLength} Years X 12
            </li>

            <li>The monthly payment is figured out using the following <strong>formula</strong>:<br/>
            <div class='w-full my-3'>
            <div class='flex items-center font-play-fair-display'>
                <div class='text-4xl'>
                    M = P
                </div>
                <div class='text-3xl flex flex-col divide-y-2 ml-4'>
                    <div>r (1 + r)<sup>n</sup></div>
                    <div>(1 + r)<sup>n</sup> - 1</div>
                </div>
            </div>
            </div>
            <div class='w-full'>
            Monthly Payment = ${principal} * (${interestRate / 100} / (1 - ((1 + ${interestRate / 100}) - ${numberOfPayments})))
            </div>
            </li>
            `
        }

        if (show_calc) {
            let remainingBalance = principal;
            let output = '<div class="w-full px-4 py-3 bg-gray-100 font-semibold"><h3>Year 1</h3></div>';

            output += `<div class="!w-full !max-w-[100%] overflow-x-auto py-3 px-4 border border-gray-200 mb-5"><table class="table table-auto w-[900px] lg:w-full"><tr><th>Month</th><th>Interest Paid</th><th>Principal Paid</th>
            <th>Remaining Balance</th></tr>`;

            let k = 1;
            for (let i = 1; i <= numberOfPayments; i++) {

                const interestPaid = remainingBalance * monthlyInterestRate;
                const principalPaid = monthlyPayment - interestPaid;
                remainingBalance -= principalPaid;

                output += `<tr class="*:py-3 border-b border-gray-200">
                    <td>${k}</td>
                    <td>${helpers.formatCurrency(interestPaid.toString(), true)}</td>
                    <td>${helpers.formatCurrency(principalPaid.toString(), true)}</td>
                    <td>${helpers.formatCurrency(remainingBalance.toString(), true)}</td>
                </tr>`;

                if (i % 12 === 0 && i !== numberOfPayments) {
                    output += '</table></div>';
                    output += `<div class="w-full px-4 py-3 bg-gray-100 font-semibold"><h3>Year ${(i / 12) + 1}</h3></h3></div><h3>`;
                    output += `<div class="!w-full !max-w-[100%] overflow-x-auto py-3 px-4 border border-gray-200 mb-5"><table class="table table-auto w-[900px] lg:w-full">
                    <tr><th>Month</th><th>Interest Paid</th><th>Principal Paid</th><th>Remaining Balance</th></tr>`;
                }

                if (k == 12) {
                    k = 0;
                }
                k++;
            }

            output += '</table></div>';

            const monthly_breakdown = document.getElementById("monthly_breakdown")
            if (monthly_breakdown) {
                monthly_breakdown.innerHTML = output
            }

        } else {
            const monthly_breakdown = document.getElementById("monthly_breakdown")
            if (monthly_breakdown) {
                monthly_breakdown.innerHTML = ""
            }
        }

    }

    useEffect(() => {

        var property_price = parseFloat(helpers.formatMoneyToNumber(calc_data.property_price))
        var downpay_percent = parseFloat(helpers.formatMoneyToNumber(calc_data.downpay_percent.toString()))
        let downpay_dollar = (downpay_percent / 100) * property_price;

        setCalcData((prev_data: any) => {
            return {
                ...prev_data,
                "downpay_dollar": helpers.formatCurrency(downpay_dollar.toString(), true)
            }
        });

    }, [calc_data.property_price, calc_data.downpay_percent]);

    useEffect(() => {
        dispatch(hidePageLoader());
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett && themeSett != null) {
        return (
            <div className="flex flex-col min-h-screen" >

                <NavVar1 transparent={false} />

                <main className="w-full flex flex-col min-h-[55dvh] bg-gray-50 relative z-20">

                    <div className="container mx-auto max-w-[1150px] py-12">


                        <div className='container mx-auto max-w-[1000px] px-3 xl:px-0 text-left'>
                            <h3 className='w-full font-play-fair-display text-2xl md:text-4xl'>Mortgage Calculator</h3>

                            <div className='w-full mt-4 bg-white p-8 drop-shadow-2xl rounded border border-gray-100'>
                                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-5'>

                                    <div className=''>
                                        <FloatingInput name='property_price' label='Property Price' placeholder='Property Price'
                                            handleChange={(e) => handleChange(e)} value={calc_data.property_price.toString()}
                                            handleBlur={(e) => handleInputBlur(e)} required data-is-currency />
                                    </div>

                                    <div className='w-full grid grid-cols-4 gap-0'>
                                        <div className='col-span-2'>
                                            <FloatingInput name='downpay_dollar' label='Down.Pay Amt.' placeholder='Down Payment Amount'
                                                handleChange={(e) => handleDpChange(e)} value={calc_data.downpay_dollar.toString()}
                                                handleBlur={(e) => handleInputBlur(e)} required data-is-currency />
                                        </div>

                                        <div className='col-span-2'>
                                            <FloatingInput name='downpay_percent' label='Down.Pay Percentage' placeholder='Down Payment Percentage'
                                                handleChange={(e) => handleDpChange(e)} value={calc_data.downpay_percent.toString()}
                                                handleBlur={(e) => handleInputBlur(e)} required data-is-percent />
                                        </div>
                                    </div>

                                    <div className=''>
                                        <FloatingInput name='length_of_mortgage' label='Length of Mortgage' placeholder='Length of Mortgage'
                                            handleChange={(e) => handleChange(e)} value={calc_data.length_of_mortgage.toString()} required data-is-number
                                            handleBlur={(e) => handleInputBlur(e)} data-max-len={2} data-max-val={30} data-min-val={1} />
                                    </div>

                                    <div className=''>
                                        <FloatingInput name='interest_rate' label='Annual Interest Rate' placeholder='Annual Interest Rate'
                                            handleChange={(e) => handleChange(e)} value={calc_data.interest_rate.toString()} required data-is-percent
                                            handleBlur={(e) => handleInputBlur(e)} data-max-len={3} data-max-val={100} data-min-val={0} />
                                    </div>

                                    <div className='sm:col-span-2 relative flex items-center -left-2.5'>
                                        <input type='checkbox' className='styled-checkbox' name='show_calc' id='show_calc' checked={show_calc}
                                            onChange={handleShowCalc} />
                                        <label className='' htmlFor="show_calc">
                                            <span className=''>Show me the calculations and amortization</span>
                                        </label>
                                    </div>

                                    <div className='sm:col-span-2 my-4'>
                                        THIS MORTGAGE CALCULATOR CAN BE USED TO FIGURE OUT MONTHLY PAYMENTS OF A HOME MORTGAGE LOAN,
                                        BASED ON THE HOME'S SALE PRICE, THE TERM OF THE LOAN DESIRED, BUYER'S DOWN PAYMENT PERCENTAGE,
                                        AND THE LOAN'S INTEREST RATE.
                                    </div>

                                    <div className='sm:col-span-2'>
                                        <button className={`bg-${themeSett.primary_color}-700 hover:bg-${themeSett.primary_color}-600 
                                        rounded text-white px-5 py-3 float-right font-normal flex items-center justify-center 
                                        cursor-pointer `} onClick={CalculateMortagage}>
                                            <PiMathOperations size={16} className='mr-1.5' /> <span>Calculate</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full mt-20' id='result_area'>
                                <div className='w-full flex flex-col justify-center'>
                                    <div className='float-none w-full flex flex-col items-center justify-center'>
                                        <h1 className='text-5xl font-bold'>{monthly_payment}</h1>
                                        <h2 className='font-semibold mt-2 text-xl'>Your estimated monthly payment.</h2>
                                    </div>
                                    <div className={`float-none w-full mt-8  ${!show_calc ? "hidden" : ""}`} id='calculation_area'>

                                        <div className='w-full font-play-fair-display text-2xl font-semibold'>Calculations and Amortization</div>
                                        <div className='w-full mt-2'>
                                            <ol className='list-decimal pl-4 *:mb-4 *:font-normal' id="further_brk_dwn"></ol>
                                        </div>

                                    </div>
                                </div>

                                <div className={`w-full mt-8 overflow-x-auto ${!show_calc ? "hidden" : ""}`} id='monthly_breakdown'></div>

                            </div>
                        </div>






                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

export default MortgageCalculatorPage