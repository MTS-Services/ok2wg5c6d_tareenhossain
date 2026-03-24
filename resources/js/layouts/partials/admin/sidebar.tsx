import { Link, router, usePage } from '@inertiajs/react';
import { BarChart3, Boxes, LayoutGrid, Settings, Users } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SidebarItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    isCurrent?: (currentRoute: string) => boolean;
};

const sidebarItems: SidebarItem[] = [
    {
        title: 'Overview',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/dashboard'),
    },

    {
        title: 'Products',
        href: route('admin.products'),
        icon: Boxes,
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/products'),
    },

    {
        title: 'User Track',
        href: route('admin.users-track'),
        icon: Users,
        isCurrent: (currentRoute) => currentRoute.startsWith('/admin/users-track'),
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

    const shouldUseSlugFallback = activeSlug === 'dashboard' || activeSlug === 'admin-users';
    const isCollapsedView = isCollapsed;

    const isActiveItem = (item: SidebarItem): boolean => {
        if (shouldUseSlugFallback) {
            return item.title === 'Overview' ? activeSlug === 'dashboard' : item.title === 'User Track' && activeSlug === 'admin-users';
        }

        return item.isCurrent?.(currentRoute) ?? false;
    };

    return (
        <aside
            className={cn(
                'relative hidden h-screen bg-gray-50',
                'transition-all duration-300 ease-in-out',
                'md:flex flex-col',
                isCollapsedView ? 'w-20' : 'w-72'
            )}
        >
            <div
                className={cn(
                    'flex h-full flex-col border-r border-gray-200 bg-white p-6 shadow-sm',
                    isCollapsedView && 'items-center px-3'
                )}
            >
                <div className={cn('mb-10 flex items-center gap-3 px-2', isCollapsedView && 'justify-center px-0')}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-200">
                        <LayoutGrid className="h-6 w-6 text-white" />
                    </div>
                    {!isCollapsedView && <span className="text-2xl font-bold tracking-tight text-gray-800">NexusFlow</span>}
                </div>

                <nav className="flex-1 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveItem(item);

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    'group flex items-center rounded-xl px-4 py-3 transition-all duration-200',
                                    isCollapsedView ? 'justify-center px-2' : 'gap-4',
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                )}
                                preserveScroll
                            >
                                <Icon
                                    className={cn(
                                        'h-5 w-5',
                                        isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                                    )}
                                />
                                {!isCollapsedView && (
                                    <span className={cn(isActive ? 'font-semibold' : 'font-medium')}>{item.title}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className={cn('mt-auto border-t border-gray-100 pt-6', isCollapsedView && 'w-full')}>
                    <button
                        type="button"
                        className={cn(
                            'group flex w-full items-center px-4 py-3 text-gray-600 transition-colors hover:text-red-500',
                            isCollapsedView ? 'justify-center px-2' : 'gap-4'
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
                        {!isCollapsedView && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
});

AdminSidebar.displayName = 'AdminSidebar';
