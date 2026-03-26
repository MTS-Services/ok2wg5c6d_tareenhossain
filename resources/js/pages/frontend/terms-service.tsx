import FrontendLayout from "@/layouts/frontend-layout";
import { Head } from "@inertiajs/react";

export default function PrivacyPolicy() {
    return (
        <FrontendLayout>
            <Head title="Privacy Policy" />
            <div className="max-w-7xl mx-auto w-full bg-gray-100 rounded-2xl shadow-sm border border-stone-200 px-10 py-12 m-12 ">
            {/* Header */}
            <div className="section mb-10 border-b border-stone-100 pb-8">

                <h1 className="lg:text-4xl text-3xl font-bold text-stone-800 leading-tight font-inter">
                Terms of Service
                </h1>
                <p className="mt-3 text-sm text-stone-400">Last updated: March 2026</p>
            </div>
            {/* Section 1 */}
            <div className="section mb-8">
                <h2 className="text-lg font-semibold text-stone-800 mb-2 font-inter">
                Non-Refundable Policy
                </h2>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed font-inter">
                All bookings are non-refundable once payment is processed. By proceeding with this booking, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-600 text-sm leading-relaxed pl-1 font-inter">
                <li>
                No refunds will be issued for cancellations, changes, or no-shows
                </li>
                <li>
                Refunds are only available if the provider cancels the trip
                </li>
                <li>
                Travel insurance is strongly recommended
                </li>
                <li>
                You are responsible for obtaining necessary travel documents
                </li>

                <li>
                You must comply with all health and safety requirements
                </li>
                </ul>
            </div>
            {/* Divider */}
            <hr className="border-stone-100 mb-8 section" />
            {/* Section 2 */}
            <div className="section mb-8">
                <h2 className="text-lg font-semibold text-stone-800 mb-2 font-inter">
                Payment Terms
                </h2>

                <ul className="list-disc list-inside space-y-2 text-stone-600 text-sm leading-relaxed pl-1">
                <li>Full payment is required at time of booking</li>
                <li>All prices are in USD</li>
                <li>
                Taxes and fees are included in the total price
                </li>

                </ul>
            </div>



            {/* Section 4 */}
            <div className="section mb-10">
                <h2 className="text-lg font-semibold text-stone-800 mb-2 font-inter">Waiver Requirement</h2>
                <p className="text-stone-500 text-sm leading-relaxed font-inter">
                After payment, you will be required to sign a digital waiver for injury and property damage. Your booking will remain in "Pending" status until the waiver is completed and approved.
                </p>
            </div>

            </div>

        </FrontendLayout>
    );
}
