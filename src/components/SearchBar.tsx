"use client";

import React from "react";
import { useTreeStore } from "@/store/useTreeStore";
import { Search } from "lucide-react";

export const SearchBar: React.FC = () => {
  const setSearchQuery = useTreeStore((state) => state.setSearchQuery);
  const searchQuery = useTreeStore((state) => state.searchQuery);
  const [localValue, setLocalValue] = React.useState(searchQuery);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, setSearchQuery]);

  return (
    <div className="absolute top-5 left-5 z-20">
      <div className="bg-white rounded-md shadow-sm border border-gray-200 flex items-center px-3 py-2 w-72 hover:shadow-md transition-shadow">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
      </div>
    </div>
  );
};
