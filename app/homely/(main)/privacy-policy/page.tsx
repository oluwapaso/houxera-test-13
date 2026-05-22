"use client"

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hidePageLoader } from '../../../GlobalRedux/app/appSlice'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const PrivacyPolicyPage = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(hidePageLoader())
    }, [])

    return (
        <div className="flex flex-col min-h-screen" >
            <TopNav />
            <main className="w-full -mt-22 flex flex-col min-h-[55dvh]">

                {/**  ======================= Header Area Starts ====================== **/}
                <div className=" bg-cover bg-bottom pt-50 pb-5 ">
                    <div className="container mx-auto flex flex-col max-w-[1150px]">
                        <div className="flex w-full justify-start items-start flex-col space-y-4">
                            <div className="font-semibold text-4xl">Privacy Policy</div>
                            <div className=" mt-0 w-26 h-[6px] left-6 bg-icons-primary relative before:w-4 before:h-[6px] 
                            before:bg-icons-primary before:absolute before:-left-6"></div>
                        </div>
                    </div>
                </div>
                {/**  ======================= Header Area Ends ====================== **/}

                <div className="w-full relative pb-50">
                    <div className="container mx-auto max-w-[1150px]">

                        <div className='w-full flex flex-col'>
                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">General</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">At Naija MLS Hub Corporation, we prioritize your online privacy and take care to protect
                                    any personal information you share with us. By using our services, you agree to this privacy policy,
                                    which applies exclusively to <Link target="_blank" href={`www.naijamlshub.com`}
                                        className="text-sky-600">www.naijamlshub.com</Link> and
                                    may be updated over time. If you have unresolved
                                    privacy concerns, you can contact our U.S.-based dispute resolution provider for free.
                                    We also comply with the U.S.-Swiss Safe Harbor framework, ensuring that personal data from
                                    Switzerland is handled according to established privacy principles.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">EU-U.S. Privacy Shield</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Naija MLS Hub Corporation adheres to the EU-U.S. Privacy Shield Framework, ensuring that all personal data
                                    from EU member countries is processed in accordance with Privacy Shield Principles. We comply with
                                    these principles for all onward transfers of personal data and are subject to the U.S.
                                    Federal Trade Commission's enforcement powers. In certain cases, we may disclose personal data to
                                    public authorities when required by law, including for national security or law enforcement.
                                    Users may invoke binding arbitration if other dispute resolution methods are exhausted.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Children's Privacy</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We do not knowingly collect personal information from users under 13 years old.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Information Collection and Use</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    During registration, we collect your name, email address, and account credentials to provide access to Naija MLS Hub
                                    Services. This information may be used to inform you about new services, releases, events, or policy updates.
                                    Third-party personal information you share with us, such as contacts from your Naija MLS Hub Mail account, is used
                                    solely to fulfill your service requests. We do not share this information for promotional purposes.
                                    <br /><br />
                                    When referring friends, their email and name are requested to send a one-time email, and they can contact
                                    us to have their information removed. User testimonials may include personal information, and we obtain
                                    consent before posting these. Usage details, such as login times and features accessed, are collected
                                    to improve the service.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Data Storage and Security</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We store files, documents, emails, and other account data in the U.S. Backup copies are also kept to
                                    prevent data loss. This information may remain on our servers even after account deletion for legal
                                    compliance or to resolve disputes. Your account contents are not accessible to Naija MLS Hub employees
                                    unless specified by this policy.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Payment Information</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    If services require payment, we collect payment information for processing transactions.
                                    Your financial details, except for limited credit card information, are stored in encrypted
                                    form by our Payment Gateway Service Provider.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Visitor Details</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We collect details like IP address, browser type, and operating system to analyze trends and
                                    improve the site. Cookies and other tracking technologies enhance your experience and help manage
                                    your login preferences. We also partner with third parties for advertisement management,
                                    using cookies to serve ads based on browsing activity.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Behavioral Targeting and Retargeting</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We collaborate with third parties to manage advertisements on other websites. These third
                                    parties may use cookies to gather information about your browsing behavior to serve personalized ads.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">External Links</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Our website contains external links, and we encourage users to review the privacy practices of other sites before providing personal information.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Information Sharing</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We may share your personal information with affiliates, resellers, or service providers for purposes like data storage,
                                    payment processing, and web analytics. We do not sell your information to third parties.
                                    We may also disclose user information to comply with legal requests or to protect user safety.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Security</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We employ industry-standard security measures to protect personal information from unauthorized access.
                                    Only authorized employees have access to personal information necessary to provide services.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Choice and Opt-Out</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    If we use your personal information for any purpose beyond this policy, you will be given a way to opt
                                    out. You can unsubscribe from promotional emails at any time, though you will continue receiving
                                    essential transactional emails.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Access and Updates</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Users can access and update their personal information by contacting Naija MLS Hub support. We respond to requests within 30 days.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Illegal Activity Investigations</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Naija MLS Hub may access personal information if needed for investigations into illegal activities or
                                    terms of service violations, following proper confidentiality measures.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Policy Enforcement and Changes</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We regularly review and ensure compliance with this privacy policy. Any significant policy changes will be communicated via
                                    email or service announcement, giving you the option to discontinue using our services if needed.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Public Forums and Widgets</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Personal information shared in public forums on our site may be accessed by others.
                                    Be cautious when sharing such information, as Naija MLS Hub is not responsible for unsolicited contact
                                    resulting from forum disclosures. Social media widgets on our site may collect your IP address and
                                    browsing information.
                                </div>
                            </section>

                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default PrivacyPolicyPage