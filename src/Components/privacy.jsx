import React from "react";

/**
 * Privacy Policy Page
 * - Drop this into: src/pages/privacy.jsx (Next.js) or any route in your SPA.
 * - Update COMPANY_NAME, CONTACT_EMAIL, POSTAL_ADDRESS, and REGION defaults below or pass as props.
 * - Not legal advice—have a lawyer review before production.
 */

const COMPANY_NAME_DEFAULT = "Chrono";
const CONTACT_EMAIL_DEFAULT = "privacy@chrono.example";
const POSTAL_ADDRESS_DEFAULT = "123 Example Ave, Suite 100, Dubai, UAE";
const REGION_DEFAULT = "United Arab Emirates";
const LAST_UPDATED_DEFAULT = "September 26, 2025";

export default function Privacy({
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
                        Privacy Policy
                    </h1>
                    <p className="mt-3 text-white/70">
                        Last updated: {lastUpdated}
                    </p>
                    <p className="mt-6 text-white/80">
                        This Privacy Policy explains how {companyName} (“we”, “us” or “our”)
                        collects, uses, discloses and safeguards your information when you visit
                        our website, use our services, or interact with us (collectively, the
                        “Services”). By using the Services, you agree to the practices described
                        here. If you do not agree, please discontinue use.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        <a href="#information-we-collect" className="underline underline-offset-4 hover:text-white">
                            Information We Collect
                        </a>
                        <a href="#how-we-use" className="underline underline-offset-4 hover:text-white">
                            How We Use Information
                        </a>
                        <a href="#cookies" className="underline underline-offset-4 hover:text-white">
                            Cookies & Tracking
                        </a>
                        <a href="#analytics-ads" className="underline underline-offset-4 hover:text-white">
                            Analytics & Ads
                        </a>
                        <a href="#payments" className="underline underline-offset-4 hover:text-white">
                            Payments
                        </a>
                        <a href="#retention" className="underline underline-offset-4 hover:text-white">
                            Data Retention
                        </a>
                        <a href="#rights" className="underline underline-offset-4 hover:text-white">
                            Your Rights
                        </a>
                        <a href="#children" className="underline underline-offset-4 hover:text-white">
                            Children’s Privacy
                        </a>
                        <a href="#security" className="underline underline-offset-4 hover:text-white">
                            Security
                        </a>
                        <a href="#sharing" className="underline underline-offset-4 hover:text-white">
                            Sharing & Transfers
                        </a>
                        <a href="#changes" className="underline underline-offset-4 hover:text-white">
                            Changes
                        </a>
                        <a href="#contact" className="underline underline-offset-4 hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-4xl py-10 space-y-12">

                    <Section id="information-we-collect" title="1) Information We Collect">
                        <p className="text-white/80">
                            We collect information that you provide directly, data we obtain automatically
                            when you use the Services, and data from third parties.
                        </p>
                        <ul className="mt-4 list-disc pl-6 text-white/70 space-y-2">
                            <li>
                                <span className="text-white/90 font-medium">Account & Contact Data:</span>{" "}
                                name, email, phone number, shipping/billing addresses, and preferences.
                            </li>
                            <li>
                                <span className="text-white/90 font-medium">Order & Transaction Data:</span>{" "}
                                items purchased, payment method metadata, delivery details, invoices.
                            </li>
                            <li>
                                <span className="text-white/90 font-medium">Device & Usage Data:</span>{" "}
                                IP address, browser type, device identifiers, pages viewed, links clicked, and
                                timestamps; approximate location inferred from IP.
                            </li>
                            <li>
                                <span className="text-white/90 font-medium">Communications:</span>{" "}
                                messages you send us (email, chat, social media) and related metadata.
                            </li>
                            <li>
                                <span className="text-white/90 font-medium">Third-Party Data:</span>{" "}
                                analytics, advertising partners, and fraud-prevention providers may supply
                                additional aggregated or inferred data.
                            </li>
                        </ul>
                    </Section>

                    <Section id="how-we-use" title="2) How We Use Information">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>Provide, operate, and improve the Services and your user experience.</li>
                            <li>Process orders, payments, deliveries, returns, and customer support.</li>
                            <li>Personalize content, recommendations, and marketing communications.</li>
                            <li>Measure performance, debug issues, and conduct analytics and research.</li>
                            <li>Detect, investigate, and prevent security incidents and fraud.</li>
                            <li>Comply with legal obligations, enforce terms, and protect our rights.</li>
                        </ul>
                        <p className="mt-4 text-white/70">
                            We process your information based on one or more legal bases, such as your consent,
                            performance of a contract, our legitimate interests, and/or compliance with law.
                        </p>
                    </Section>

                    <Section id="cookies" title="3) Cookies & Similar Technologies">
                        <p className="text-white/80">
                            We use cookies, pixels, local storage, and similar technologies to remember your
                            preferences, keep you signed in, analyze traffic, and personalize content/ads.
                        </p>
                        <p className="mt-3 text-white/70">
                            You can manage cookies via your browser settings. If you block essential cookies,
                            some features may not work. Where required by law, we will request your consent
                            for non-essential cookies via a banner or preference center.
                        </p>
                    </Section>

                    <Section id="analytics-ads" title="4) Analytics, Advertising & Social">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>
                                <span className="text-white/90 font-medium">Analytics:</span> We may use tools
                                (e.g., Google Analytics) to understand usage and improve performance.
                            </li>
                            <li>
                                <span className="text-white/90 font-medium">Advertising:</span> We may partner
                                with ad networks to show ads and measure effectiveness (including interest-based
                                advertising and retargeting). You can opt out through your ad settings or device
                                controls, where available.
                            </li>
                            <li>
                                <span className="text-white/90 font-medium">Social Features:</span> When you
                                interact with social plugins or sign-in services, those providers may collect
                                information subject to their own policies.
                            </li>
                        </ul>
                    </Section>

                    <Section id="payments" title="5) Payments">
                        <p className="text-white/80">
                            We use third-party payment processors to handle transactions. We do not store full
                            card numbers on our servers. Payment processors collect and process your payment
                            information subject to their own privacy policies and security standards (e.g., PCI DSS).
                        </p>
                    </Section>

                    <Section id="sharing" title="6) When We Share Information">
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li>With service providers who help us operate the Services (e.g., hosting, payments, logistics, support).</li>
                            <li>With analytics and advertising partners as described above.</li>
                            <li>In connection with a business transaction (e.g., merger, acquisition, asset sale).</li>
                            <li>To comply with legal process or protect rights, safety, and property.</li>
                            <li>With your consent or at your direction.</li>
                        </ul>
                    </Section>

                    <Section id="transfers" title="7) International Transfers">
                        <p className="text-white/80">
                            Your information may be processed and stored in countries other than your own,
                            including locations where data protection laws may differ. Where required, we use
                            appropriate safeguards (such as contractual clauses) to protect your information.
                        </p>
                    </Section>

                    <Section id="retention" title="8) Data Retention">
                        <p className="text-white/80">
                            We keep information for as long as necessary to fulfill the purposes described in
                            this Policy, comply with legal, tax, or accounting requirements, resolve disputes,
                            and enforce agreements. Retention periods vary depending on the data type and use.
                        </p>
                    </Section>

                    <Section id="rights" title="9) Your Privacy Rights">
                        <p className="text-white/80">
                            Depending on your location, you may have rights over your personal data, such as
                            access, correction, deletion, portability, restriction, objection, and withdrawal of
                            consent. You can exercise these rights by contacting us at{" "}
                            <a href={`mailto:${contactEmail}`} className="underline hover:text-white">
                                {contactEmail}
                            </a>.
                        </p>
                        <div className="mt-4 space-y-3 text-white/70">
                            <p className="font-medium text-white/90">EEA/UK (GDPR):</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>You have the rights listed above, subject to exceptions in the law.</li>
                                <li>You may lodge a complaint with your local supervisory authority.</li>
                            </ul>
                            <p className="mt-4 font-medium text-white/90">California (CCPA/CPRA):</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>
                                    You may request disclosure or deletion of certain data, and opt out of “sale” or
                                    “sharing” of personal information (as defined by law). We do not knowingly sell
                                    personal information of minors under 16.
                                </li>
                            </ul>
                        </div>
                    </Section>

                    <Section id="children" title="10) Children’s Privacy">
                        <p className="text-white/80">
                            The Services are not directed to children under the age of 13 (or the age required
                            by your local law). We do not knowingly collect personal information from children.
                            If you believe a child has provided us personal information, please contact us to
                            request deletion.
                        </p>
                    </Section>

                    <Section id="security" title="11) Security">
                        <p className="text-white/80">
                            We implement reasonable technical and organizational measures designed to protect
                            your information. However, no method of transmission or storage is completely
                            secure, and we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section id="links" title="12) Third-Party Links">
                        <p className="text-white/80">
                            Our Services may contain links to third-party websites or services not operated by
                            us. We are not responsible for their content or privacy practices. Review their
                            policies before providing personal information.
                        </p>
                    </Section>

                    <Section id="changes" title="13) Changes to This Policy">
                        <p className="text-white/80">
                            We may update this Privacy Policy from time to time. We will post the updated
                            version with a new “Last updated” date. In some cases, we may provide additional
                            notice (e.g., email or prominent notice on our site).
                        </p>
                    </Section>

                    <Section id="contact" title="14) Contact Us">
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
                            This policy is for general informational purposes and does not constitute legal advice.
                        </p>
                    </Section>
                </div>
            </section>
        </main>
    );
}

/* ---------- Small Section Component ---------- */
function Section({ id, title, children }) {
    return (
        <section id={id} className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}
