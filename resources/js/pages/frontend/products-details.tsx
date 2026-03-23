import { Head } from '@inertiajs/react';
import { useState } from 'react';

import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
interface SpecificationItem {
    label: string;
    value: string;
}

interface SpecGroupProps {
    title: string;
    items: SpecificationItem[];
}

export default function ProductDetails() {
    const [activeTab, setActiveTab] = useState('SPECIFICATION');

    const tabs = ['DESCRIPTION', 'ADDITIONAL INFORMATION', 'SPECIFICATION', 'REVIEW'];

    return (
        <FrontendLayout>
            <Head title="Product Details" />
            <section className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Top Section: Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="rounded-2xl overflow-hidden  aspect-square flex items-center justify-center">
                    <img
                        src="/assets/images/Rectangle 20 (6).png"
                        alt="Premium Wireless Headphones"
                        className="object-contain w-full h-full mix-blend-multiply"
                    />
                </div>

                <div className="flex flex-col justify-start pt-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-inter">Premium Wireless Headphones</h1>
                    <p className="text-gray-500 text-sm mb-4">Studio-quality sound with active noise cancellation</p>
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-xs text-gray-400 uppercase font-medium">Category:</span>
                        <span className="text-xs font-bold text-gray-900">Electronics Devices</span>
                    </div>

                    <button onClick={() => {
                            window.location.href = '/stay-connected';
                        }} className="w-full bg-blue-50 text-blue-600 font-bold py-4 rounded-xl transition-all hover:bg-blue-100">
                        Up Coming
                    </button>
                </div>
            </div>

            {/* Bottom Section: Tabs & Specs */}
            <div className="border-t border-gray-100">
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar font-inter">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "py-4 text-[10px] md:text-xs font-bold tracking-widest transition-all border-b-2 whitespace-nowrap",
                                activeTab === tab ? "border-orange-500 text-gray-900" : "border-transparent text-gray-900 hover:text-gray-600"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Specification Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 py-10">
                    {/* Column 1 */}
                    <div className="space-y-10 ">
                        <SpecGroup title="General" items={[
                            { label: 'Sales Package', value: '3D Printer Kit, Power Cable, Filament Holder, Tools, USB Cable, Manual' },
                            { label: 'Model Number', value: 'Kobra Go' },
                            { label: 'Series', value: 'Anycubic Kobra Series' },
                            { label: 'Color', value: 'Black & Orange' },
                            {label: 'Type', value: 'FDM 3D Printer'},
                            {label: 'Suitable For', value: 'Hobbyists, Students, Makers, Light Prototyping'},
                            {label: 'Power Supply', value: 'Standard AC Power'},
                            {label: 'MS Office Provided', value: 'No'}
                        ]} />

                        <SpecGroup title="Printing Features" items={[
                            { label: 'Print Technology', value: 'Fused Deposition Modeling (FDM)' },
                            { label: 'Build Volume', value: '220 x 220 x 250 mm' },
                            { label: 'Layer Resolution:', value: '0.1 – 0.4 mm'},
                            { label: 'Print Speed', value: 'Up to 100 mm/s' },
                            { label: 'Filament Diameter:', value: '1.75 mm' },
                            {label: 'Nozzle Diameter:', value: '0.4 mm (Standard)'},
                            {label: 'Leveling System:', value: 'Automatic 25-point'},
                            {label: 'Supported Filaments:', value: 'PLA, TPU, PETG, ABS'}

                        ]} />
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-10">
                        <SpecGroup title="Mechanical & Electrical Features" items={[
                            { label: 'Extruder Type', value: 'Single Bowden Extruder' },
                            { label: 'Nozzle Temp', value: 'Max 260 °C' },
                            { label: 'Frame Material', value: 'Metal' },
                        ]} />

                        <SpecGroup title="Additional Features" items={[
                            { label: 'Power Recovery:', value: '✅ Resume print after power loss' },
                            { label: 'Filament Run-out Detection:', value: '❌' },
                            { label: 'Fast Assembly:', value: 'Modular design — can be set up in 20 minutes' },
                            { label: 'Maintenance::', value: 'Easy nozzle replacement & bed leveling' },
                        ]} />

                        <SpecGroup title="Warranty" items={[
                            { label: 'Warranty Summary', value: '1 Year Limited Warranty' },
                            { label: 'Warranty Service Type', value: 'Carry-in / Manufacturer' },
                            { label: 'Domestic Warranty', value: '1 Year' },
                            { label: 'Not Covered in Warranty', value: '1 Year' },
                            { label: 'Domestic Warranty', value: '1 Year' },
                        ]} />
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-10">
                        <SpecGroup title="Display & Control" items={[
                            { label: 'Display Type:', value: 'LCD Screen with Knob Control' },
                            { label: 'Touchscreen:', value: 'No' },
                            { label: 'Control Method:', value: 'SD Card / USB Cable' },
                            { label: 'Supported File Types::', value: 'STL, OBJ, AMF' },
                            { label: 'Slicing Software::', value: 'Cura, PrusaSlicer, Anycubic Slicer' },
                        ]} />

                        <SpecGroup title="Connectivity Features" items={[
                            { label: 'USB:', value: 'Yes (USB Cable)' },
                            { label: 'SD Card:', value: 'Yes' },
                            { label: 'Wi-Fi:', value: '❌ (Not available in this model)' },
                            { label: 'Bluetooth:', value: '❌' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
            </FrontendLayout>

    );
}

function SpecGroup({ title, items }: SpecGroupProps) {
    return (
        <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2">{title}</h3>
            <div className="space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4 text-[11px] md:text-xs">
                        <span className="text-gray-900 font-medium font-inter">{item.label}</span>
                        <span className="text-gray-700 font-inter">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
