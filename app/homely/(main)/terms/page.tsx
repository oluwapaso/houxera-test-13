"use client"

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hidePageLoader } from '../../../GlobalRedux/app/appSlice'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const TermsPage = () => {

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
                            <div className="font-semibold text-4xl">Terms of Service</div>
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
                                <h2 className="font-bold text-2xl text-gray-800">AGREEMENT TO TERMS</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    By using our Services, you agree to be bound by these Terms. If you do not agree to these Terms,
                                    you must not use the Services. If you are accessing the Services on behalf of a company or other
                                    legal entity, you represent that you have the authority to bind that entity to these Terms. In such cases,
                                    "you" and "your" will refer to that entity.
                                    <br /><br />
                                    THIS AGREEMENT IS BETWEEN YOU OR THE ENTITY YOU REPRESENT (REFERRED TO AS “YOU” OR “YOUR”) AND Naija MLS Hub
                                    CORPORATION (Naija MLS Hub), WHICH GOVERNS YOUR USE OF Naija MLS Hub'S ONLINE BUSINESS PRODUCTIVITY AND
                                    COLLABORATION SOFTWARE SUITE.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Sections of this Agreement</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    This Agreement includes the following terms and conditions (the “General Terms”) along with any
                                    additional terms specific to the use of individual services (the “Service Specific Terms”).
                                    Collectively, these are referred to as the “Terms.” In the case of any conflict between the General
                                    Terms and Service Specific Terms, the Service Specific Terms will take precedence.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Acceptance of the Terms</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    o accept the Terms, you must be of legal age to form a binding contract. If you do not agree to the
                                    General Terms, you should not use any of our Services. If you accept the General Terms but not the
                                    Service Specific Terms, you should avoid using the specific service in question. Acceptance of the
                                    Terms can occur by checking a box, clicking a button, or using the Services.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Service Description</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We offer a variety of online collaboration and management services, including word processors,
                                    spreadsheets, presentation tools, database creators, email clients, chat clients, organizers,
                                    CRM applications, and project management tools (collectively, the “Services”).
                                    These can be used for personal or business purposes. You may access the Services through any
                                    supported internet browser, and it’s your responsibility to maintain your internet connection and
                                    equipment. You can create, edit, publish, and share content using your user account.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Subscription to Beta Services</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We may provide certain Services as closed or open beta versions (referred to as “Beta Services”) for
                                    testing purposes. We reserve the right to decide the testing period for Beta Services and will judge
                                    the success of such tests. You are not obligated to subscribe to paid services as a result of
                                    participating in Beta Services. We can modify, suspend, or discontinue Beta Services at any time and
                                    are not liable for any harm related to these changes.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Modification of Terms of Service</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    We may update the Terms at any time by notifying you via a service announcement or an email to your
                                    primary address. For major changes that affect your rights, you will receive at least 30 days' notice.
                                    If the changes significantly impact your use of the Services, you may terminate your use by
                                    notifying us within 30 days of receiving the revised Terms. In this case, you are eligible for a
                                    prorated refund for any unused prepaid fees. Continued use of the Service after the effective date
                                    of changes implies your acceptance of the modified Terms.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">User Signup Obligations</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    To access or use the Services, you must sign up for a user account by providing accurate and up-to-date
                                    information. If using the Services for organizational purposes, we recommend signing up with your
                                    corporate contact details, including a corporate email. You agree to provide true and current
                                    information during signup and update it as necessary. If inaccurate or outdated information is
                                    provided, Naija MLS Hub reserves the right to terminate your account and deny future use of the Services.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Organization Accounts and Administrators</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    When creating an organizational account, you may designate administrators who can configure the
                                    Services and manage users. If a third party creates the account on your behalf, they may assume the
                                    administrator role. You are responsible for safeguarding your account credentials, appointing capable
                                    administrators, and ensuring compliance with this Agreement. You may provide a recovery process for
                                    administrator account control if needed. Naija MLS Hub may, in good faith, take action regarding account
                                    control and will not be held liable for these actions.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Personal Information and Privacy</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Personal data provided to Naija MLS Hub through the Service is governed by our Privacy Policy. By using the Service, you
                                    agree to the terms of the Privacy Policy. You are responsible for maintaining the confidentiality of your account
                                    information and must notify us immediately of unauthorized access to your account. Naija MLS Hub is not liable for any
                                    loss or damage resulting from unauthorized access or misuse of your account.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Communications from Naija MLS Hub</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Certain communications, such as service announcements and administrative messages, are part of the Services and
                                    cannot be opted out of. However, you may opt out of receiving newsletters.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Complaints</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    If Naija MLS Hub receives a complaint regarding your use of the Services, we will forward it to your primary email address.
                                    You must respond directly to the complainant within 10 days, copying Naija MLS Hub on the correspondence.
                                    Failure to respond within the given time frame may result in the disclosure of your contact details to the complainant,
                                    allowing them to pursue legal action.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Fees and Payments</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Our Services are available through various subscription plans. For subscriptions shorter than one year,
                                    payments must be made via credit card. Subscriptions automatically renew unless you choose to
                                    downgrade to a free plan or notify us of your intent to cancel. You can update payment details if
                                    necessary. We reserve the right to adjust pricing and introduce charges for free services,
                                    with changes applying only after the current billing cycle ends.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Usage Restrictions</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    You agree not to:<br />
                                    (i) Transfer the Services to third parties,<br />
                                    (ii) Provide services based on our Services without permission,<br />
                                    (iii) Use third-party links without agreeing to their terms,<br />
                                    (iv) Share third-party logos without permission,<br />
                                    (v) Publish personal or confidential information without consent,<br />
                                    (vi) Use the Services in a way that harms Naija MLS Hub’s infrastructure,<br />
                                    (vii) Violate applicable laws, or<br />
                                    (viii) Create a false identity for misleading communications.<br />
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Spamming and Illegal Activities</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    You are responsible for the content you transmit through the Services and agree not to use the
                                    Services for unlawful activities, including spam, chain letters, or phishing. We may terminate your
                                    access if there is evidence of illegal or unauthorized activity.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Inactive User Accounts</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Naija MLS Hub reserves the right to terminate unpaid accounts inactive for 120 days. We will provide notice prior to termination,
                                    allowing you to back up your data.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Data Ownership</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    You retain ownership of content created or stored using the Services. Unless you give permission,
                                    Naija MLS Hub will not use your content for commercial purposes.
                                    However, you grant Naija MLS Hub permission to access and manage your content as needed to provide the Services.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">User-Generated Content</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    You are responsible for content you create and publish using the Services. Public content may be
                                    indexed by search engines. You must ensure no accidental disclosure of private content.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Sample Files and Applications</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Naija MLS Hub may offer sample files or applications, but we make no guarantees regarding their accuracy or usefulness.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Trademark</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    Naija MLS Hub and its logos are trademarks of Naija MLS Hub Corporation. You agree not to use Naija MLS Hub trademarks without prior permission.
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">Third-Party Integrations</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    <div className="w-full">
                                        By using the services provided by Naija MLS Hub, you acknowledge and agree that certain
                                        features or functionalities may be provided by third-party integrations, including but not limited
                                        to Stripe, Central Dispatch, Twilio, and SendGrid.
                                    </div>
                                    <ul className="w-full list-disc pl-10 mt-4 space-y-5">
                                        <li><strong>Acknowledgement of Third-Party Services:</strong> You understand and agree that the use of these
                                            third-party services is governed solely by their respective terms and conditions.
                                            We strongly recommend that you review their individual terms and privacy policies
                                            before using them, as their operations are outside of our control.</li>

                                        <li><strong>No Liability:</strong> Naija MLS Hub  is not liable or responsible for any actions,
                                            errors, omissions, or damages caused by third-party services. You assume all risks associated
                                            with using these third-party integrations, including but not limited to payment processing,
                                            communications, dispatching, and email delivery.</li>

                                        <li><strong>Disclaimers:</strong> We do not guarantee the availability, performance, or
                                            results from third-party services and are not responsible for any disruptions, outages, or
                                            data breaches related to these integrations.</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">API Usage</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    <div className="w-full">
                                        By using the Naija MLS Hub API, you agree to the following terms:
                                    </div>
                                    <ul className="w-full list-disc pl-10 mt-4 space-y-5">
                                        <li><strong>Proper Use:</strong> You agree to use our API in a lawful manner, consistent with our
                                            Acceptable Use Policy and any applicable local, state, and federal regulations.</li>
                                        <li><strong>Rate Limits and Fair Use:</strong> We reserve the right to set rate limits or
                                            throttle API usage if we determine that the usage is abusive or detrimental to our system’s
                                            performance. Abuse of the API, including but not limited to excessive requests, scraping, or
                                            attempting to bypass security features, will result in termination of access.</li>
                                        <li><strong>No Warranty:</strong>  Our API is provided on an "as-is" basis. We do not guarantee
                                            uptime, availability, or data accuracy. We will not be responsible for any damages or losses
                                            resulting from the use of our API.</li>
                                        <li><strong>Data Protection:</strong> You are responsible for ensuring that any data collected or
                                            transmitted using our API complies with applicable data protection laws and regulations, including
                                            but not limited to user consent for personal data collection.</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="w-full my-4 flex flex-col">
                                <h2 className="font-bold text-2xl text-gray-800">END OF TERMS OF SERVICE</h2>
                                <div className="mt-1 text-xl tracking-wide text-gray-700">
                                    <div className="w-full">
                                        If you have any questions or concerns regarding this Agreement, please contact us
                                        at <Link target="_blank" href={`mailto:support@naijamlshub.com`}
                                            className="text-sky-600">support@naijamlshub.com</Link>
                                    </div>
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

export default TermsPage