import FrontendLayout from "@/layouts/frontend-layout";
import { Head } from "@inertiajs/react";

export default function PrivacyPolicy() {
    return (
        <FrontendLayout>
            <Head title="Privacy Policy " />
            <div className="max-w-7xl mx-auto w-full bg-gray-100 rounded-2xl shadow-sm border border-stone-200 px-10 py-12 m-12">
            {/* Header */}
            <div className="section mb-10 border-b border-stone-100 pb-8">
                 
                <h1 className="lg:text-4xl text-3xl font-bold text-stone-800 leading-tight font-inter">
                Privacy Policy
                </h1>
                <p className="mt-3 text-sm text-stone-400">Last updated: March 2026</p>
            </div>
            {/* Section 1 */}
            <div className="section mb-8">
                <h2 className="text-lg font-semibold text-stone-800 mb-2 font-inter">
                Information We Collect
                </h2>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed font-inter">
                We may collect the following types of information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-600 text-sm leading-relaxed pl-1 font-inter">
                <li>
                    Personal Information{" "}
                    <span className="text-stone-400">
                    (such as name, email address, phone number, shipping address)
                    </span>
                </li>
                <li>
                    Payment Information{" "}
                    <span className="text-stone-400">
                    (processed securely via third-party payment gateways)
                    </span>
                </li>
                <li>
                    Device Information{" "}
                    <span className="text-stone-400">
                    (browser type, IP address, device type)
                    </span>
                </li>
                <li>
                    Usage Data{" "}
                    <span className="text-stone-400">
                    (pages visited, time spent, clicks)
                    </span>
                </li>
                </ul>
            </div>
            {/* Divider */}
            <hr className="border-stone-100 mb-8 section" />
            {/* Section 2 */}
            <div className="section mb-8">
                <h2 className="text-lg font-semibold text-stone-800 mb-2 font-inter">
                How We Use Your Information
                </h2>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed font-inter">
                We use the collected information to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-600 text-sm leading-relaxed pl-1">
                <li>Process and deliver your orders</li>
                <li>Improve our website and user experience</li>
                <li>
                    Communicate with you{" "}
                    <span className="text-stone-400">(order updates, promotions)</span>
                </li>
                <li>Ensure website security and prevent fraud</li>
                </ul>
            </div>
            <hr className="border-stone-100 mb-8 section" />
            {/* Section 3 */}
            <div className="section mb-8">
                <h2 className="text-lg font-semibold text-stone-800 mb-2 font-inter">
                Cookies Policy
                </h2>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed font-inter">
                We use cookies to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-600 text-sm leading-relaxed pl-1 font-inter">
                <li>Store user preferences</li>
                <li>Analyze website traffic</li>
                <li>Provide a better browsing experience</li>
                <li>
                    You can disable cookies through your browser settings if you prefer.
                </li>
                </ul>
            </div>
            <hr className="border-stone-100 mb-8 section" />
            {/* Section 4 */}
            <div className="section mb-10">
                <h2 className="text-lg font-semibold text-stone-800 mb-2 font-inter">Data Security</h2>
                <p className="text-stone-500 text-sm leading-relaxed font-inter">
                We take appropriate technical and organizational measures to protect your
                personal data. However, no method of transmission over the internet is
                100% secure.
                </p>
            </div>

            </div>

        </FrontendLayout>
    );
}
