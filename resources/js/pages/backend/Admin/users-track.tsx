import { Head } from '@inertiajs/react';
import { useState } from 'react';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

type TimelineEvent = {
    time: string;
    title: string;
    subtitle?: string;
    marker: 'start' | 'middle' | 'end';
};

type SessionRow = {
    visitorId: string;
    location: string;
    device: string;
    pageVisited: string;
    productClicked: string;
    duration: string;
    visitTimeLabel: string;
    visitTimeShort: string;
    timeline: TimelineEvent[];
};

const markerRing: Record<TimelineEvent['marker'], string> = {
    start: 'border-blue-600',
    middle: 'border-gray-400',
    end: 'border-gray-800',
};

const sessions: SessionRow[] = [
    {
        visitorId: 'VIS-001',
        location: 'USA',
        device: 'Desktop',
        pageVisited: '/products',
        productClicked: 'Echo Dot (5th Gen)',
        duration: '5m 24s',
        visitTimeLabel: '2024-03-12 10:30',
        visitTimeShort: '10:30',
        timeline: [
            {
                time: '10:30:00 AM',
                title: 'Entered Website',
                subtitle: 'Landing page/home',
                marker: 'start',
            },
            {
                time: '10:32:15 AM',
                title: 'Visited Products Page',
                subtitle: 'Viewed 12 items',
                marker: 'middle',
            },
            {
                time: '10:34:45 AM',
                title: 'Session Ended',
                marker: 'end',
            },
        ],
    },
   
];

function SessionDetailsSheet({
    session,
    open,
    onOpenChange,
}: {
    session: SessionRow | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    if (!session) {
        return null;
    }

    const initial = session.visitorId.charAt(0).toUpperCase() || 'V';

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                showCloseButton={false}
                className="w-full gap-0 overflow-y-auto border-l border-gray-200 bg-white p-0 font-inter sm:max-w-md"
            >
                <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-100 px-6 py-5 text-left">
                    <SheetTitle className="text-lg font-bold text-gray-900">Session Details</SheetTitle>
                    <SheetDescription className="sr-only">
                        Visitor session summary and timeline for {session.visitorId}
                    </SheetDescription>
                    <SheetClose className="rounded-md p-1.5 text-gray-400 outline-none ring-offset-white transition-colors hover:bg-gray-100 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500/30">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="sr-only">Close panel</span>
                    </SheetClose>
                </SheetHeader>

                <div className="space-y-8 px-6 py-6">
                    <div className="rounded-xl bg-gray-50 p-5">
                        <div className="flex items-start gap-4">
                            <div
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white"
                                aria-hidden
                            >
                                {initial}
                            </div>
                            <div className="min-w-0 flex-1 pt-0.5">
                                <p className="text-base font-bold text-gray-900">{session.visitorId}</p>
                                <p className="text-sm text-gray-500">
                                    {session.location}, {session.device}
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-200/80 pt-5">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Duration</p>
                                <p className="mt-1 text-base font-bold text-gray-900">{session.duration}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Visit time</p>
                                <p className="mt-1 text-base font-bold text-gray-900">{session.visitTimeShort}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-5 flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            <h2 className="text-base font-bold text-gray-900">Session Timeline</h2>
                        </div>

                        <div className="relative pl-1">
                            <div
                                className="absolute top-4 bottom-4 left-4 w-px bg-gray-200"
                                aria-hidden
                            />
                            <ul className="relative space-y-0">
                                {session.timeline.map((event, index) => (
                                    <li key={index} className="relative flex gap-4 pb-8 last:pb-0">
                                        <div className="relative z-10 flex w-8 shrink-0 justify-center pt-1">
                                            <span
                                                className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 bg-white ${markerRing[event.marker]}`}
                                                aria-hidden
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-0.5 pt-0.5">
                                            <p className="text-xs text-gray-400">{event.time}</p>
                                            <p className="text-sm font-bold text-gray-900">{event.title}</p>
                                            {event.subtitle ? (
                                                <p className="text-xs text-gray-500">{event.subtitle}</p>
                                            ) : null}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default function UsersTrack() {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<SessionRow | null>(null);

    function openSessionDetails(row: SessionRow) {
        setSelectedSession(row);
        setDetailsOpen(true);
    }

    return (
        <>
            <Head title="Users Track" />

            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="users-track" />

                <div className="container bg-white p-8 font-inter text-gray-900">
                    <header className="mb-8">
                        <h1 className="font-inter text-3xl font-bold tracking-tight text-gray-900">User Tracking</h1>
                    </header>
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-white p-4">
                            <div className="relative w-full max-w-sm">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search by Visitor ID or Country..."
                                    className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-3 pl-10 text-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <select className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300">
                                    <option>All Devices</option>
                                    <option>Desktop</option>
                                    <option>Mobile</option>
                                </select>
                                <select className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300">
                                    <option>Last 24 Hours</option>
                                    <option>Last 7 Days</option>
                                    <option>Last Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Visitor ID</th>
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4">Device</th>
                                        <th className="px-6 py-4">Page Visited</th>
                                        <th className="px-6 py-4">Product Clicked</th>
                                        <th className="px-6 py-4">Duration</th>
                                        <th className="px-6 py-4">Visit Time</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {sessions.map((row, index) => (
                                        <tr
                                            key={`${row.visitorId}-${index}`}
                                            className="group transition-colors hover:bg-slate-50/80"
                                        >
                                            <td className="cursor-pointer px-6 py-4 text-sm font-semibold text-blue-600 hover:underline">
                                                {row.visitorId}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{row.location}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{row.device}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 italic">{row.pageVisited}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{row.productClicked}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{row.duration}</td>
                                            <td className="px-6 py-4 text-sm text-gray-400">{row.visitTimeLabel}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => openSessionDetails(row)}
                                                    className="text-gray-400 transition-colors group-hover:text-blue-600"
                                                    aria-label={`Open session details for ${row.visitorId}`}
                                                >
                                                    <svg
                                                        className="mx-auto h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
                            <p className="text-sm font-medium text-emerald-600">Showing 1 to 7 of 7 results</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SessionDetailsSheet session={selectedSession} open={detailsOpen} onOpenChange={setDetailsOpen} />
        </>
    );
}
