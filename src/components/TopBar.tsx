"use client";

import React from "react";
import { Search } from "lucide-react";
import { useTreeStore } from "@/store/useTreeStore";

export const TopBar = () => {
  return (
    <header className="h-12 bg-white flex items-center justify-between px-6 shrink-0 z-10 w-full">
      <div className="flex items-center text-sm font-medium">
        <span className="text-gray-400">Fleet management</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-400">Sagar Kanya</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-blue-500">Vessel Hierarchy Tree</span>
      </div>
    </header>
  );
};
