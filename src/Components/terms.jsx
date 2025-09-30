import React from "react";


const COMPANY_NAME_DEFAULT = "Chrono";
const CONTACT_EMAIL_DEFAULT = "support@chrono.example";
const POSTAL_ADDRESS_DEFAULT = "123 Example Ave, Suite 100, Dubai, UAE";
const REGION_DEFAULT = "United Arab Emirates";
const LAST_UPDATED_DEFAULT = "September 26, 2025";

export default function Terms({
    companyName = COMPANY_NAME_DEFAULT,
    contactEmail = CONTACT_EMAIL_DEFAULT,
    postalAddress = POSTAL_ADDRESS_DEFAULT,
    region = REGION_DEFAULT,
    lastUpdated = LAST_UPDATED_DEFAULT,
}) {
    return (
        <main className="bg-black text-white min-h-screen">
            {/* Header */}
            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-4xl py-14 border-b border-white/10">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="mt-3 text-white/70">Last updated: {lastUpdated}</p>
                    <p className="mt-6 text-white/80">
                        These Terms of Service (“<strong>Terms</strong>”) govern your access to and use of the websites,
                        products, and services provided by {companyName} (“<strong>we</strong>,” “<strong>us</strong>,” or “<strong>our</strong>”). By accessing or
                        using any part of our services (collectively, the “<strong>Services</strong>”), you agree to be bound by
                        these Terms. If you do not agree, do not use the Services.
                    </p>

                    {/* Quick Nav */}
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        <Anchor href="#eligibility">Eligibility</Anchor>
                        <Anchor href="#accounts">Accounts</Anchor>
                        <Anchor href="#orders">Orders & Pricing</Anchor>
                        <Anchor href="#shipping">Shipping & Delivery</Anchor>
                        <Anchor href="#returns">Returns & Refunds</Anchor>
                        <Anchor href="#product">Product Info</Anchor>
                        <Anchor href="#license">License & IP</Anchor>
                        <Anchor href="#user-content">User Content</Anchor>
                        <Anchor href="#prohibited">Prohibited Uses</Anchor>
                        <Anchor href="#third-party">Third-Party Services</Anchor>
                        <Anchor href="#warranty">Disclaimers</Anchor>
                        <Anchor href="#liability">Limitation of Liability</Anchor>
                        <Anchor href="#indemnity">Indemnification</Anchor>
                        <Anchor href="#law-disputes">Governing Law & Disputes</Anchor>
                        <Anchor href="#changes">Changes</Anchor>
                        <Anchor href="#termination">Termination</Anchor>
                        <Anchor href="#misc">Miscellaneous</Anchor>
                        <Anchor href="#contact">Contact</Anchor>
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-4xl py-10 space-y-12">

                    <Section id="eligibility" title="1) Eligibility">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Services.</li>
                            <li>By using the Services, you represent that you have the legal capacity and authority to enter into these Terms.</li>
                        </ul>
                    </Section>

                    <Section id="accounts" title="2) Accounts & Security">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>You may need an account to access certain features. You are responsible for keeping your login credentials confidential and for all activities under your account.</li>
                            <li>Notify us immediately of any unauthorized access or suspected breach by emailing{" "}
                                <a href={`mailto:${contactEmail}`} className="underline hover:text-white">{contactEmail}</a>.
                            </li>
                            <li>We may suspend or terminate accounts that violate these Terms or present security risks.</li>
                        </ul>
                    </Section>

                    <Section id="orders" title="3) Orders, Pricing & Payments">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>All orders are offers to purchase and are subject to our acceptance. We may refuse or cancel any order (e.g., suspected fraud, stock issues, pricing errors).</li>
                            <li>Prices, promotions, and availability are subject to change without notice. Taxes, duties, and shipping charges may apply based on your location.</li>
                            <li>We use third-party payment processors; by submitting a payment, you authorize the processor to charge your selected payment method.</li>
                            <li>If a pricing error occurs, we may contact you for instructions before cancellation or cancel the order and notify you.</li>
                        </ul>
                    </Section>

                    <Section id="shipping" title="4) Shipping & Delivery">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>Estimated shipping times are provided for convenience and are not guaranteed. Risk of loss passes to you upon delivery to the carrier unless otherwise required by law.</li>
                            <li>International shipments may be subject to customs, import duties, and fees, which are your responsibility.</li>
                        </ul>
                    </Section>

                    <Section id="returns" title="5) Returns, Exchanges & Refunds">
                        <p className="text-white/80">
                            Our returns policy is set out on our website. Where permitted by law, items must be returned in their original condition with proof of purchase.
                            Refunds (if applicable) are issued to the original payment method. Certain items (e.g., customized goods) may be final sale.
                        </p>
                        <p className="mt-3 text-white/70">
                            To start a return, contact{" "}
                            <a href={`mailto:${contactEmail}`} className="underline hover:text-white">{contactEmail}</a>.
                        </p>
                    </Section>

                    <Section id="product" title="6) Product Information & Availability">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>We make reasonable efforts to display accurate colors, specifications, and images. Actual colors may vary by device.</li>
                            <li>We do not guarantee that all items shown will be available. We reserve the right to discontinue products at any time.</li>
                        </ul>
                    </Section>

                    <Section id="license" title="7) License & Intellectual Property">
                        <p className="text-white/80">
                            We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for personal, non-commercial use.
                            All content on the Services—including text, graphics, logos, images, product names, and software—is owned by {companyName} or our licensors and is protected by applicable laws.
                            No rights are granted except as expressly set out in these Terms.
                        </p>
                    </Section>

                    <Section id="user-content" title="8) User Content & Feedback">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>If you submit reviews, images, comments, or other materials (“<strong>User Content</strong>”), you grant {companyName} a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, publish, translate, distribute, display, and create derivative works from such content in connection with the Services and our business.</li>
                            <li>You represent that you own or have the necessary rights to your User Content and that it does not infringe the rights of any third party or violate any law.</li>
                        </ul>
                    </Section>

                    <Section id="prohibited" title="9) Prohibited Uses">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>Violating any applicable law or regulation.</li>
                            <li>Infringing the intellectual property or privacy rights of others.</li>
                            <li>Attempting to gain unauthorized access to the Services or interfering with their operation.</li>
                            <li>Uploading malicious code or engaging in scraping, crawling, or rate-limiting evasion.</li>
                            <li>Using the Services for unlawful, harmful, or fraudulent activities.</li>
                        </ul>
                    </Section>

                    <Section id="third-party" title="10) Third-Party Services & Links">
                        <p className="text-white/80">
                            The Services may include integrations or links to third-party websites and services that we do not control.
                            Your use of those services is subject to their terms and privacy policies. We are not responsible for their content or practices.
                        </p>
                    </Section>

                    <Section id="warranty" title="11) Disclaimers of Warranties">
                        <p className="text-white/80">
                            To the fullest extent permitted by law, the Services and all content are provided “as is” and “as available”
                            without warranties of any kind, whether express, implied, or statutory, including implied warranties of
                            merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that the
                            Services will be uninterrupted, error-free, secure, or free of viruses.
                        </p>
                    </Section>

                    <Section id="liability" title="12) Limitation of Liability">
                        <p className="text-white/80">
                            To the maximum extent permitted by law, in no event shall {companyName} or our affiliates, directors, employees,
                            or agents be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of
                            profits, revenues, data, or goodwill, arising out of or related to your use of the Services, even if advised of
                            the possibility of such damages. Our total liability for any claim shall not exceed the greater of (a) the amount
                            you paid to us for the product or service at issue during the twelve (12) months preceding the claim, or (b) USD 100.
                            Some jurisdictions do not allow certain limitations; in such cases, those limitations may not apply to you.
                        </p>
                    </Section>

                    <Section id="indemnity" title="13) Indemnification">
                        <p className="text-white/80">
                            You agree to defend, indemnify, and hold harmless {companyName} and our affiliates, officers, directors, employees,
                            and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’
                            fees) arising out of or in any way connected with your violation of these Terms or your misuse of the Services.
                        </p>
                    </Section>

                    <Section id="law-disputes" title="14) Governing Law & Dispute Resolution">
                        <p className="text-white/80">
                            These Terms are governed by the laws of the {region}, without regard to conflict-of-laws principles.
                            Any dispute arising out of or relating to these Terms or the Services will be resolved as follows:
                        </p>
                        <ul className="list-disc pl-6 text-white/70 space-y-2 mt-3">
                            <li><span className="text-white/90 font-medium">Informal Resolution:</span> Contact us first at{" "}
                                <a href={`mailto:${contactEmail}`} className="underline hover:text-white">{contactEmail}</a> so we can try to resolve the issue.</li>
                            <li><span className="text-white/90 font-medium">Arbitration / Courts:</span> If not resolved, disputes shall be submitted to the competent courts of {region}.
                                If you reside in a jurisdiction that enforces mandatory arbitration or consumer mediation, those rules may apply instead.</li>
                            <li><span className="text-white/90 font-medium">Injunctive Relief:</span> Either party may seek injunctive or equitable relief for infringement or misuse of intellectual property or confidential information.</li>
                        </ul>
                    </Section>

                    <Section id="changes" title="15) Changes to the Services or Terms">
                        <p className="text-white/80">
                            We may update these Terms from time to time. The updated version will be indicated by a new “Last updated” date.
                            If changes are material, we may provide additional notice (e.g., by email or a notice on the website). Your continued
                            use of the Services after the effective date constitutes acceptance of the revised Terms.
                        </p>
                    </Section>

                    <Section id="termination" title="16) Suspension & Termination">
                        <p className="text-white/80">
                            We may suspend or terminate your access to the Services at any time, with or without cause or notice, including if we
                            believe you violated these Terms. Upon termination, your right to use the Services will cease immediately. Sections
                            that by their nature should survive (e.g., ownership, disclaimers, limitations of liability) will survive termination.
                        </p>
                    </Section>

                    <Section id="misc" title="17) Miscellaneous">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li><span className="text-white/90 font-medium">Entire Agreement:</span> These Terms, together with any policies referenced (e.g., our Privacy Policy), constitute the entire agreement between you and {companyName} regarding the Services.</li>
                            <li><span className="text-white/90 font-medium">Severability:</span> If any provision is found unenforceable, the remaining provisions will remain in full force and effect.</li>
                            <li><span className="text-white/90 font-medium">No Waiver:</span> Our failure to enforce any right or provision is not a waiver of such right or provision.</li>
                            <li><span className="text-white/90 font-medium">Assignment:</span> You may not assign these Terms without our prior written consent. We may assign them in connection with a merger, acquisition, or sale of assets.</li>
                            <li><span className="text-white/90 font-medium">Force Majeure:</span> We will not be liable for any delay or failure caused by events beyond our reasonable control, including acts of God, labor disputes, or network failures.</li>
                            <li><span className="text-white/90 font-medium">Contact Preference:</span> We may contact you using the information you provide, including email, to send notices and updates.</li>
                        </ul>
                    </Section>

                    <Section id="contact" title="18) Contact Us">
                        <address className="not-italic text-white/80">
                            {companyName} <br />
                            {postalAddress} <br />
                            {region} <br />
                            Email:{" "}
                            <a href={`mailto:${contactEmail}`} className="underline hover:text-white">
                                {contactEmail}
                            </a>
                        </address>
                        <p className="mt-4 text-xs text-white/50">
                            This document is a general template and does not constitute legal advice.
                        </p>
                    </Section>
                </div>
            </section>
        </main>
    );
}

/* ---------- Small Components ---------- */
function Anchor({ href, children }) {
    return (
        <a href={href} className="underline underline-offset-4 hover:text-white">
            {children}
        </a>
    );
}

function Section({ id, title, children }) {
    return (
        <section id={id} className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}
