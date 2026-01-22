"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useTreeStore } from "@/store/useTreeStore";
import { TreeNode as TreeNodeType } from "@/types/tree";

export const AddRootButton = () => {
  const addRootNode = useTreeStore((state) => state.addRootNode);

  const handleAddRoot = () => {
    const newRoot: TreeNodeType = {
      id: crypto.randomUUID(),
      name: "",
      type: "EQUIPMENT_TYPE",
      children: [],
    };
    addRootNode(newRoot);
  };

  return (
    <button
      onClick={handleAddRoot}
      className="fixed top-20 cursor-pointer right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center gap-2"
    >
      <Plus size={20} />
    </button>
  );
};
