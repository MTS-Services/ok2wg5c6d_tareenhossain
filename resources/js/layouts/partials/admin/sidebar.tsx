import { Link, router, usePage } from '@inertiajs/react';
import { BarChart3, Boxes, ChevronDown, LayoutGrid, Menu, Settings, Tag, Users, X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SidebarItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    isCurrent?: (currentRoute: string) => boolean;
    subItems?: SidebarItem[];
};

const sidebarItems: SidebarItem[] = [
    {
        title: 'Overview',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/dashboard'),
    },


    {
        title: 'User Track',
        href: route('admin.users-track'),
        icon: Users,
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/users-track'),
    },
    {
        title: 'Products Management',
        subItems: [

            {
                title: 'Products',
                href: route('admin.products'),
                icon: Boxes,
                isCurrent: (currentRoute) => currentRoute.startsWith('/admin/products'),
            },
            {
                title: 'Category',
                href: route('admin.category'),
                icon: Tag,
                isCurrent: (currentRoute) => currentRoute.startsWith('/admin/category'),
            },
        ],
        href: route('admin.products'),
        icon: Boxes,
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/products'),
    },
    {
        title: 'Analytics',
        href: route('admin.analytics'),
        icon: BarChart3,
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/analytics'),
    },
    {
        title: 'Settings',
        href: route('admin.settings'),
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/settings'),
        icon: Settings,
    },
];

interface AdminSidebarProps {
    isCollapsed: boolean;
    activeSlug?: string | null;
}

export const AdminSidebar = React.memo<AdminSidebarProps>(({ isCollapsed, activeSlug }) => {
    const { url } = usePage();
    const currentRoute = url ?? '';
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({});

    const shouldUseSlugFallback = activeSlug === 'dashboard' || activeSlug === 'admin-users';
    const isCollapsedView = isCollapsed;

    const isActiveItem = (item: SidebarItem): boolean => {
        if (shouldUseSlugFallback) {
            return item.title === 'Overview' ? activeSlug === 'dashboard' : item.title === 'User Track' && activeSlug === 'admin-users';
        }

        const isSelfActive = item.isCurrent?.(currentRoute) ?? false;
        if (isSelfActive) return true;
        if (!item.subItems?.length) return false;
        return item.subItems.some((subItem) => subItem.isCurrent?.(currentRoute) ?? false);
    };

    const sidebarContent = (mobile = false) => (
        <div
            className={cn(
                'fixed left-0 top-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white shadow-sm',
                mobile ? 'w-full' : isCollapsedView ? 'w-20' : 'w-72',
                !mobile && isCollapsedView && 'items-center px-3'
            )}
        >
            <div className={cn('mb-10 flex items-center gap-3 px-2', !mobile && isCollapsedView && 'justify-center px-0')}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-200">
                    <LayoutGrid className="h-6 w-6 text-white" />
                </div>
                {(!isCollapsedView || mobile) && <span className="text-2xl font-bold tracking-tight text-gray-800">NexusFlow</span>}
            </div>

            <nav className="flex-1 space-y-2">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveItem(item);
                    const hasSubItems = (item.subItems?.length ?? 0) > 0;
                    const isOpen = openGroups[item.title] ?? isActive;

                    if (!hasSubItems || (!mobile && isCollapsedView)) {
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    'group flex items-center rounded-xl px-4 py-3 transition-all duration-200',
                                    !mobile && isCollapsedView ? 'justify-center px-2' : 'gap-4',
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                )}
                                preserveScroll
                                onClick={() => {
                                    if (mobile) {
                                        setIsMobileOpen(false);
                                    }
                                }}
                            >
                                <Icon
                                    className={cn(
                                        'h-5 w-5',
                                        isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                                    )}
                                />
                                {(!isCollapsedView || mobile) && (
                                    <span className={cn(isActive ? 'font-semibold' : 'font-medium')}>{item.title}</span>
                                )}
                            </Link>
                        );
                    }

                    return (
                        <div key={item.title} className="space-y-1">
                            <button
                                type="button"
                                className={cn(
                                    'group flex w-full items-center rounded-xl px-3 py-3 transition-all duration-200',
                                    'gap-4',
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                )}
                                onClick={() => {
                                    setOpenGroups((prev) => ({ ...prev, [item.title]: !(prev[item.title] ?? isActive) }));
                                }}
                            >
                                <Icon
                                    className={cn(
                                        'h-5 w-5',
                                        isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                                    )}
                                />
                                <span className={cn('flex-1 text-left', isActive ? 'font-semibold' : 'font-medium')}>{item.title}</span>
                                <ChevronDown
                                    className={cn('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')}
                                />
                            </button>

                            {isOpen && (
                                <div className="ml-4 space-y-1 border-l border-gray-100 pl-3">
                                    {item.subItems!.map((subItem) => {
                                        const SubIcon = subItem.icon;
                                        const subActive = isActiveItem(subItem);
                                        return (
                                            <Link
                                                key={subItem.title}
                                                href={subItem.href}
                                                className={cn(
                                                    'group flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
                                                    'gap-3',
                                                    subActive
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                )}
                                                preserveScroll
                                                onClick={() => {
                                                    if (mobile) {
                                                        setIsMobileOpen(false);
                                                    }
                                                }}
                                            >
                                                <SubIcon
                                                    className={cn(
                                                        'h-4 w-4',
                                                        subActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                                                    )}
                                                />
                                                <span className={cn(subActive ? 'font-semibold' : 'font-medium')}>{subItem.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className={cn('mt-auto border-t border-gray-100 pt-6', !mobile && isCollapsedView && 'w-full')}>
                <button
                    type="button"
                    className={cn(
                        'group flex w-full items-center px-4 py-3 text-gray-600 transition-colors hover:text-red-500',
                        !mobile && isCollapsedView ? 'justify-center px-2' : 'gap-4'
                    )}
                    onClick={() => router.post(route('admin.logout'))}
                >
                    <svg
                        className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                    >
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {(!isCollapsedView || mobile) && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                className="fixed left-4 top-4 z-40 rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm md:hidden"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open admin menu"
            >
                <Menu className="h-5 w-5" />
            </button>

            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden',
                    isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
                onClick={() => setIsMobileOpen(false)}
                aria-hidden="true"
            />

            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:hidden',
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                aria-label="Mobile admin sidebar"
            >
                <button
                    type="button"
                    className="absolute right-4 top-4 rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm"
                    onClick={() => setIsMobileOpen(false)}
                    aria-label="Close admin menu"
                >
                    <X className="h-5 w-5" />
                </button>
                {sidebarContent(true)}
            </aside>

            <aside
                className={cn(
                    'relative hidden h-screen bg-gray-50',
                    'transition-all duration-300 ease-in-out',
                    'md:flex flex-col',
                    isCollapsedView ? 'w-20' : 'w-72'
                )}
            >
                {sidebarContent()}
            </aside>
        </>
    );
});

AdminSidebar.displayName = 'AdminSidebar';
