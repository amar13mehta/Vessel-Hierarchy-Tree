'use client';

import React from 'react';
import {
    LayoutDashboard,
    CalendarDays,
    Box,
    Clock,
    Droplet,
    Library,
    CalendarRange,
    Users,
    FileText,
    Ship,
    Settings,
    ChevronDown,
    ChevronsUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type MenuItem = {
    label: string;
    icon: React.ElementType;
    active?: boolean;
    hasSubmenu?: boolean;
};

const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Planned Maintenance', icon: CalendarDays, hasSubmenu: true },
    { label: 'Spares Inventory', icon: Box, hasSubmenu: true },
    { label: 'Machinery Running Hrs', icon: Clock, hasSubmenu: true },
    { label: 'Lube Oil Summary', icon: Droplet, hasSubmenu: true },
    { label: 'Library', icon: Library, hasSubmenu: true },
    { label: 'PMS Calender', icon: CalendarRange },
    { label: 'User Management Roles', icon: Users, hasSubmenu: true },
    { label: 'Reports', icon: FileText, hasSubmenu: true },
    { label: 'Fleet Management', icon: Ship, active: true },
    { label: 'Settings', icon: Settings, hasSubmenu: true },
];

export const Sidebar = () => {
    return (
        <aside className="w-64 bg-white h-screen flex flex-col shrink-0">
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-blue-500">3S</span>
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-gray-800 text-lg">SMART SHIP</span>
                        <span className="font-medium text-gray-600 text-sm">SOLUTIONS</span>
                    </div>
                </div>
            </div>

            <ScrollArea className="flex-1 px-3">
                <nav className="py-4 space-y-1">
                    {menuItems.map((item) => (
                        <div
                            key={item.label}
                            className={cn(
                                "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium",
                                item.active
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={cn(item.active ? "text-blue-500" : "text-gray-500")} />
                                <span>{item.label}</span>
                            </div>
                            {item.hasSubmenu && (
                                <ChevronDown size={14} className="text-gray-400" />
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            <div className="p-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md">
                    <div>
                        <div className="text-xs font-semibold text-gray-900">shadcn</div>
                        <div className="text-xs text-gray-500">Super Admin</div>
                    </div>
                    <ChevronsUpDown size={14} className="text-gray-400" />
                </div>

                <div>
                    <div className="text-lg font-bold text-blue-600">Stream.</div>
                    <div className="text-[10px] text-gray-400">powered by 3S Smart Ships Solutions</div>
                    <div className="text-[10px] text-gray-400">version 0.0.1</div>
                </div>
            </div>
        </aside>
    );
};
