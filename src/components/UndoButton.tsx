"use client";

import React from "react";
import { Undo2 } from "lucide-react";
import { useTreeStore } from "@/store/useTreeStore";
import { AnimatePresence, motion } from "framer-motion";

export const UndoButton = () => {
  const deletedNodes = useTreeStore((state) => state.deletedNodes);
  const undoDelete = useTreeStore((state) => state.undoDelete);

  const hasDeletedNodes = deletedNodes.length > 0;

  if (!hasDeletedNodes) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={undoDelete}
        className="fixed top-36 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center gap-2 font-medium text-sm"
        title="Undo Delete"
      >
        <Undo2 size={16} />
        Undo
      </motion.button>
    </AnimatePresence>
  );
};
