import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { contact, faq, home, returnMethod, shipping, shop } from '@/routes';
import { router } from '@inertiajs/react';
import { privacyPolicy } from '@/routes';
import { privacyPolicy as privacyPolicyRoute } from '@/routes';
import { shipping as shippingRoute } from '@/routes';
import { returnMethod as returnMethodRoute } from '@/routes';
import { termsService as termsServiceRoute } from '@/routes';
const socialLinks = [
    { label: 'Facebook', href: '#', Icon: Facebook },
    { label: 'Instagram', href: '#', Icon: Instagram },
    { label: 'LinkedIn', href: '#', Icon: Linkedin },
] as const;

const supportLinks = [
    { label: 'Shipping Policy', href: shipping.url() },
    { label: 'Returns Policy', href: returnMethod.url() },
    { label: 'Contact', href: contact.url() },
    { label: 'FAQ', href: faq.url() },
] as const;

export function FrontendFooter() {
    return (

        <footer className="w-full border-t border-gray-200 mt-6 container mx-auto">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Brand Column */}
                <div className="flex flex-col gap-4">
                    <div onClick={() => router.visit(home.url())} className="flex items-center gap-2">
                        <img src="/assets/images/Home/Container.png" alt="" />
                        <span className="text-sm font-bold tracking-widest text-gray-900 uppercase font-inter">
                            Nexus
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500">
                        Redefining the digital shopping experience through minimal
                        aesthetics and high-performance product curation.
                    </p>
                </div>

                {/* Shop Column */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold tracking-widest text-gray-900 uppercase font-inter">
                        Shop
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {['Electronics', 'Home Decor', 'Apparel', 'Office'].map((item) => (
                            <li key={item}>
                                <a href={shop.url()} className="text-sm text-gray-500 hover:text-gray-900">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support Column */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold tracking-widest text-gray-900 uppercase font-inter">
                        Support
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {supportLinks.map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className="text-sm text-gray-500 hover:text-gray-900">
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Column */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold tracking-widest text-gray-900 uppercase font-inter">
                        Social
                    </h4>
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ label, href, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="text-gray-900 transition-colors hover:text-gray-900"
                            >
                                <Icon className="h-5 w-5" strokeWidth={1.5} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400 text-center sm:text-left">
                        © 2026 Nexus Storefront Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a  href={privacyPolicyRoute.url()} className="text-xs text-gray-500 hover:text-gray-900">
                            Privacy Policy
                        </a>
                        <a  href={termsServiceRoute.url()} className="text-xs text-gray-500 hover:text-gray-900">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    );
}
